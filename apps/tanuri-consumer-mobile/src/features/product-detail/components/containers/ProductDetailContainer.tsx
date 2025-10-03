import ScreenHeader from "@/components/presenters/ScreenHeader";
import ProductDetailDisplay from "../presenters/ProductDetailDisplay";
import ProductDetailInfo from "../presenters/ProductDetailInfo";

const ProductDetailContainer = () => {
  const dummyVariants = [
    {
      name: "Size",
      variants: [
        { id: 1, name: "6 kg" },
        { id: 2, name: "13 kg" },
        { id: 3, name: "50 kg" },
      ],
    },
  ];
  return (
    <>
      <ScreenHeader screenTitle={"Product detail"} />
      <ProductDetailDisplay imageUrl={require("public/assets/regulator.png")} />
      <ProductDetailInfo
        productName={"Wells gas"}
        variants={dummyVariants}
        productDescription={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus facere inventore similique repudiandae"
        }
        productPrice={1200}
      />
    </>
  );
};

export default ProductDetailContainer;
