const stripe = require("stripe")(process.env.SK_TEST);
const express = require("express");
const app = express();
const getRawBody = require("raw-body");
const DOMAIN = "http://localhost:3000";

const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      payment_method_types: ["card", "paypal", "sepa_debit"],
      line_items: [
        {
          price: "price_1O17VxKAfQUpwzxoa4noTpy5",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${DOMAIN}/dashboard/Sitter?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/dashboard/Sitter?canceled=true`,
      automatic_tax: { enabled: true },
    });
    return res.status(200).json({ sessionUrl: session.url });
  } catch (err) {
    console.log(err);
  }
};

// Not in test mode
const createPortal = async (req, res) => {
  const session_id = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(
    "cs_test_a1SLfB5Cy1K0L84LJFZdeR5e1ls3SpbLLk4O5BGceQ1MrtYpYDNIveEZtu"
  );
  const returnUrl = DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  console.log(portalSession.url);

  return res.status(303).json({ portalUrl: portalSession.url });
};

const webhook = async (req, res) => {
  const webhookSecret =
    "whsec_95ba0732d2069d38c914b8ee2cb43974866b0d79331c977f1d62a66cd265eaea";
  let event;
  let status;

  try {
    const sig = req?.headers["stripe-signature"];
    console.log(sig);
    event = stripe.webhooks.constructEvent(req?.body, sig, webhookSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log("Event Type: ", event.type);

  switch (event?.type) {
    case "payment_intent.succeeded":
      paymentSucceed = event.data.object;
      status = paymentSucceed.status;
      res
        .status(200)
        .json({ success: "The user payment succeed!", status: status });
      break;
    case "customer.subscription.deleted":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Subscription status is ${status}.`);
      res.status(204).json({
        message: "The user subscription has been deleted!",
        status: status,
      });
      break;
    case "customer.subscription.created":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Subscription status is ${status}.`);
      res.status(201).json({
        message: "The user subscription has correctly been setup",
        status: status,
      });
      break;
    case "customer.subscription.updated":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Subscription status is ${status}.`);
      res.status(200).json({
        message: "The user subscription has correctly been updated",
        status: status,
      });
      break;
    case " payment_intent.canceled":
      canceled = event.data.object;
      status = canceled.status;
      console.log(`Subscription status is ${status}.`);
      res.status(204).json({
        message: "The user subscription has been canceled",
        status: status,
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.sendStatus(200);
};

module.exports = { createCheckoutSession, createPortal, webhook };
