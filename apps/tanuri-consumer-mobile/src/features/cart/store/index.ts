// store/cartStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "../types";

interface CartStoreState {
  products: Product[];
  productsCount: number;
}

interface CartStoreActions {
  addProduct: (product: Product) => void;
  increaseProductQuantity: (productId: number) => void;
  decreaseProductQuantity: (productId: number) => void;
  removeProduct: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStoreState & CartStoreActions>()(
  persist(
    (set) => ({
      products: [],
      productsCount: 0,

      addProduct: (product) => {
        set((state) => {
          const existing = state.products.find((p) => p.id === product.id);
          const updatedProducts = existing
            ? state.products.map((p) =>
                p.id === product.id
                  ? {
                      ...p,
                      productQuantity:
                        p.productQuantity + product.productQuantity,
                    }
                  : p,
              )
            : [...state.products, product];

          const count = updatedProducts.reduce(
            (acc, p) => acc + p.productQuantity,
            0,
          );

          return { products: updatedProducts, productsCount: count };
        });
      },

      increaseProductQuantity: (productId) => {
        set((state) => {
          const updatedProducts = state.products.map((p) =>
            p.id === productId
              ? { ...p, productQuantity: p.productQuantity + 1 }
              : p,
          );
          const count = updatedProducts.reduce(
            (acc, p) => acc + p.productQuantity,
            0,
          );
          return { products: updatedProducts, productsCount: count };
        });
      },

      decreaseProductQuantity: (productId) => {
        set((state) => {
          const updatedProducts = state.products
            .map((p) =>
              p.id === productId
                ? {
                    ...p,
                    productQuantity:
                      p.productQuantity > 0 ? p.productQuantity - 1 : 0,
                  }
                : p,
            )
            .filter((p) => p.productQuantity > 0);

          const count = updatedProducts.reduce(
            (acc, p) => acc + p.productQuantity,
            0,
          );

          return { products: updatedProducts, productsCount: count };
        });
      },

      removeProduct: (productId) => {
        set((state) => {
          const updatedProducts = state.products.filter(
            (product) => product.id !== productId,
          );
          const count = updatedProducts.reduce(
            (acc, p) => acc + p.productQuantity,
            0,
          );
          return { products: updatedProducts, productsCount: count };
        });
      },

      clearCart: () => set({ products: [], productsCount: 0 }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
