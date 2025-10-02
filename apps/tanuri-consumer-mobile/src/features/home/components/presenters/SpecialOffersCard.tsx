import { Image } from "expo-image";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { textStyles } from "@/styles/text";

interface SpecialOffersCardProps {
  productCategory: string;
  imageUrl: string;
  percentageOff: number;
}
const SpecialOffersCard: React.FC<SpecialOffersCardProps> = ({
  imageUrl,
  productCategory,
  percentageOff,
}) => {
  return (
    <Card
      style={{
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 16,
      }}
    >
      <CardContent
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <Text style={[textStyles.medium]}>Offers on {productCategory}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <Text style={[textStyles.normal]}>up to</Text>
            <Text style={[textStyles.large]}>{percentageOff} %</Text>
          </View>
          <Button
            style={{ marginTop: 12 }}
            size="xs"
            textStyle={{ fontSize: 14 }}
          >
            Order Now
          </Button>
        </View>
        <Image
          source={imageUrl}
          contentFit="contain"
          style={{
            flex: 1,
            aspectRatio: 1.6,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default SpecialOffersCard;

// const styles = StyleSheet.create({})
