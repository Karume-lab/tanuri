import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import AddressBottomSheet from "../presenters/AddressBottomSheet";

const ShippingAddressContainer = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text>Shipping Address</Text>
      <AddressBottomSheet />
    </View>
  );
};

export default ShippingAddressContainer;
