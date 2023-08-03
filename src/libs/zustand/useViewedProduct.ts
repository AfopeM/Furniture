import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductCardProp } from "@/utils/types";

interface ViewedProductsProp {
  viewed: ProductCardProp[];
  addToViewed: (product: ProductCardProp) => void;
}

export const useViewedProducts = create<ViewedProductsProp>()(
  persist(
    (set, get) => ({
      viewed: [],
      addToViewed: (product) => {
        const newProducts = get().viewed.filter(
          (view) => view.id !== product.id
        );
        newProducts.unshift(product);

        set((state) => {
          if (state.viewed.length > 4) state.viewed.pop();
          return { ...state, viewed: newProducts };
        });
      },
    }),
    { name: "viewed-product" }
  )
);
