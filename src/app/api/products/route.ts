import Stripe from "stripe";
import type { ProductDetailProp } from "@/utils/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export async function GET() {
  try {
    const inventory = await stripe.products.list({
      expand: ["data.default_price"],
      limit: 16,
    });

    const products = inventory.data.map((item) => {
      const product = {
        id: item.id.replace("prod_", ""),
        type: (item.metadata as Stripe.Metadata).type,
        name: item.name,
        desc: item.description,
        image: item.images[0],
        origin: (item.metadata as Stripe.Metadata).origin,
        material: (item.metadata as Stripe.Metadata).material,
        dimension: (item.metadata as Stripe.Metadata).dimensions,
        price: {
          id: (item.default_price as Stripe.Price).id,
          amount: (item.default_price as Stripe.Price).unit_amount,
        },
      } as ProductDetailProp;

      return product;
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(`ServerError:${error}`, { status: 500 });
  }
}
