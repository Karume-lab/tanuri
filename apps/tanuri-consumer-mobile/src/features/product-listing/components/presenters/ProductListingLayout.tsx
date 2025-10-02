import { FlatList } from "react-native";
import { View } from "@/components/ui/view";
import ProductListingCard, {
  type ProductListingCardProps,
} from "./ProductListingCard";

interface ProductListingLayoutProps {
  products: ProductListingCardProps[];
}
const ProductListingLayout: React.FC<ProductListingLayoutProps> = ({
  products,
}) => {
  return (
    <FlatList
      horizontal={false}
      numColumns={2}
      keyExtractor={(item, index) => `${item.productName}-${index}`}
      data={products}
      renderItem={({ item, index }) => {
        const lastItem = index === products.length - 1;
        return (
          <View
            style={{
              flex: 1,
              padding: 6,
              maxWidth: lastItem ? "50%" : "100%",
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
