import ScreenWrapper from "@/components/presenters/PageWrapper";
import OrderHistoryContainer from "@/features/order-history/components/containers/OrderHistoryContainer";

const OrdersScreen = () => {
  return (
    <ScreenWrapper>
      <OrderHistoryContainer />
    </ScreenWrapper>
  );
};

export default OrdersScreen;
