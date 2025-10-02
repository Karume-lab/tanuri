import { Image } from "expo-image";
import { Card, CardContent } from "@/components/ui/card";

interface ProductDetailDisplayProps {
  imageUrl: string;
}
const ProductDetailDisplay: React.FC<ProductDetailDisplayProps> = ({
  imageUrl,
}) => {
  return (
    <Card
      style={{
        width: 375,
        height: 320,
        padding: 40,
        alignItems: "center",
        borderRadius: 8,
      }}
    >
      <CardContent
        style={{
          flex: 1,
        }}
      >
        <Image
          source={imageUrl}
          contentFit="contain"
          style={{
            flex: 1,
            aspectRatio: 1,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ProductDetailDisplay;
