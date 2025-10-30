import { useLocalSearchParams, useRouter } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import { useEffect, useState } from "react";
import ScreenHeader from "@/components/presenters/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import type { Product } from "@/features/cart";
import CartButton from "@/features/cart/components/presenters/CartButton";
import { useCartStore } from "@/features/cart/store";
import { useProductDetail } from "../../hooks/api/queries";
import type { ProductVariant } from "../../types";
import ProductDetailDisplay from "../presenters/ProductDetailDisplay";
import ProductDetailInfo from "../presenters/ProductDetailInfo";

const ProductDetailContainer = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addProduct } = useCartStore();
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );

  const { data: product, isPending, isError, error } = useProductDetail(id);

  useEffect(() => {
    if (product?.variants && product.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, selectedVariant]);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    // Add the selected product variant to cart with all relevant info
    const cartProduct = {
      id: selectedVariant.id,
      imageUrl: selectedVariant.images?.[0].image || "",
      productName: product.name,
      productPrice: parseInt(selectedVariant.price, 10),
      productVariant: selectedVariant.name,
      productQuantity: 1,
      // Additional useful info
      variantId: selectedVariant.id,
      productId: product.id,
      isInStock: selectedVariant.isInStock,
      stockQuantity: selectedVariant.stockQuantity,
    };

    addProduct(cartProduct as Product);
  };

  const currentImages = selectedVariant?.images || [];

  if (isPending) {
    return (
      <View style={{ flex: 1 }}>
        <ScreenHeader screenTitle="Loading..." rightSection={<CartButton />} />
        <Spinner />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ScreenHeader screenTitle="Error" rightSection={<CartButton />} />
        <Text>Error loading product: {error.message}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ScreenHeader screenTitle="Not Found" rightSection={<CartButton />} />
        <Text>Product not found</Text>
      </View>
    );
  }

  const canAddToCart =
    selectedVariant?.isInStock && selectedVariant?.stockQuantity > 0;

  return (
    <View style={{ gap: 20, flex: 1, alignItems: "center" }}>
      <ScreenHeader screenTitle={product.name} rightSection={<CartButton />} />

      <ProductDetailDisplay images={currentImages} />

      <View style={{ flex: 0.7, justifyContent: "space-between" }}>
        <ProductDetailInfo
          productName={product.name}
          variants={product.variants}
          onVariantChange={handleVariantChange}
        />

        <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
          <Button
            style={{
              flex: 0.8,
              opacity: canAddToCart ? 1 : 0.5,
            }}
            variant="outline"
            icon={ShoppingCart}
            onPress={handleAddToCart}
            disabled={!canAddToCart}
          >
            {canAddToCart ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button
            style={{
              flex: 0.8,
              opacity: canAddToCart ? 1 : 0.5,
            }}
            disabled={!canAddToCart}
            onPress={() => {
              handleAddToCart();
              router.push("/checkout");
            }}
          >
            Buy now
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailContainer;
