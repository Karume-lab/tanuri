import { SearchBar } from "@/components/ui/searchbar";
import { View } from "@/components/ui/view";
import CartButton from "@/features/cart/components/presenters/CartButton";
import { textStyles } from "@/styles/text";
import { useProductFilteringStore } from "../../store";
import ProductListingLayout from "../layouts/ProductListingLayout";

const ProductListingContainer = () => {
  const { setSearch } = useProductFilteringStore();
  return (
    <View style={{ gap: 10, flex: 1 }}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <SearchBar
          placeholder="What are you looking for"
          inputStyle={[textStyles.normal]}
          containerStyle={{ flex: 1 }}
          onSearch={setSearch}
          debounceMs={3}
        />
        <CartButton />
      </View>

      <ProductListingLayout />
    </View>
  );
};

export default ProductListingContainer;
