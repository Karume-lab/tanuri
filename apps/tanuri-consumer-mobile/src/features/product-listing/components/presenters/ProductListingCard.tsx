import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { textStyles } from "@/styles/text";
import type { Variant } from "../../types";

export interface ProductListingCardProps {
  productName: string;
  productPrice: number;
  productVariant: Variant[];
}
const ProductListingCard: React.FC<ProductListingCardProps> = ({
  productName,
  productPrice,
  productVariant,
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        router.push("/products/1");
      }}
    >
      <Card
        style={{
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 12,
        }}
      >
        <CardContent
          style={{
            gap: 12,
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 16,
              borderRadius: 8,
              backgroundColor: "white",
            }}
          >
            <Image
              source={productVariant[0]?.images[0] || ""}
              style={{
                width: 140,
                height: 105,
              }}
            />
          </View>
          <View style={{}}>
            <Text
              style={[textStyles.normal]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {productName}
            </Text>
            <Text style={[textStyles.smMedium]}>
              {productVariant[0]?.name || "no variants"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Text style={[textStyles.normal]}>ksh</Text>
              <Text style={[textStyles.subHeading]}>{productPrice}</Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};

export default ProductListingCard;
