// API queries for ProductDetail

import { useQuery } from "@tanstack/react-query";
import { protectedApi } from "@/config/kyInstances";
import { useSession } from "@/features/auth/hooks/session";
import type { ProductDetail } from "@/features/product-detail/types";
import { PRODUCT_DETAIL_URLS } from "@/features/product-detail/urls";

export const useProductDetail = (productId: string | number) => {
  const { session } = useSession();

  const query = useQuery<ProductDetail>({
    queryKey: ["product-detail", productId],
    queryFn: async () => {
      if (!session) {
        throw new Error("JWT token is required to fetch product data");
      }
      return await protectedApi(session.access)
        .get(PRODUCT_DETAIL_URLS.product(productId))
        .json<ProductDetail>();
    },
    enabled: !!productId && !!session,
  });

  return query;
};
