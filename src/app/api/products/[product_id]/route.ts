import Stripe from "stripe";
import { stripeObj } from "@/libs/stripe";
import type { ProductDetailProp, ProductSnippetProp } from "@/utils/types";

export async function GET(
  req: Request,
  { params }: { params: { product_id: string } }
) {
  try {
    const id = params.product_id;
    const inventory = await stripeObj.products.list({
      expand: ["data.default_price"],
      limit: 15,
    });

    // Get Product
    const stripeProduct = inventory.data.find((item) => item.id === id);

    const getProduct = {
      id: stripeProduct?.id,
      name: stripeProduct?.name,
      image: stripeProduct?.images[0],
      desc: stripeProduct?.description,
      type: (stripeProduct?.metadata as Stripe.Metadata).type,
      origin: (stripeProduct?.metadata as Stripe.Metadata).origin,
      material: (stripeProduct?.metadata as Stripe.Metadata).material,
      dimension: (stripeProduct?.metadata as Stripe.Metadata).dimensions,
      price: {
        id: (stripeProduct?.default_price as Stripe.Price).id,
        amount: (stripeProduct?.default_price as Stripe.Price).unit_amount,
      },
    } as ProductDetailProp;

    // Get Related Products
    let getRelatedProducts = inventory.data
      .filter(
        (item) => item.id !== id && item.metadata.type === getProduct.type
      )
      .map((item) => {
        return {
          id: item.id,
          name: item.name,
          image: item.images[0],
          type: (item.metadata as Stripe.Metadata).type,
          price: {
            id: (item.default_price as Stripe.Price).id,
            amount: (item.default_price as Stripe.Price).unit_amount,
          },
        } as ProductSnippetProp;
      });

    return new Response(
      JSON.stringify({
        product: getProduct,
        relatedProducts: getRelatedProducts,
      }),
      { status: 200 }
    );
  } catch (error) {
    const e = `ServerError:${error}`;
    console.log(e);
    return new Response(JSON.stringify(e), { status: 500 });
  }
}
