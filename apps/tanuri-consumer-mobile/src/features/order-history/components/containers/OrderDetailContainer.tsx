import OrderHistoryAddressCard from "../presenters/OrderHistoryAddressCard";
import { DeliveryStatus } from "../presenters/OrderHistoryCard";
import OrderSummary from "../presenters/OrderSummary";

const OrderDetailContainer = () => {
  return (
    <>
      <OrderSummary
        deliveryDate="2025-09-28"
        orderNumber="67890"
        deliveryStatus={DeliveryStatus.inProgress}
      />
      <OrderHistoryAddressCard />
    </>
  );
};

export default OrderDetailContainer;
