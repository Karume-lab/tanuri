import ScreenHeader from "@/components/presenters/ScreenHeader";
import AddressListingLayout from "../layouts/AddressListingLayout";
import AddressBottomSheet from "../presenters/AddressBottomSheet";

const ShippingAddressContainer = () => {
  return (
    <>
      <ScreenHeader
        screenTitle="Shipping Address"
        rightSection={<AddressBottomSheet />}
      />
      <AddressListingLayout />
    </>
  );
};

export default ShippingAddressContainer;
