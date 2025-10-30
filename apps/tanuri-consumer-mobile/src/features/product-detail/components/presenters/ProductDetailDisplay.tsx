import { Image } from "expo-image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselItem } from "@/components/ui/carousel";

interface ProductDetailDisplayProps {
  images: {
    id: number;
    image: string;
  }[];
}

const ProductDetailDisplay: React.FC<ProductDetailDisplayProps> = ({
  images,
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
        {images.length > 1 ? (
          <Carousel
            showIndicators={true}
            autoPlay={false}
            loop={false}
            style={{
              flex: 1,
            }}
          >
            {images.map(({ image, id }) => (
              <CarouselItem key={id} style={{ flex: 1 }}>
                <Image
                  source={image}
                  contentFit="contain"
                  style={{
                    flex: 1,
                    aspectRatio: 1,
                  }}
                />
              </CarouselItem>
            ))}
          </Carousel>
        ) : (
          <Image
            source={images[0]?.image || ""}
            contentFit="contain"
            style={{
              flex: 1,
              aspectRatio: 1,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProductDetailDisplay;
