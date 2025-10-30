import { Pressable } from "react-native";
import { Badge } from "@/components/ui/badge";
import { View } from "@/components/ui/view";

interface ProductVariantsRadioBadgeProps {
  variants: {
    id: number;
    name: string;
    isInStock?: boolean;
  }[];
  value: number | undefined;
  onValueChange: (id: number) => void;
}

const ProductVariantsRadioBadge: React.FC<ProductVariantsRadioBadgeProps> = ({
  variants,
  value,
  onValueChange,
}) => {
  const handleSelect = (id: number) => {
    onValueChange(id);
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
        const isOutOfStock = variant.isInStock === false;

        return (
          <Pressable
            key={`${variant.id}-${index}`}
            onPress={() => !isOutOfStock && handleSelect(variant.id)}
            disabled={isOutOfStock}
          >
            <Badge
              variant={isSelected ? "default" : "outline"}
              textStyle={{
                fontSize: 12,
                fontWeight: "600",
              }}
              style={{
                borderRadius: 6,
                opacity: isOutOfStock ? 0.5 : 1,
              }}
            >
              {variant.name}
              {isOutOfStock && " (Out of Stock)"}
            </Badge>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ProductVariantsRadioBadge;
