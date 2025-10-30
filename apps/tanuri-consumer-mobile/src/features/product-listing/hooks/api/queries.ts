// API queries for ProductListing
// API queries for Auth
import { useQuery } from "@tanstack/react-query";
import { protectedApi } from "@/config/kyInstances";
import { useSession } from "@/features/auth/hooks/session";
import type { Category, Product } from "@/features/product-listing/types";
import {
  CATEGORIES_URLS,
  PRODUCT_LISTING_URLS,
} from "@/features/product-listing/urls";
import { useProductFilteringStore } from "../../store";

export const useProducts = () => {
  const { session } = useSession();
  const { categoryId, searchQuery } = useProductFilteringStore();

  const query = useQuery<Product[]>({
    queryKey: ["products", { categoryId, searchQuery }],
    queryFn: async () => {
      if (!session) {
        throw new Error("JWT token is required to fetch user data");
      }
      return await protectedApi(session.access)
        .get(PRODUCT_LISTING_URLS.products, {
          searchParams: {
            ...(categoryId && { categoryId: String(categoryId) }),
            ...(searchQuery && { search: searchQuery }),
          },
        })
        .json<Product[]>();
    },
  });

  return query;
};

export const useCategories = () => {
  const { session } = useSession();

  const query = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!session) {
        throw new Error("JWT token is required to fetch user data");
      }
      return await protectedApi(session.access)
        .get(CATEGORIES_URLS.categories)
        .json<Category[]>();
    },
  });

  return query;
};
