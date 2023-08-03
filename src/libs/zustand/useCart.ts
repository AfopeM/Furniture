import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItemsProp {
  productId: string;
  name: string;
  type: string;
  price: number;
  amount: number;
  image: string;
}

interface CartProp {
  cart: CartItemsProp[];
  cartInfo: () => { totalPrice: number; cartLength: number };
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

      cartInfo: () => {
        const info = get().cart.reduce(
          (acc, item) => {
            acc.totalPrice += item.amount * item.price;
            acc.cartLength += item.amount;

            return { ...acc };
          },
          { totalPrice: 0, cartLength: 0 }
        );

        return info;
      },

      productAmount: (productId) => {
        const amount = get().cart.find((item) => item.productId === productId)
          ?.amount;
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
