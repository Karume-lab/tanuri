import { SearchBar } from "@/components/ui/searchbar";
import { View } from "@/components/ui/view";
import CartButton from "@/features/cart/components/presenters/CartButton";
import { textStyles } from "@/styles/text";
import ProductListingLayout from "../layouts/ProductListingLayout";

const ProductListingContainer = () => {
  const productListingConfig = [
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
    {
      imageUrl: require("public/assets/cylinders.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
  ];
  return (
    <View style={{ gap: 10, flex: 1 }}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <SearchBar
          placeholder="What are you looking for"
          inputStyle={[textStyles.normal]}
          containerStyle={{ flex: 1 }}
        />
        <CartButton />
      </View>
      <ProductListingLayout products={productListingConfig} />
    </View>
  );
};

export default ProductListingContainer;
