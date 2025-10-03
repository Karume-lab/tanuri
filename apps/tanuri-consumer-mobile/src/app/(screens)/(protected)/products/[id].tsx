import { SafeAreaView } from "react-native-safe-area-context";
import ProductDetailContainer from "@/features/product-detail/components/containers/ProductDetailContainer";

const ProductDetailScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProductDetailContainer />
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
