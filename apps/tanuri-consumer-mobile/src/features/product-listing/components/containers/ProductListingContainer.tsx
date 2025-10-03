import { SearchBar } from "@/components/ui/searchbar";
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
  ];
  return (
    <>
      <SearchBar
        placeholder="What are you looking for"
        inputStyle={[textStyles.normal]}
      />
      <ProductListingLayout products={productListingConfig} />
    </>
  );
};

export default ProductListingContainer;
