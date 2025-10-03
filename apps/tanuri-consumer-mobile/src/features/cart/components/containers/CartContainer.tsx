import ScreenHeader from "@/components/presenters/ScreenHeader";
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
  ];
  return (
    <>
      <ScreenHeader screenTitle="Product detail" />
      <CartListingLayout products={productListingConfig} />
      <ChecktoutFooter buttonText="make payment" />
    </>
  );
};

export default CartContainer;
