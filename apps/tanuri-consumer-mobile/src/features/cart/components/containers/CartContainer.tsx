import { useRouter } from "expo-router";
import ScreenHeader from "@/components/presenters/ScreenHeader";
import { View } from "@/components/ui/view";
import { useCartStore } from "../../store";
import CartListingLayout from "../layouts/CartListingLayout";
import ChecktoutFooter from "../presenters/ChecktoutFooter";

const CartContainer = () => {
  const { productsCount } = useCartStore();
  const router = useRouter();
  return (
    <View style={{ justifyContent: "space-between", flex: 1, gap: 8 }}>
      <ScreenHeader screenTitle="Cart" />
      <CartListingLayout />
      {productsCount > 0 && (
        <ChecktoutFooter
          buttonText="make payment"
          onButtonPress={() => router.push("/checkout")}
        />
      )}
    </View>
  );
};

export default CartContainer;
