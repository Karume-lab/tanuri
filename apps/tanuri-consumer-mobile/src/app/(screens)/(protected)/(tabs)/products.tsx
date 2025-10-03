import { SafeAreaView } from "react-native-safe-area-context";
import ProductListingContainer from "@/features/product-listing/components/containers/ProductListingContainer";

const ProductsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProductListingContainer />
    </SafeAreaView>
  );
};

export default ProductsScreen;
