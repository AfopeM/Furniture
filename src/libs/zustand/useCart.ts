import { create } from "zustand";

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
  productAmount: (productId: string) => number;
  addToCart: (product: CartItemsProp) => void;
  //   increase: (productId: string) => void;
  //   decrease: (productId: string) => void;
}

export const useCart = create<CartProp>()((set, get) => ({
  cart: [],

  productAmount: (productId) => {
    const amount = get().cart.find((item) => item.productId === productId)
      ?.amount;
    return amount || 0;
  },

  addToCart: (product) => {
    if (get().cart.length < 1) set((state) => ({ ...state, cart: [product] }));

    // const newCart = get().cart.reduce((acc, item) => {
    //   if (item.productId === product.productId) return acc;
    //   return { ...acc, product };
    // }, [] as CartItemsProp[]);

    // set((state) => ({ ...state, cart: newCart }));
    console.log(get().cart);
  },
}));
