import os
import random
from decimal import Decimal

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand
from django.utils import timezone


from apps.catalog.models import (
    CategoryModel,
    OfferModel,
    ProductModel,
    ProductVariantImageModel,
    ProductVariantModel,
)
from apps.users.models import (
    AddressModel,
    AdminProfileModel,
    CustomerProfileModel,
    UserModel,
)


class Command(BaseCommand):
    help = "🌱 Seeds the database with LPG-focused data: users, products, variants, and offers."

    def log(self, message: str, style="INFO"):
        styles = {
            "INFO": self.style.HTTP_INFO,
            "SUCCESS": self.style.SUCCESS,
            "WARNING": self.style.WARNING,
            "ERROR": self.style.ERROR,
            "STEP": self.style.MIGRATE_LABEL,
            "SKIP": self.style.WARNING,
        }
        self.stdout.write(styles.get(style, self.style.HTTP_INFO)(message))

    def handle(self, *args, **options):
        self.stdout.write(
            self.style.MIGRATE_HEADING("🌱 Starting LPG eCommerce seeder...\n")
        )

        # ---------------------------------------------------------------------
        # USERS
        # ---------------------------------------------------------------------
        self.log("👥 Creating users...", "STEP")

        def create_user(
            email,
            first_name,
            last_name,
            password,
            type_,
            is_staff=False,
            is_superuser=False,
            profile_model=None,
        ):
            user, created = UserModel.objects.get_or_create(
                email=email,
                defaults={
                    "first_name": first_name,
                    "last_name": last_name,
                    "is_staff": is_staff,
                    "is_superuser": is_superuser,
                    "type": type_,
                },
            )
            if created:
                user.set_password(password)
                user.save()
                if profile_model:
                    profile_model.objects.get_or_create(user=user)
                self.log(f"✅ Created user: {email}")
            else:
                self.log(f"⚠️ User already exists, skipping: {email}", "SKIP")
            return user

        admin = create_user(
            "admin@mail.com",
            "Admin",
            "Tanuri",
            "hello",
            "admin",
            is_staff=True,
            is_superuser=True,
            profile_model=AdminProfileModel,
        )

        customer = create_user(
            "customer@mail.com",
            "Jane",
            "Mwangi",
            "hello",
            "customer",
            profile_model=CustomerProfileModel,
        )

        AddressModel.objects.get_or_create(
            user=customer,
            label="Home",
            city="Nairobi",
            latitude=-1.286389,
            longitude=36.817223,
        )
        self.log("🏠 Customer address ensured")

        # ---------------------------------------------------------------------
        # CATEGORIES
        # ---------------------------------------------------------------------
        self.log("\n📦 Creating categories...", "STEP")

        # Load category images
        category_images_dir = os.path.join(
            settings.BASE_DIR, "apps", "catalog", "mock", "images", "categories"
        )
        
        category_image_mapping = {
            "Gas": "cylinders-removebg-preview.png",
            "Accessories": "burners-removebg-preview.png", 
            "Appliances": "regulator-removebg-preview.png",
        }

        categories = [
            ("Gas Cylinders", "flame"),
            ("Burners & Accessories", "wrench"),
            ("Appliances", "oven"),
        ]
        
        for name, icon in categories:
            category, created = CategoryModel.objects.get_or_create(
                name=name, 
                defaults={"icon": icon}
            )
            
            if created:
                self.log(f"✅ Category created: {name}")
            else:
                self.log(f"⚠️ Category exists, skipping: {name}", "SKIP")
                
            # Add category image if it exists and category doesn't have one
            if name in category_image_mapping and not category.image:
                image_filename = category_image_mapping[name]
                image_path = os.path.join(category_images_dir, image_filename)
                
                if os.path.exists(image_path):
                    with open(image_path, "rb") as img_file:
                        category.image.save(
                            image_filename,
                            File(img_file, name=image_filename),
                            save=True
                        )
                    self.log(f"    🖼️ Category image added: {image_filename}")
                else:
                    self.log(f"    ⚠️ Category image not found: {image_path}", "WARNING")
            elif category.image:
                self.log(f"    ⚠️ Category image already exists for {name}", "SKIP")

        category_objs = []
        for name, icon in categories:
            cat, created = CategoryModel.objects.get_or_create(name=name, icon=icon)
            category_objs.append(cat)
            self.log(
                f"{'✅' if created else '⚠️'} Category: {name}",
                "SUCCESS" if created else "SKIP",
            )

        # ---------------------------------------------------------------------
        # MOCK IMAGES
        # ---------------------------------------------------------------------
        self.log("\n🖼️ Loading mock images...", "STEP")
        mock_image_dir = os.path.join(
            settings.BASE_DIR, "apps", "catalog", "mock", "images"
        )
        mock_images = [
            os.path.join(mock_image_dir, f)
            for f in os.listdir(mock_image_dir)
            if f.lower().endswith((".png", ".jpg", ".jpeg"))
        ]
        if mock_images:
            self.log(f"✅ Found {len(mock_images)} mock images")
        else:
            self.log("⚠️ No mock images found, skipping image upload.", "WARNING")

        # ---------------------------------------------------------------------
        # PRODUCTS
        # ---------------------------------------------------------------------
        self.log("\n🧪 Creating LPG products...", "STEP")

        gas_brands = ["Total Gas", "ProGas", "K-Gas", "AfriGas", "Hashi Gas"]
        cylinder_sizes = ["3kg", "6kg", "13kg", "22.5kg"]
        accessories = [
            "Single Burner Stove",
            "Double Burner Stove",
            "Regulator & Hose Set",
            "Gas Cooker Oven",
            "Gas Refill Adapter",
        ]
        appliances = ["Gas Heater", "Table Top Cooker", "Portable Grill", "Gas Oven"]

        product_data = []

        # Combine brand + size for Gas Cylinders
        for brand in gas_brands:
            for size in cylinder_sizes:
                product_data.append(
                    (
                        category_objs[0],
                        f"{brand} Cylinder {size}",
                        f"Original {brand} LPG Cylinder - {size}",
                    )
                )

        # Add some accessories
        for acc in accessories:
            product_data.append(
                (category_objs[1], acc, f"High-quality {acc} for domestic LPG use.")
            )

        # Add some appliances
        for app in appliances:
            product_data.append(
                (category_objs[2], app, f"Premium {app} compatible with LPG.")
            )

        # Limit to 50 total
        product_data = product_data[:50]

        for category, name, desc in product_data:
            product, created = ProductModel.objects.get_or_create(
                category=category,
                name=name,
                defaults={"description": desc},
            )
            self.log(
                f"{'✅' if created else '⚠️'} Product: {name}",
                "SUCCESS" if created else "SKIP",
            )

            # VARIANTS
            variant_types = [
                ("Refill Only", "Cylinder refill only"),
                ("Full Set (Cylinder + Burner)", "Comes with burner and regulator"),
                ("With Regulator", "Includes gas regulator only"),
            ]
            num_variants = random.choice([1, 2, 3])
            chosen_variants = random.sample(variant_types, num_variants)

            for vname, vdesc in chosen_variants:
                variant, created = ProductVariantModel.objects.get_or_create(
                    product=product,
                    name=vname,
                    defaults={
                        "description": vdesc,
                        "price": Decimal(random.randint(800, 5000)),
                        "tradeInPrice": Decimal(random.randint(300, 1500)),
                        "stockQuantity": random.randint(5, 100),
                        "isInStock": True,
                    },
                )
                self.log(
                    f"  {'✅' if created else '⚠️'} Variant: {vname}",
                    "SUCCESS" if created else "SKIP",
                )

                # Add Image
                if mock_images and not variant.images.exists():
                    image_path = random.choice(mock_images)
                    with open(image_path, "rb") as img_file:
                        ProductVariantImageModel.objects.create(
                            variant=variant,
                            image=File(img_file, name=os.path.basename(image_path)),
                        )
                    self.log(f"    🖼️ Added image: {os.path.basename(image_path)}")

                # Randomly add offer
                if random.choice([True, False]):
                    offer, created = OfferModel.objects.get_or_create(
                        variant=variant,
                        defaults={
                            "isActive": True,
                            "offerPrice": variant.price
                            - Decimal(random.randint(100, 500)),
                            "startDate": timezone.now(),
                            "endDate": timezone.now()
                            + timezone.timedelta(days=random.randint(3, 10)),
                        },
                    )
                    self.log(
                        f"    {'💰 Offer created' if created else '⚠️ Offer exists'} for {variant.name}",
                        "SUCCESS" if created else "SKIP",
                    )

        # ---------------------------------------------------------------------
        # DONE
        # ---------------------------------------------------------------------
        self.stdout.write("\n")
        self.stdout.write(
            self.style.SUCCESS(
                "✅ LPG database seeded with users, products, variants, and offers!\n"
            )
        )
