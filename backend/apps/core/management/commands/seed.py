import os
import random
from decimal import Decimal

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
    DelivererProfileModel,
    UserModel,
)
from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand
from django.utils import timezone


class Command(BaseCommand):
    help = "🌱 Seeds the database with sample data across all apps."

    def log(self, message: str, style="INFO"):
        """Utility logger with styles"""
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
        self.stdout.write(self.style.MIGRATE_HEADING("🌱 Starting global seed...\n"))

        # ---------------------------------------------------------------------
        # USERS
        # ---------------------------------------------------------------------
        self.log("👤 Creating users...", "STEP")

        def create_user(email, defaults, password, profile_model):
            user, created = UserModel.objects.get_or_create(
                email=email, defaults=defaults
            )
            if created:
                user.set_password(password)
                user.save()
                profile_model.objects.get_or_create(user=user)
                self.log(f"✅ Created user: {email}")
            else:
                self.log(f"⚠️ User already exists, skipping: {email}", "SKIP")

        create_user(
            "admin@mail.com",
            {
                "first_name": "Admin",
                "last_name": "User",
                "is_staff": True,
                "is_superuser": True,
                "type": "admin",
            },
            "hello",
            AdminProfileModel,
        )

        create_user(
            "customer@mail.com",
            {
                "first_name": "Jane",
                "last_name": "Customer",
                "type": "customer",
            },
            "hello",
            CustomerProfileModel,
        )

        create_user(
            "deliverer@mail.com",
            {
                "first_name": "John",
                "last_name": "Deliverer",
                "type": "deliverer",
            },
            "hello",
            DelivererProfileModel,
        )

        AddressModel.objects.get_or_create(
            user=UserModel.objects.get(email="customer@mail.com"),
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
            ("Gas", "flame"),
            ("Accessories", "wrench"),
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


        # ---------------------------------------------------------------------
        # LOAD MOCK IMAGES
        # ---------------------------------------------------------------------
        self.log("\n🖼️  Loading mock images...", "STEP")

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
            self.log("⚠️ No mock images found! Skipping image seeding.", "WARNING")

        # ---------------------------------------------------------------------
        # PRODUCTS & VARIANTS
        # ---------------------------------------------------------------------
        self.log("\n🧪 Creating products and variants...", "STEP")

        for category in CategoryModel.objects.all():
            self.log(f"\n📁 Category: {category.name}", "STEP")

            for i in range(2):
                product_name = f"{category.name} Product {i+1}"
                product, created = ProductModel.objects.get_or_create(
                    category=category,
                    name=product_name,
                    defaults={
                        "description": f"High-quality {category.name.lower()} item."
                    },
                )

                if created:
                    self.log(f"📦 Created product: {product_name}")
                else:
                    self.log(f"⚠️ Product exists, skipping: {product_name}", "SKIP")

                for j in range(2):
                    variant_name = f"{product.name} Variant {j+1}"
                    variant, created = ProductVariantModel.objects.get_or_create(
                        product=product,
                        name=variant_name,
                        defaults={
                            "description": f"Variant {j+1} of {product.name}",
                            "price": Decimal(random.randint(50, 200)),
                            "tradeInPrice": Decimal(random.randint(20, 100)),
                            "stockQuantity": random.randint(5, 50),
                            "isInStock": True,
                        },
                    )

                    if created:
                        self.log(f"  🔸 Created variant: {variant_name}")
                    else:
                        self.log(
                            f"  ⚠️ Variant exists, skipping: {variant_name}", "SKIP"
                        )

                    # Add random mock image
                    if mock_images and not variant.images.exists():  # type: ignore
                        image_path = random.choice(mock_images)
                        with open(image_path, "rb") as img_file:
                            ProductVariantImageModel.objects.create(
                                variant=variant,
                                image=File(img_file, name=os.path.basename(image_path)),
                            )
                        self.log(f"    🖼️ Image added: {os.path.basename(image_path)}")
                    elif variant.images.exists():  # type: ignore
                        self.log(
                            f"    ⚠️ Image already exists for {variant.name}", "SKIP"
                        )

                    # Offer
                    offer, created = OfferModel.objects.get_or_create(
                        variant=variant,
                        defaults={
                            "isActive": True,
                            "offerPrice": variant.price - Decimal("5.00"),
                            "startDate": timezone.now(),
                            "endDate": timezone.now() + timezone.timedelta(days=7),
                        },
                    )
                    if created:
                        self.log(f"    💰 Offer created for {variant.name}")
                    else:
                        self.log(
                            f"    ⚠️ Offer exists, skipping for {variant.name}", "SKIP"
                        )

        # ---------------------------------------------------------------------
        # DONE
        # ---------------------------------------------------------------------
        self.stdout.write("\n")
        self.stdout.write(self.style.SUCCESS("✅ Database seeded successfully!\n"))
