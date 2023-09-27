import { stripeObj } from "@/libs/stripe";

export async function POST(req: Request) {
  try {
    const line_items = await req.json();

    const session = await stripeObj.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env
        .NEXT_PUBLIC_URL!}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL!}/cart`,
    });

    return new Response(JSON.stringify(session), { status: 200 });
  } catch (error) {
    const err = `Server${error}`;
    console.log(err);
    return new Response(err, { status: 500 });
  }
}
