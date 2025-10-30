import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyles } from "@/styles/text";
import type { OrderProduct } from "./OrderHistoryCard";

interface OrderHistoryProductListingProps {
  products: OrderProduct[];
}

const OrderHistoryProductListing: React.FC<OrderHistoryProductListingProps> = ({
  products,
}) => {
  const mutedForeground = useThemeColor({}, "mutedForeground");

  return (
    <View style={{ gap: 8 }}>
      {products.map((product) => (
        <View key={product.id} style={{ gap: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text
              style={[
                textStyles.normal,
                { flex: 1, color: mutedForeground, fontWeight: "600" },
              ]}
            >
              {product.name}
            </Text>
            <Text
              style={[
                textStyles.normal,
                {
                  flex: 0.7,
                  textAlign: "center",
                  fontWeight: "600",
                  color: mutedForeground,
                },
              ]}
            >
              {product.quantity}
            </Text>
            <Text
              style={[
                textStyles.normal,
                {
                  flex: 0.7,
                  textAlign: "right",
                  color: mutedForeground,
                  fontWeight: "600",
                },
              ]}
            >
              {product.cost}
            </Text>
          </View>
          <Separator />
        </View>
      ))}
    </View>
  );
};

export default OrderHistoryProductListing;
