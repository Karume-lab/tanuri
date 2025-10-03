import { SafeAreaView } from "react-native-safe-area-context";
import OrderDetailContainer from "@/features/order-history/components/containers/OrderDetailContainer";

const OrderDetail = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OrderDetailContainer />
    </SafeAreaView>
  );
};

export default OrderDetail;
