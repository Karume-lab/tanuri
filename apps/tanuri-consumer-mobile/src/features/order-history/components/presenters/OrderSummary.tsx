import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyles } from "@/styles/text";
import type { DeliveryStatus } from "./OrderHistoryCard";

interface OrderSummaryProps {
  deliveryDate: string;
  orderNumber: string;
  deliveryStatus: DeliveryStatus;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  deliveryDate,
  deliveryStatus,
  orderNumber,
}) => {
  const mutedBg = useThemeColor({}, "muted");
  const mutedForeground = useThemeColor({}, "mutedForeground");

  return (
    <View
      style={{
        backgroundColor: mutedBg,
        borderRadius: 12,
        paddingVertical: 12,
        gap: 4,
      }}
    >
      <Text style={[textStyles.medium, { textAlign: "center" }]}>
        Order #{orderNumber}
      </Text>
      <Text
        style={[
          textStyles.small,
          { textAlign: "center", color: mutedForeground },
        ]}
      >
        {deliveryDate}
      </Text>
      <Text
        style={[
          textStyles.small,
          { textAlign: "center", color: mutedForeground },
        ]}
      >
        {deliveryStatus}
      </Text>
    </View>
  );
};

export default OrderSummary;
