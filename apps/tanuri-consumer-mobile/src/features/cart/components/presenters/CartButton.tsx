import { useRouter } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import { Button } from "@/components/ui/button";

const CartButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon"
      icon={ShoppingCart}
      onPress={() => router.push("/cart")}
    />
  );
};

export default CartButton;
