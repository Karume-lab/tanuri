import { FlashList } from "@shopify/flash-list";
import { View } from "@/components/ui/view";
import CartProductCard, {
  type CartProductCardProps,
} from "../presenters/CartProductCard";

interface CartListingLayoutProps {
  products: CartProductCardProps[];
}
const CartListingLayout: React.FC<CartListingLayoutProps> = ({ products }) => {
  return (
    <FlashList
      horizontal={false}
      keyExtractor={(item, index) => `${item.productName}-${index}`}
      contentContainerStyle={{ flex: 1 }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
      style={{ flex: 1 }}
      data={products}
      renderItem={({ item }) => {
        return (
          <CartProductCard
            imageUrl={item.imageUrl}
            productName={item.productName}
            productPrice={item.productPrice}
            productVariant={item.productVariant}
          />
        );
      }}
    />
  );
};

export default CartListingLayout;
