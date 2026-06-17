import Stripe from "stripe";
import prisma from "../lib/prisma.js";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
}) : null;

export async function createCheckoutSession({ userId, carId, origin }) {
  const car = await prisma.car.findUnique({
    where: { id: parseInt(carId, 10) },
  });

  if (!car) {
    throw new Error("Car not found");
  }

  // Create pending order
  const order = await prisma.order.create({
    data: {
      userId,
      carId: car.id,
      pricePaid: car.price,
      status: "PENDING",
    },
  });

  if (!stripe) {
    console.warn("Stripe Secret Key is not configured. Simulating mock checkout redirect.");
    // Return a mock redirect url
    return `${origin}/orders?mock_checkout_success=true&order_id=${order.id}`;
  }

  const images = [];
  if (car.image) {
    if (car.image.startsWith("http")) {
      images.push(car.image);
    } else {
      images.push(`${origin}${car.image}`);
    }
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: car.name,
            description: car.description || `Purchase of ${car.brand} ${car.name}`,
            images: images,
          },
          unit_amount: car.price * 100, // cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/orders?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cars/${car.id}?cancelled=true`,
    metadata: {
      orderId: order.id,
      userId,
      carId: car.id.toString(),
    },
  });

  // Update order with Stripe Session ID
  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  });

  return session.url;
}

export async function handleWebhookEvent(signature, rawBody) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn("Stripe webhook helper executed but key/secret is missing.");
    return { status: "ignored" };
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook construction error:", err.message);
    throw new Error(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "COMPLETED" },
      });
      console.log(`Order ${orderId} marked as COMPLETED.`);
    }
  }

  return { status: "success" };
}
