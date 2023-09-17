import Stripe from "stripe";
import { stripeObj } from "@/libs/stripe";
import type { ProductSnippetProp } from "@/utils/types";

export async function GET() {
  try {
    const inventory = await stripeObj.products.list({
      expand: ["data.default_price"],
      limit: 4,
    });

    const products = inventory.data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        desc: item.description,
        image: item.images[0],
        type: (item.metadata as Stripe.Metadata).type,
        price: {
          id: (item.default_price as Stripe.Price).id,
          amount: (item.default_price as Stripe.Price).unit_amount,
        },
      } as ProductSnippetProp;
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(`ServerError:${error}`, { status: 500 });
  }
}
