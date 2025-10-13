import { Image } from "expo-image";
import { useRouter } from "expo-router";
import type React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useProductFilteringStore } from "@/features/product-listing/store";
import { textStyles } from "@/styles/text";

export interface ProductCategoryCardProps {
  imageUrl: string;
  categoryName: string;
  categoryId: number;
}

const ProductCategoryCard: React.FC<ProductCategoryCardProps> = ({
  imageUrl,
  categoryName,
  categoryId,
}) => {
  const { setCategory } = useProductFilteringStore();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        setCategory(categoryId);
        router.push("/products");
      }}
      activeOpacity={0.9}
    >
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
    </TouchableOpacity>
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
