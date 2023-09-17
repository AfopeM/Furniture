import { create } from "zustand";
import { toast } from "react-hot-toast";
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
          (acc, item) => acc + item.quantity * item.price.amount,
          0
        );
        return price;
      },

      cartLength: () => {
        const length = get().cart.reduce((acc, item) => acc + item.quantity, 0);
        return length;
      },

      productAmount: (productId) => {
        const amount = get().cart.find(
          (item) => item.id === productId
        )?.quantity;
        return amount || 0;
      },

      addToCart: (product) => {
        const inCart = get().cart.find((item) => item.id === product.id);
        if (!inCart) {
          set((state) => {
            const id = toast.loading("Adding 1 item...");
            state.cart.push(product);
            toast.success(`${product.name} added to cart`, { id });
            return { ...state };
          });
        }
      },

      increase: (productId) => {
        set((state) => {
          state.cart.forEach((item) => {
            if (item.id === productId) item.quantity++;
          });
          return { ...state };
        });
      },

      decrease: (productId) => {
        set((state) => {
          const newCart = state.cart
            .map((item) => {
              if (item.id === productId) item.quantity--;
              return item;
            })
            .filter((item) => item.quantity >= 1);

          return { ...state, cart: newCart };
        });
      },

      remove: (productId) => {
        set((state) => {
          const newCart = state.cart.filter((item) => item.id !== productId);
          return { ...state, cart: newCart };
        });
      },
    }),
    { name: "cart-storage" }
  )
);
