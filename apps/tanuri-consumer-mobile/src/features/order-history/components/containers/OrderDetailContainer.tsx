import ScreenHeader from "@/components/presenters/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { textStyles } from "@/styles/text";
import OrderHistoryAddressCard from "../presenters/OrderHistoryAddressCard";
import {
  DeliveryStatus,
  type OrderProduct,
} from "../presenters/OrderHistoryCard";
import OrderHistoryProductListing from "../presenters/OrderHistoryProductListing";
import OrderSummary from "../presenters/OrderSummary";

const OrderDetailContainer = () => {
  const orderProducts: OrderProduct[] = [
    {
      id: 1,
      name: "Wells Gas Cylinder 6kg",
      quantity: 2,
      cost: 2400,
    },
    {
      id: 2,
      name: "Regulator Pro",
      quantity: 1,
      cost: 800,
    },
    {
      id: 3,
      name: "Burner Deluxe",
      quantity: 3,
      cost: 3600,
    },
    {
      id: 4,
      name: "Wells Gas Cylinder 12kg",
      quantity: 1,
      cost: 3500,
    },
    {
      id: 5,
      name: "Gas Hose 2m",
      quantity: 4,
      cost: 1200,
    },
  ];
  return (
    <View style={{ gap: 20 }}>
      <ScreenHeader screenTitle="Order detail" />
      <OrderSummary
        deliveryDate="2025-09-28"
        orderNumber="67890"
        deliveryStatus={DeliveryStatus.inProgress}
      />
      <View style={{ gap: 8 }}>
        <Text style={[textStyles.medium]}>Items</Text>
        <OrderHistoryProductListing products={orderProducts} />
      </View>

      <View style={{ gap: 8 }}>
        <Text style={[textStyles.medium]}>Shipping Address</Text>
        <OrderHistoryAddressCard />
      </View>

      <Button variant="outline" size="sm">
        cancel order
      </Button>
    </View>
  );
};

export default OrderDetailContainer;
