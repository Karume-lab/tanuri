import { FlashList } from "@shopify/flash-list";
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
      contentContainerStyle={{
        gap: 16,
      }}
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
