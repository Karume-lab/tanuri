import type React from "react";
import { useState } from "react";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import type { ProductVariant } from "@/features/product-detail/types";
import { useThemeColor } from "@/hooks/useThemeColor";
import { textStyles } from "@/styles/text";
import ProductVariantsRadioBadge from "./ProductVariantsRadioBadge";

interface ProductDetailInfoProps {
  productName: string;
  variants: ProductVariant[];
  onVariantChange?: (variant: ProductVariant) => void;
}

const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({
  productName,
  variants,
  onVariantChange,
}) => {
  const [selectedId, setSelectedId] = useState<number>(variants[0].id);
  const green = useThemeColor({}, "green");
  const red = useThemeColor({}, "red");

  const handleVariantSelect = (variantId: number) => {
    setSelectedId(variantId);
    const selectedVariant = variants.find((v) => v.id === variantId);
    if (selectedVariant && onVariantChange) {
      onVariantChange(selectedVariant);
    }
  };

  const selectedVariant = variants.find((v) => v.id === selectedId);

  return (
    <View style={{ gap: 16 }}>
      {/* Product Name and Price Section */}
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
          <Text style={[textStyles.large]}>
            {parseInt(selectedVariant!.price, 10)}
          </Text>
        </View>
        {/* Show selected variant name if available */}
        {selectedVariant && (
          <Text style={[textStyles.smMedium]}>
            Selected: {selectedVariant.name}
          </Text>
        )}
      </View>

      {/* Variants Selection - Only show if there are multiple variants */}
      {variants && variants.length > 1 && (
        <View style={{ gap: 8 }}>
          <Text style={[textStyles.badgeText]}>Choose Variant</Text>
          <ProductVariantsRadioBadge
            variants={variants.map((v) => ({
              id: v.id,
              name: v.name,
              isInStock: v.isInStock,
            }))}
            value={selectedId}
            onValueChange={handleVariantSelect}
          />
        </View>
      )}

      {/* Product Description Section */}
      <View style={{ gap: 4 }}>
        <Text style={[textStyles.badgeText]}>Description</Text>
        <Text style={[textStyles.normal]}>{selectedVariant!.description}</Text>
      </View>

      {/* Stock Information */}
      {selectedVariant && (
        <View style={{ gap: 4 }}>
          <Text style={[textStyles.badgeText]}>Availability</Text>
          <Text
            style={[
              textStyles.normal,
              {
                color: selectedVariant.isInStock ? green : red,
              },
            ]}
          >
            {selectedVariant.isInStock
              ? `In Stock (${selectedVariant.stockQuantity} available)`
              : "Out of Stock"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductDetailInfo;
