import { FlashList } from "@shopify/flash-list";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useProducts } from "../../hooks/api/queries";
import ProductListingCard, {
  type ProductListingCardProps,
} from "../presenters/ProductListingCard";

const ProductListingLayout = () => {
  const { data, isPending, isError, error } = useProducts();

  const products: ProductListingCardProps[] | undefined = data?.map((item) => ({
    productId: item.id,
    productName: item.name,
    productPrice: parseInt(item.variants[0].price, 10),
    defaultVariant: item.variants[0],
  }));

  return (
    <FlashList
      numColumns={2}
      data={products}
      style={{ flex: 1 }}
      ListEmptyComponent={
        isPending ? (
          <Spinner />
        ) : isError ? (
          <Text>{error.message}</Text>
        ) : (
          <Text>no products</Text>
        )
      }
      renderItem={({ item }) => {
        return (
          <View
            style={{
              flex: 1,
              padding: 6,
            }}
          >
            <ProductListingCard {...item} />
          </View>
        );
      }}
    />
  );
};

export default ProductListingLayout;
