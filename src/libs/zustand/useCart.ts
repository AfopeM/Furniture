import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItemsProp } from "@/utils/types";

interface CartProp {
  cart: CartItemsProp[];
  totalPrice: () => number;
  cartLength: () => number;
  productAmount: (productId: string) => number;
  addToCart: (product: CartItemsProp) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  remove: (productId: string) => void;
}

export const useCart = create<CartProp>()(
  persist(
    (set, get) => ({
      cart: [],

      totalPrice: () => {
        const price = get().cart.reduce(
          (acc, item) => acc + item.amount * item.price,
          0
        );
        return price;
      },

      cartLength: () => {
        const length = get().cart.reduce((acc, item) => acc + item.amount, 0);
        return length;
      },

      productAmount: (productId) => {
        const amount = get().cart.find(
          (item) => item.productId === productId
        )?.amount;
        return amount || 0;
      },

      addToCart: (product) => {
        const inCart = get().cart.find(
          (item) => item.productId === product.productId
        );
        if (!inCart) {
          set((state) => {
            state.cart.push(product);
            return { ...state };
          });
        }
      },

      increase: (productId) => {
        set((state) => {
          state.cart.forEach((item) => {
            if (item.productId === productId) item.amount++;
          });
          return { ...state };
        });
      },

      decrease: (productId) => {
        set((state) => {
          const newCart = state.cart
            .map((item) => {
              if (item.productId === productId) item.amount--;
              return item;
            })
            .filter((item) => item.amount >= 1);

          return { ...state, cart: newCart };
        });
      },

      remove: (productId) => {
        set((state) => {
          const newCart = state.cart.filter(
            (item) => item.productId !== productId
          );
          return { ...state, cart: newCart };
        });
      },
    }),
    { name: "cart-storage" }
  )
);
