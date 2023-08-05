export interface ProductDetailProp {
  id: string;
  image: string;
  name: string;
  price: number;
  desc: string;
  type: string;
  origin: string;
  material: string;
  dimensions: string;
}

export interface ProductCardProp {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
}


export interface CartItemsProp {
  productId: string;
  name: string;
  type: string;
  price: number;
  amount: number;
  image: string;
}