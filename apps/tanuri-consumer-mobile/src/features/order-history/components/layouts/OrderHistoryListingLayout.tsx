import { FlashList } from "@shopify/flash-list";
import OrderHistoryCard, {
  DeliveryStatus,
} from "../presenters/OrderHistoryCard";

const OrderHistoryListingLayout = () => {
  const dummyOrders = [
    {
      deliveryDate: "2025-09-25",
      orderNumber: "12345",
      deliveryStatus: DeliveryStatus.delivered,
      products: [
        { id: 1, name: "Apples", quantity: 2, cost: 200 },
        { id: 2, name: "Bananas", quantity: 5, cost: 150 },
        { id: 3, name: "Oranges", quantity: 3, cost: 300 },
      ],
    },
    {
      deliveryDate: "2025-09-28",
      orderNumber: "67890",
      deliveryStatus: DeliveryStatus.inProgress,
      products: [
        { id: 4, name: "Milk", quantity: 1, cost: 120 },
        { id: 5, name: "Bread", quantity: 2, cost: 80 },
        { id: 6, name: "Eggs", quantity: 12, cost: 240 },
      ],
    },
  ];

  return (
    <FlashList
      data={dummyOrders}
      keyExtractor={(item) => item.orderNumber}
      contentContainerStyle={{ gap: 16, flex: 1 }}
      renderItem={({ item }) => <OrderHistoryCard {...item} />}
    />
  );
};

export default OrderHistoryListingLayout;
