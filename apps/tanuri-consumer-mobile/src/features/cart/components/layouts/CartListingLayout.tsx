import { FlashList } from "@shopify/flash-list";
import { View } from "@/components/ui/view";
import { useCartStore } from "../../store";
import CartProductCard from "../presenters/CartProductCard";

const CartListingLayout = () => {
  const { products } = useCartStore();
  return (
    <FlashList
      horizontal={false}
      keyExtractor={(item, index) => `${item.productName}-${index}`}
      ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
      style={{ flex: 1 }}
      data={products}
      renderItem={({ item }) => {
        return (
          <CartProductCard
            productId={item.id}
            imageUrl={item.imageUrl}
            productName={item.productName}
            productPrice={item.productPrice}
            productVariant={item.productVariant}
            productQuantity={item.productQuantity}
          />
        );
      }}
    />
  );
};

export default CartListingLayout;
