import type React from "react";
import { type SetStateAction, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { textStyles } from "@/styles/text";

interface ProductDetailInfoProps {
  productName: string;
  productDescription: string;
  productPrice: number;
  variants?: {
    name: string;
    variants: {
      id: number;
      name: string;
    }[];
  }[];
}
const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({
  productName,
  productPrice,
  productDescription,
  variants,
}) => {
  const [value, setValue] = useState<number>();
  useEffect(() => {
    if (variants) {
      setValue(variants[0].variants[0].id);
    }
  }, [variants]);
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 4 }}>
        <Text style={[textStyles.medium]}>{productName}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text style={[textStyles.normal]}>ksh</Text>
          <Text style={[textStyles.large]}>{productPrice}</Text>
        </View>
      </View>
      {variants?.map((variant, index) => (
        <View style={{ gap: 8 }} key={`${variant.name}-${index}`}>
          <Text style={[textStyles.badgeText]}>{variant.name}</Text>
          <ProductVariantsRadioBadge
            variants={variant.variants}
            value={value}
            onValueChange={setValue}
          />
        </View>
      ))}

      <View style={{ gap: 4 }}>
        <Text style={[textStyles.badgeText]}>Description</Text>
        <Text style={[textStyles.normal]}>{productDescription}</Text>
      </View>
    </View>
  );
};

export default ProductDetailInfo;

interface ProductVariantsRadioBadgeProps {
  variants: {
    id: number;
    name: string;
  }[];
  value: number | undefined;
  onValueChange: React.Dispatch<SetStateAction<number | undefined>>;
}

const ProductVariantsRadioBadge: React.FC<ProductVariantsRadioBadgeProps> = ({
  variants,
  value,
  onValueChange,
}) => {
  const handleSelect = (id: number) => {
    if (onValueChange) {
      onValueChange(id);
    }
  };

  return (
    <View
      style={{
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 12,
      }}
    >
      {variants.map((variant, index) => {
        const isSelected = value === variant.id;
        return (
          <Pressable
            key={`${variant.id}-${index}`}
            onPress={() => handleSelect(variant.id)}
          >
            <Badge
              // todo: fix size defference when changing between default and outline variants
              variant={isSelected ? "default" : "outline"}
              textStyle={textStyles.badgeText}
              style={{
                borderRadius: 6,
              }}
            >
              {variant.name}
            </Badge>
          </Pressable>
        );
      })}
    </View>
  );
};
