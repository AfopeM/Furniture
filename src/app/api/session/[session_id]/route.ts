import { stripeObj } from "@/libs/stripe";

export async function GET(
  req: Request,
  { params }: { params: { session_id: string } }
) {
  try {
    const { session_id } = params;

    if (!session_id.startsWith("cs_")) {
      throw Error("Incorrect Checkout Session ID.");
    }

    const checkoutSession = await stripeObj.checkout.sessions.retrieve(
      session_id,
      { expand: ["payment_intent", "line_items.data.price.product"] }
    );

    return new Response(JSON.stringify(checkoutSession), { status: 200 });
  } catch (error) {
    const err = error instanceof Error ? error.message : "Internal server";
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
