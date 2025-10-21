import { Carousel, CarouselItem } from "@/components/ui/carousel";
import SpecialOffersCard from "../presenters/SpecialOffersCard";

const SpecialOffersListingLayout = () => {
  const specialOfferConfig = {
    imageUrl: require("public/assets/cylinders.png"),
    productCategory: "cylinders",
    percenageOff: 30,
  };

  return (
    <Carousel showIndicators={true} autoPlay={true} loop={true}>
      <CarouselItem>
        <SpecialOffersCard
          productCategory={specialOfferConfig.productCategory}
          imageUrl={specialOfferConfig.imageUrl}
          percentageOff={specialOfferConfig.percenageOff}
        />
      </CarouselItem>
      <CarouselItem>
        <SpecialOffersCard
          productCategory={specialOfferConfig.productCategory}
          imageUrl={specialOfferConfig.imageUrl}
          percentageOff={specialOfferConfig.percenageOff}
        />
      </CarouselItem>
      <CarouselItem>
        <SpecialOffersCard
          productCategory={specialOfferConfig.productCategory}
          imageUrl={specialOfferConfig.imageUrl}
          percentageOff={specialOfferConfig.percenageOff}
        />
      </CarouselItem>
    </Carousel>
  );
};

export default SpecialOffersListingLayout;
