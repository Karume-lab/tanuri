import { FlashList } from "@shopify/flash-list";
import { View } from "@/components/ui/view";
import ProductListingCard, {
  type ProductListingCardProps,
} from "../presenters/ProductListingCard";

interface ProductListingLayoutProps {
  products: ProductListingCardProps[];
}
const ProductListingLayout: React.FC<ProductListingLayoutProps> = ({
  products,
}) => {
  return (
    <FlashList
      horizontal={false}
      numColumns={2}
      nestedScrollEnabled
      data={products}
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              flex: 1,
              padding: 6,
            }}
          >
            <ProductListingCard
              imageUrl={item.imageUrl}
              productName={item.productName}
              productPrice={item.productPrice}
              productVariant={item.productVariant}
            />
          </View>
        );
      }}
    />
  );
};

export default ProductListingLayout;
