import { ShoppingBasket } from "lucide-react-native";
import ScreenHeader from "@/components/presenters/ScreenHeader";
import { Button } from "@/components/ui/button";
import { View } from "@/components/ui/view";
import CartButton from "@/features/cart/components/presenters/CartButton";
import { useCartStore } from "@/features/cart/store";
import ProductDetailDisplay from "../presenters/ProductDetailDisplay";
import ProductDetailInfo from "../presenters/ProductDetailInfo";

const ProductDetailContainer = () => {
  const { addProduct } = useCartStore();

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

  const handleAddToCart = () => {
    const newProduct = {
      id: Math.floor(Math.random() * 100),
      imageUrl: require("public/assets/regulator.png"),
      productName: "Wells Gas",
      productPrice: 1200,
      productVariant: "13 kg",
      productQuantity: 1,
    };

    addProduct(newProduct);
  };

  return (
    <View style={{ gap: 20, flex: 1, alignItems: "center" }}>
      <ScreenHeader
        screenTitle="Product detail"
        rightSection={<CartButton />}
      />
      <ProductDetailDisplay imageUrl={require("public/assets/regulator.png")} />
      <View style={{ flex: 0.7, justifyContent: "space-between" }}>
        <ProductDetailInfo
          productName="Wells Gas"
          variants={dummyVariants}
          productDescription="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus facere inventore similique repudiandae"
          productPrice={1200}
        />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button
            style={{ flex: 0.8 }}
            variant="outline"
            icon={ShoppingBasket}
            onPress={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button style={{ flex: 0.8 }}>Buy now</Button>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailContainer;
