import ScreenHeader from "@/components/presenters/ScreenHeader";
import { View } from "@/components/ui/view";
import CartListingLayout from "../layouts/CartListingLayout";
import ChecktoutFooter from "../presenters/ChecktoutFooter";

const CartContainer = () => {
  const productListingConfig = [
    {
      imageUrl: require("public/assets/burners.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
    {
      imageUrl: require("public/assets/cylinders.png"),
      productName: "Wells gas",
      productPrice: 1200,
      productVariant: "6 kg",
    },
  ];
  return (
    <View style={{ justifyContent: "space-between", flex: 1, gap: 8 }}>
      <ScreenHeader screenTitle="Cart" />
      <CartListingLayout products={productListingConfig} />
      <ChecktoutFooter buttonText="make payment" />
    </View>
  );
};

export default CartContainer;
