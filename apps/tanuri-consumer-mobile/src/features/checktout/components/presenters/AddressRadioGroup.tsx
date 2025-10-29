import { useEffect, useState } from "react";
import { RadioGroup } from "@/components/ui/radio";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useGetAddresses } from "@/features/profile/hooks/api/queries";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyles } from "@/styles/text";

const AddressRadioGroup = () => {
  const { data: addresses, isPending, isError, error } = useGetAddresses();
  const borderColor = useThemeColor({}, "border");
  const [value, setValue] = useState("option1");

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setValue(addresses[0].id.toString());
    }
  }, [addresses]);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!addresses) {
    return <Text variant="caption">No addresses found</Text>;
  }

  return (
    <RadioGroup
      optionStyle={{
        borderColor,
        borderWidth: 1,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 4,
      }}
      labelStyle={{
        fontSize: 15,
        fontWeight: "500",
      }}
      options={addresses.map((address) => ({
        label: address.label,
        value: address.id.toString(),
        children: (
          <View>
            <Text style={[textStyles.small]}>{address.city}</Text>
            <Text style={[textStyles.small]}>{address.label}</Text>
          </View>
        ),
      }))}
      value={value}
      onValueChange={setValue}
    />
  );
};

export default AddressRadioGroup;
