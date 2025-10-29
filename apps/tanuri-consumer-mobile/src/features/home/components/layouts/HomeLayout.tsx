import { ScrollView } from "react-native";
import { SearchBar } from "@/components/ui/searchbar";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import CartButton from "@/features/cart/components/presenters/CartButton";
import ProductCategoriesListingLayout from "@/features/product-listing/components/layouts/ProductCategoriesListingLayout";
import ProductListingLayout from "@/features/product-listing/components/layouts/ProductListingLayout";
import { useProductFilteringStore } from "@/features/product-listing/store";
import { textStyles } from "@/styles/text";
import Greeter from "../presenters/greeter";
import SpecialOffersListingLayout from "./SpecialOffersListingLayout";

const HomeLayout = () => {
  const { setSearch } = useProductFilteringStore();

  return (
    <View style={{ flex: 1, gap: 12 }}>
      <Greeter />
      <View style={{ flexDirection: "row", gap: 20 }}>
        <SearchBar
          placeholder="What are you looking for"
          inputStyle={[textStyles.normal]}
          onSearch={setSearch}
          containerStyle={{ flex: 1 }}
        />
        <CartButton />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ gap: 12 }}
      >
        <SpecialOffersListingLayout />
        <View
          style={{
            gap: 4,
          }}
        >
          <Text style={[textStyles.medium]}>Categories</Text>
          <ProductCategoriesListingLayout />
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
