import ScreenHeader from "@/components/presenters/ScreenHeader";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import ChecktoutFooter from "@/features/cart/components/presenters/ChecktoutFooter";
import { textStyles } from "@/styles/text";
import AddressRadioGroup from "../presenters/AddressRadioGroup";
import PaymentMethodRadioGroup from "../presenters/PaymentMethodRadioGroup";

const CheckoutContainer = () => {
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ gap: 16 }}>
        <ScreenHeader screenTitle="Checkout" />
        <Text style={[textStyles.medium]}>Shipping Address</Text>
        <AddressRadioGroup />
        <Text style={[textStyles.medium]}>Payment Method</Text>
        <PaymentMethodRadioGroup />
      </View>
      <ChecktoutFooter buttonText="make payment" onButtonPress={() => {}} />
    </View>
  );
};

export default CheckoutContainer;
