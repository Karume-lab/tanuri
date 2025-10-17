import { FlashList } from "@shopify/flash-list";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useGetAddresses } from "../../hooks/api/queries";
import ProfileAddressCard from "../presenters/ProfileAddressCard";

const AddressListingLayout = () => {
  const { data, isPending, isError, error } = useGetAddresses();
  console.log(data);
  return (
    <FlashList
      data={data}
      style={{ flex: 1 }}
      ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      ListEmptyComponent={
        isPending ? (
          <Spinner />
        ) : isError ? (
          <Text>{error.message}</Text>
        ) : (
          <Text>no addresses</Text>
        )
      }
      renderItem={({ item }) => {
        return <ProfileAddressCard {...item} isDefault={item.is_default} />;
      }}
    />
  );
};

export default AddressListingLayout;
