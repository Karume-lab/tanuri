import { FlashList } from "@shopify/flash-list";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useCategories } from "../../hooks/api/queries";
import ProductCategoryCard, {
  type ProductCategoryCardProps,
} from "../presenters/ProductCategoryCard";

const ProductCategoiesListingLayout = () => {
  const { data, isPending, isError, error } = useCategories();
  const productCardConfig: ProductCategoryCardProps[] | undefined = data?.map(
    (category) => ({
      categoryId: category.id,
      categoryName: category.name,
      imageUrl: category.icon,
    }),
  );
  return (
    <FlashList
      horizontal={true}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      ListEmptyComponent={
        isPending ? (
          <Spinner />
        ) : isError ? (
          <Text>{error.message}</Text>
        ) : (
          <Text>no products</Text>
        )
      }
      data={productCardConfig}
      renderItem={({ item: category }) => {
        return (
          <ProductCategoryCard
            categoryId={category.categoryId}
            categoryName={category.categoryName}
            imageUrl={category.imageUrl}
          />
        );
      }}
    />
  );
};

export default ProductCategoiesListingLayout;
