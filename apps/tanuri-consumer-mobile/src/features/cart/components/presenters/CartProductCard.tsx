import { Image } from "expo-image";
import { Minus, Plus, Trash2 } from "lucide-react-native";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { textStyles } from "@/styles/text";
import { useCartStore } from "../../store";

export interface CartProductCardProps {
  productId: number;
  imageUrl: string;
  productPrice: number;
  productName: string;
  productVariant: string;
  productQuantity: number;
}

const CartProductCard: React.FC<CartProductCardProps> = ({
  productId,
  imageUrl,
  productPrice,
  productName,
  productVariant,
  productQuantity,
}) => {
  const { increaseProductQuantity, decreaseProductQuantity, removeProduct } =
    useCartStore();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 28,
      }}
    >
      <Card style={{ flex: 0.8, borderRadius: 12, elevation: 0 }}>
        <CardContent>
          <Image
            source={imageUrl}
            contentFit="contain"
            style={{
              flex: 1,
              aspectRatio: 1.5,
            }}
          />
        </CardContent>
      </Card>
      <View style={{ flex: 1 }}>
        <View>
          <Button
            size="icon"
            variant="ghost"
            style={{
              height: 16,
              aspectRatio: 1,
              alignSelf: "flex-end",
            }}
            icon={Trash2}
            onPress={() => removeProduct(productId)}
          />
          <Text style={[textStyles.normal]}>{productName}</Text>
          <Text style={[textStyles.smMedium]}>{productVariant}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text style={[textStyles.normal]}>ksh</Text>
            <Text style={[textStyles.subHeading]}>{productPrice}</Text>
          </View>
          <Badge
            variant="outline"
            style={{
              paddingVertical: 2,
              paddingHorizontal: 1,
              gap: 4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                size="icon"
                style={{
                  width: 30,
                  height: "100%",
                }}
                variant="ghost"
                icon={Minus}
                onPress={() => decreaseProductQuantity(productId)}
              />
              <Text style={[textStyles.medium]}>{productQuantity}</Text>
              <Button
                size="icon"
                style={{ width: 30, height: "90%" }}
                variant="ghost"
                icon={Plus}
                onPress={() => increaseProductQuantity(productId)}
              />
            </View>
          </Badge>
        </View>
      </View>
    </View>
  );
};

export default CartProductCard;
