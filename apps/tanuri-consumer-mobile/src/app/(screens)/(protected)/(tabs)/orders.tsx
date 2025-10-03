import { SafeAreaView } from "react-native-safe-area-context";
import OrderHistoryContainer from "@/features/order-history/components/containers/OrderHistoryContainer";

const OrdersScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OrderHistoryContainer />
    </SafeAreaView>
  );
};

export default OrdersScreen;
