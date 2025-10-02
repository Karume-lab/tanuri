import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyles } from "@/styles/text";

const AddressRadioGroup = () => {
  const borderColor = useThemeColor({}, "border");
  const [value, setValue] = useState("option1");
  return (
    <RadioGroup
      optionStyle={{
        borderColor,
        borderWidth: 1,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
      }}
      labelStyle={{
        fontSize: 15,
        fontWeight: "500",
      }}
      options={[
        {
          label: "Option 1",
          value: "option1",
          children: (
            <View>
              <Text style={[textStyles.small]}>Juja ,Jkuat Gate C</Text>
              <Text style={[textStyles.small]}>Zambia house, room A15</Text>
              <Text style={[textStyles.small]}>+25412345688</Text>
            </View>
          ),
        },
        {
          label: "Option 2",
          value: "option2",
          children: (
            <View>
              <Text style={[textStyles.small]}>Juja ,Jkuat Gate C</Text>
              <Text style={[textStyles.small]}>Zambia house, room A15</Text>
              <Text style={[textStyles.small]}>+25412345688</Text>
            </View>
          ),
        },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};

export default AddressRadioGroup;
