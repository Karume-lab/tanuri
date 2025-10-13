import random
from datetime import datetime, timedelta
from decimal import Decimal
from faker import Faker

from apps.catalog.models import (
    CategoryModel,
    ProductModel,
    ProductVariantModel,
    OfferModel,
)

fake = Faker()

# ==============================
# CONFIGURATION
# ==============================
CLEAR_OLD_DATA = True  # Set False to append data instead of clearing
NUM_CATEGORIES = 6
PRODUCTS_PER_CATEGORY = (5, 8)  # min, max
VARIANTS_PER_PRODUCT = (1, 3)   # min, max
OFFER_PROBABILITY = 0.4         # 40% of variants get an offer
UNSPLASH_IMAGES = {
    "Electronics": [
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    "Home & Kitchen": [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "https://images.unsplash.com/photo-1606813902889-297f28e3d4b9",
    ],
    "Sports & Outdoors": [
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
        "https://images.unsplash.com/photo-1579758629934-0953d0c9b3f1",
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    ],
    "Fashion": [
        "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
        "https://images.unsplash.com/photo-1520974735194-61a3e7d4dc01",
    ],
    "Toys & Games": [
        "https://images.unsplash.com/photo-1601758123927-196ecc2216cf",
        "https://images.unsplash.com/photo-1575936123452-b67c3203c357",
        "https://images.unsplash.com/photo-1615472520843-92837e3fbb5c",
    ],
    "Books": [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        "https://images.unsplash.com/photo-1532012197267-da84d127e765",
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    ],
}
LUCIDE_ICONS = ["tv", "home", "football", "shirt", "gamepad-2", "book"]

# ==============================
# SEEDING LOGIC
# ==============================

def clear_old_data():
    print("🧹 Clearing old catalog data...")
    OfferModel.objects.all().delete()
    ProductVariantModel.objects.all().delete()
    ProductModel.objects.all().delete()
    CategoryModel.objects.all().delete()


def create_categories():
    print("📚 Creating categories...")
    categories = []
    for i, (name, icon) in enumerate(zip(UNSPLASH_IMAGES.keys(), LUCIDE_ICONS)):
        cat = CategoryModel.objects.create(name=name, icon=icon)
        categories.append(cat)
    return categories


def create_products(categories):
    print("📦 Creating products...")
    products = []
    for category in categories:
        for _ in range(random.randint(*PRODUCTS_PER_CATEGORY)):
            product = ProductModel.objects.create(
                category=category,
                name=fake.catch_phrase(),
                description=fake.paragraph(nb_sentences=3),
            )
            products.append(product)
    return products


def create_variants(products):
    print("🧩 Creating variants...")
    variants = []
    for product in products:
        category_name = product.category.name
        for _ in range(random.randint(*VARIANTS_PER_PRODUCT)):
            base_price = Decimal(random.randint(50, 2000))
            trade_in = base_price * Decimal(random.uniform(0.5, 0.9))
            stock = random.randint(0, 100)
            is_in_stock = stock > 0
            variant = ProductVariantModel.objects.create(
                product=product,
                name=f"{product.name} {fake.word().capitalize()} Edition",
                description=fake.sentence(nb_words=10),
                price=base_price,
                tradeInPrice=trade_in,
                stockQuantity=stock,
                isInStock=is_in_stock,
                images=random.sample(UNSPLASH_IMAGES[category_name], k=1),
            )
            variants.append(variant)
    return variants


def create_offers(variants):
    print("🏷️ Creating offers...")
    for variant in variants:
        if random.random() < OFFER_PROBABILITY:
            discount = Decimal(random.uniform(0.1, 0.4))
            offer_price = variant.price * (1 - discount)
            start_date = datetime.now() - timedelta(days=random.randint(0, 10))
            end_date = start_date + timedelta(days=random.randint(5, 15))
            OfferModel.objects.create(
                variant=variant,
                isActive=end_date > datetime.now(),
                offerPrice=offer_price,
                startDate=start_date,
                endDate=end_date,
            )


def main():
    if CLEAR_OLD_DATA:
        clear_old_data()

    categories = create_categories()
    products = create_products(categories)
    variants = create_variants(products)
    create_offers(variants)

    print("✅ Seeding complete!")
    print(f"Created {len(categories)} categories, {len(products)} products, and {len(variants)} variants.")



main()
