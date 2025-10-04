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
      numColumns={2}
      data={products}
      style={{ flex: 1 }}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              flex: 1,
              padding: 6,
            }}
          >
            <ProductListingCard {...item} />
          </View>
        );
      }}
    />
  );
};

export default ProductListingLayout;
