import { Image } from "expo-image";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { textStyles } from "@/styles/text";

export interface ProductListingCardProps {
  imageUrl: string;
  productName: string;
  productPrice: number;
  productVariant: string;
}
const ProductListingCard: React.FC<ProductListingCardProps> = ({
  imageUrl,
  productName,
  productPrice,
  productVariant,
}) => {
  return (
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
            source={imageUrl}
            style={{
              width: 140,
              height: 105,
            }}
          />
        </View>
        <View style={{}}>
          <Text style={[textStyles.normal]}>{productName}</Text>
          <Text style={[textStyles.smMedium]}>{productVariant}</Text>
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
  );
};

export default ProductListingCard;
