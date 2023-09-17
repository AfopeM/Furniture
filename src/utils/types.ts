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
export interface ProductDetailProp extends ProductSnippetProp {
  desc: string;
  origin: string;
  material: string;
  dimension: string;
}

export interface CartItemsProp extends ProductSnippetProp {
  quantity: number;
}
