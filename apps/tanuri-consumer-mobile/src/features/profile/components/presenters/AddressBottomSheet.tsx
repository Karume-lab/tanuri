import { CirclePlus } from "lucide-react-native";
import { BottomSheet, useBottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { View } from "@/components/ui/view";
import AddressForm from "./AddressForm";

const AddressBottomSheet = () => {
  const { isVisible, open, close } = useBottomSheet();

  return (
    <View>
      <Button variant="ghost" size="icon" onPress={open} icon={CirclePlus} />
      <BottomSheet
        isVisible={isVisible}
        onClose={close}
        title="Add Address"
        snapPoints={[0.85]}
      >
        <AddressForm />
      </BottomSheet>
    </View>
  );
};

export default AddressBottomSheet;
