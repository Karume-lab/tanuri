import { FlashList } from "@shopify/flash-list";
import { View } from "@/components/ui/view";
import OrderHistoryCard, {
  DeliveryStatus,
} from "../presenters/OrderHistoryCard";

const OrderHistoryListingLayout = () => {
  const dummyOrders = [
    {
      deliveryDate: "2025-01-15",
      orderNumber: "LPG001",
      deliveryStatus: DeliveryStatus.delivered,
      products: [
        { id: 1, name: "Wells Gas Cylinder 6kg", quantity: 2, cost: 2400 },
        { id: 2, name: "Regulator Pro", quantity: 1, cost: 800 },
        { id: 3, name: "Gas Hose 2m", quantity: 2, cost: 600 },
      ],
    },
    {
      deliveryDate: "2025-01-18",
      orderNumber: "LPG002",
      deliveryStatus: DeliveryStatus.inProgress,
      products: [
        { id: 4, name: "Wells Gas Cylinder 12kg", quantity: 1, cost: 3500 },
        { id: 5, name: "Burner Deluxe", quantity: 1, cost: 1200 },
      ],
    },
    {
      deliveryDate: "2025-01-12",
      orderNumber: "LPG003",
      deliveryStatus: DeliveryStatus.delivered,
      products: [
        { id: 6, name: "K-Gas Cylinder 6kg", quantity: 3, cost: 3600 },
        { id: 7, name: "Safety Valve Kit", quantity: 1, cost: 450 },
      ],
    },
  ];

  return (
    <FlashList
      data={dummyOrders}
      keyExtractor={(item) => item.orderNumber}
      ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
      style={{ flex: 1 }}
      renderItem={({ item }) => <OrderHistoryCard {...item} />}
    />
  );
};

export default OrderHistoryListingLayout;
