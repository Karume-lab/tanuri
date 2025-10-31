import { useRouter } from "expo-router";
import { useState } from "react";
import ScreenHeader from "@/components/presenters/ScreenHeader";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { View } from "@/components/ui/view";
import ChecktoutFooter from "@/features/cart/components/presenters/ChecktoutFooter";
import { useCartStore } from "@/features/cart/store";
import { textStyles } from "@/styles/text";
import AddressRadioGroup from "../presenters/AddressRadioGroup";
import PaymentMethodRadioGroup from "../presenters/PaymentMethodRadioGroup";

const CheckoutContainer = () => {
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCartStore();
  const [value, setValue] = useState<"cash" | "mpesa">("cash");
  const { toast } = useToast();
  const router = useRouter();

  const handleCheckout = () => {
    if (value === "cash") {
      // Implement cash checkout logic here

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Order Placed",
          description: "Your order has been placed successfully.",
          variant: "success",
        });
        router.push("/orders");
        clearCart();
      }, 600);
    } else if (value === "mpesa") {
      // Implement mpesa checkout logic here
      toast({
        title: "Mpesa Payment Coming Soon",
        description: "Mpesa payment is coming soon",
        variant: "warning",
      });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ gap: 16 }}>
        <ScreenHeader screenTitle="Checkout" />
        <Text style={[textStyles.medium]}>Shipping Address</Text>
        <AddressRadioGroup />
        <Text style={[textStyles.medium]}>Payment Method</Text>
        <PaymentMethodRadioGroup value={value} setValue={setValue} />
      </View>
      <ChecktoutFooter
        loading={loading}
        buttonText={value === "cash" ? "Complete Order" : "Make Payment"}
        onButtonPress={handleCheckout}
      />
    </View>
  );
};

export default CheckoutContainer;
