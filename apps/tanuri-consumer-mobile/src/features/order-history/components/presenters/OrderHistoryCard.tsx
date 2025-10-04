import { useRouter } from "expo-router";
import { ChevronRight, TruckElectric } from "lucide-react-native";
import type React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyles } from "@/styles/text";

export enum DeliveryStatus {
  delivered = "Delivered",
  inProgress = "Delivery In progress",
}

export type OrderProduct = {
  id: number;
  name: string;
  quantity: number;
  cost: number;
};

interface OrderHistoryCardProps {
  deliveryDate: string;
  orderNumber: string;
  deliveryStatus: DeliveryStatus;
  products: OrderProduct[];
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  deliveryDate,
  deliveryStatus,
  orderNumber,
  products,
}) => {
  const router = useRouter();
  const borderColor = useThemeColor({}, "border");
  const mutedForeground = useThemeColor({}, "mutedForeground");

  const totalCost = products.reduce((sum, product) => sum + product.cost, 0);
  const productNames = products.reduce(
    (name, product, index) =>
      `${name}${index !== 0 ? " & " : ""}${product.name}`,
    "",
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push("/orders/1")}
      style={{
        borderColor,
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ gap: 10, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[textStyles.medium, { color: mutedForeground }]}>
            Order #{orderNumber}
          </Text>
          <Text style={[textStyles.badgeText, { color: mutedForeground }]}>
            {deliveryDate}
          </Text>
        </View>
        <Text style={[textStyles.medium]} numberOfLines={1}>
          {productNames}
        </Text>
        <Text style={[textStyles.large]}>ksh {totalCost}</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Icon name={TruckElectric} size={20} />
          <Text style={[textStyles.normal, { color: mutedForeground }]}>
            {deliveryStatus}
          </Text>
        </View>
      </View>
      <Icon name={ChevronRight} size={12} />
    </TouchableOpacity>
  );
};

export default OrderHistoryCard;
