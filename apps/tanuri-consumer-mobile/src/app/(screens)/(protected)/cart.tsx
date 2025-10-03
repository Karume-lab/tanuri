import { SafeAreaView } from "react-native-safe-area-context";
import CartContainer from "@/features/cart/components/containers/CartContainer";

const CartScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CartContainer />
    </SafeAreaView>
  );
};

export default CartScreen;
