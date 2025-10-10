import { useRouter } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyles } from "@/styles/text";
import { CORNERS } from "@/styles/theme/globals";
import { useCartStore } from "../../store";

const CartButton = () => {
  const router = useRouter();
  const { productsCount } = useCartStore();
  const red = useThemeColor({}, "red");
  return (
    <View style={{ position: "relative" }}>
      <Button
        variant="ghost"
        size="icon"
        icon={ShoppingCart}
        onPress={() => router.push("/cart")}
      />
      <Text
        style={[
          textStyles.normal,
          {
            position: "absolute",
            right: 2,
            top: 3,
          },
          productsCount
            ? {
                borderRadius: CORNERS,
                backgroundColor: red,
                width: 20,
                aspectRatio: 1,
                textAlign: "center",
              }
            : null,
        ]}
      >
        {productsCount || null}
      </Text>
    </View>
  );
};

export default CartButton;
