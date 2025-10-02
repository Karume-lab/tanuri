import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyles } from "@/styles/text";

const OrderHistoryAddressCard = () => {
  const borderColor = useThemeColor({}, "border");
  const mutedForeground = useThemeColor({}, "mutedForeground");
  return (
    <View
      style={{
        borderColor,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 2,
      }}
    >
      <Text style={[textStyles.medium, { marginBottom: 10 }]}>Home</Text>
      <Text style={[textStyles.small, { color: mutedForeground }]}>
        Juja ,Jkuat Gate C
      </Text>
      <Text style={[textStyles.small, { color: mutedForeground }]}>
        Zambia house, room A15
      </Text>
      <Text style={[textStyles.small, { color: mutedForeground }]}>
        +25412345688
      </Text>
    </View>
  );
};

export default OrderHistoryAddressCard;
