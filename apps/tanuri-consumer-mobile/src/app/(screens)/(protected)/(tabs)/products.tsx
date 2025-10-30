import ScreenWrapper from "@/components/presenters/PageWrapper";
import ProductListingContainer from "@/features/product-listing/components/containers/ProductListingContainer";

const ProductsScreen = () => {
  return (
    <ScreenWrapper>
      <ProductListingContainer />
    </ScreenWrapper>
  );
};

export default ProductsScreen;
