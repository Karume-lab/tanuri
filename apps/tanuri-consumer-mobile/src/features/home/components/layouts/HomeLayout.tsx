import { ScrollView } from "react-native";
import { SearchBar } from "@/components/ui/searchbar";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import CartButton from "@/features/cart/components/presenters/CartButton";
import ProductCategoiesListingLayout from "@/features/product-listing/components/layouts/ProductCategoiesListingLayout";
import ProductListingLayout from "@/features/product-listing/components/layouts/ProductListingLayout";
import { useProductFilteringStore } from "@/features/product-listing/store";
import { textStyles } from "@/styles/text";
import SpecialOffersCard from "../presenters/SpecialOffersCard";

const HomeLayout = () => {
  const { setSearch } = useProductFilteringStore();

  const specialOfferConfig = {
    imageUrl: require("public/assets/cylinders.png"),
    productCategory: "cylinders",
    percenageOff: 30,
  };

  return (
    <View style={{ flex: 1, gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <SearchBar
          placeholder="What are you looking for"
          inputStyle={[textStyles.normal]}
          onSearch={setSearch}
          containerStyle={{ flex: 1 }}
        />
        <CartButton />
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 12 }}>
        <SpecialOffersCard
          productCategory={specialOfferConfig.productCategory}
          imageUrl={specialOfferConfig.imageUrl}
          percentageOff={specialOfferConfig.percenageOff}
        />
        <View
          style={{
            gap: 4,
          }}
        >
          <Text style={[textStyles.medium]}>Categories</Text>
          <View></View>
          <ProductCategoiesListingLayout />
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={[textStyles.medium]}>Best selling</Text>
          <ProductListingLayout />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeLayout;
