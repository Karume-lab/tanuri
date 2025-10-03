import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "@/components/ui/scroll-view";
import { SearchBar } from "@/components/ui/searchbar";
import { View } from "@/components/ui/view";
import CartButton from "@/features/cart/components/presenters/CartButton";
import ProductListingLayout from "@/features/product-listing/components/layouts/ProductListingLayout";
import type { ProductListingCardProps } from "@/features/product-listing/components/presenters/ProductListingCard";
import { textStyles } from "@/styles/text";
import ProductCategoryCard from "../presenters/ProductCategoryCard";
import SpecialOffersCard from "../presenters/SpecialOffersCard";

const HomeLayout = () => {
  const productCardConfig = [
    {
      imageUrl: require("public/assets/burners.png"),
      categoryName: "burners",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      categoryName: "cylinders",
    },
    {
      imageUrl: require("public/assets/regulator.png"),
      categoryName: "regulators",
    },
  ];
  const productListingConfig: ProductListingCardProps[] = [
    {
      imageUrl: require("public/assets/burners.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
    {
      imageUrl: require("public/assets/burners.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
  ];

  const specialOfferConfig = {
    imageUrl: require("public/assets/cylinders.png"),
    productCategory: "cylinders",
    percenageOff: 30,
  };

  return (
    <View style={{ flex: 1, gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <SearchBar
          placeholder="What are you looking for"
          inputStyle={[textStyles.normal]}
          containerStyle={{ flex: 1 }}
        />
        <CartButton />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 12, flex: 1 }}
      >
        <SpecialOffersCard
          productCategory={specialOfferConfig.productCategory}
          imageUrl={specialOfferConfig.imageUrl}
          percentageOff={specialOfferConfig.percenageOff}
        />
        <FlashList
          horizontal={true}
          nestedScrollEnabled
          data={productCardConfig}
          renderItem={({ item: category }) => {
            return (
              <ProductCategoryCard
                categoryName={category.categoryName}
                imageUrl={category.imageUrl}
              />
            );
          }}
        />
        <ProductListingLayout products={productListingConfig} />
      </ScrollView>
    </View>
  );
};

export default HomeLayout;
