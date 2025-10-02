import { Image } from "expo-image";
import type React from "react";
import { StyleSheet } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { textStyles } from "@/styles/text";

interface ProductCategoryCardProps {
  imageUrl: string;
  categoryName: string;
}

const ProductCategoryCard: React.FC<ProductCategoryCardProps> = ({
  imageUrl,
  categoryName,
}) => {
  return (
    <Card
      style={{
        borderRadius: "100%",
        width: 77,
        height: 77,
      }}
    >
      <CardContent style={styles.cardContentStyle}>
        <Image
          style={{
            width: 47,
            height: 35,
          }}
          source={imageUrl}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={[
            textStyles.smMedium,
            {
              textAlign: "center",
            },
          ]}
        >
          {categoryName}
        </Text>
      </CardContent>
    </Card>
  );
};

export default ProductCategoryCard;

const styles = StyleSheet.create({
  cardContentStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
