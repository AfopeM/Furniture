export interface ProductDetailProp {
  id: string;
  type: string;
  name: string;
  desc: string;
  image: string;
  origin: string;
  material: string;
  dimension: string;
  price: {
    id: string;
    amount: number;
  };
}

export interface ProductSnippetProp {
  id: string;
  name: string;
  type: string;
  image: string;
  price: {
    id: string;
    amount: number;
  };
}

export interface CartItemsProp extends ProductSnippetProp {
  amount: number;
}
