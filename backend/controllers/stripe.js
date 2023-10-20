const stripe = require("stripe")(process.env.SK_TEST);
const express = require("express");
const app = express();
const getRawBody = require("raw-body");
const DOMAIN = "http://localhost:3000";
const User = require("../model/user");

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

    return res.status(200).json({
      sessionUrl: session.url,
    });
  } catch (err) {
    console.log(err);
  }
};

const getCustomerId = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const sessionRetrieve = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer"],
    });

    console.log(sessionRetrieve);
    return res.status(200).json({ customerId: sessionRetrieve.customer.id });
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
  const webhookSecret = "whsec_wTWw0uoH4ZS07KlikwLBT2YUS9yJBHw2";

  let event;
  let status;

  try {
    const sig = req.headers["stripe-signature"];
    console.log(sig);
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log("Event Type: ", event.type);

  switch (event?.type) {
    case "payment_intent.succeeded":
      paymentSucceed = event.data.object;
      status = paymentSucceed.status;
      try {
        const customerSucceeded = await User.find({
          email: paymentSucceed.biling_details.email,
        }).exec();
        if (customerSucceeded) {
          customerSucceeded.isSubActive = true;
          customerSucceeded.customerId = paymentSucceed.customer;
          await customerSucceeded.save();
          console.log("Customer Payment succeeded!", customerSucceeded);
        }
      } catch (err) {
        console.log(err);
      }

      break;
    case "checkout.session.completed":
      sessionCompleted = event.data.object;
      status = sessionCompleted.status;
      const customerId = sessionCompleted.customer;
      try {
        const user = await User.findOne({
          email: sessionCompleted.customer_details.email,
        }).exec();
        if (user) {
          user.isSubActive = true;
          user.sessionId = sessionCompleted.id;
          user.customerId = sessionCompleted.customer;
          await user.save();
          console.log("Customer is Subscribed! ", user);
        }
      } catch (err) {
        console.log(err);
      }
      break;
    case "customer.subscription.created":
      // Gérer l'événement d'abonnement créé ici
      subscription = event.data.object;
      status = subscription.status;
      console.log("Subscription status is", status);
      try {
        const customerSubCreated = await User.findOne({
          customerId: subscription.customer,
        });
        if (customerSubCreated) {
          customerSubCreated.isSubActive = true;
          customerSubCreated.customerId = subscription.customer;
          await customerSubCreated.save();
          console.log("Customer Updated successfully!", customerSubCreated);
        }
      } catch (err) {
        console.log(err);
      }
      break;
    case "customer.subscription.updated":
      subscription = event.data.object;
      status = subscription.status;
      console.log("Subscription status is", status);
      try {
        const customerSubUpdated = await User.find({
          email: subscription.email,
        }).exec();
        if (customerSubUpdated) {
          customerSubUpdated.isSubActive = true;
          customerSubUpdated.customerId = subscription.customer;
        }
      } catch (err) {
        console.log(err);
      }
      break;
    case "customer.subscription.deleted":
      subscription = event.data.object;
      status = subscription.status;
      console.log("Subscription status is", status);
      try {
        console.log("CustomerId: ", subscription.customer);
        const customerSubDeleted = await User.findOne({
          customerId: subscription.customer,
        }).exec();
        console.log("Customer: ", customerSubDeleted);
        if (customerSubDeleted) {
          customerSubDeleted.sessionId = null;
          customerSubDeleted.customerId = null;
          customerSubDeleted.isSubActive = false;
          await customerSubDeleted.save();
          console.log("Customer successfully deleted", customerSubDeleted);
        }
      } catch (err) {
        console.log(err);
      }
      break;
    case "checkout.session.async_payment_failed":
      // Gérer l'événement d'échec de paiement asynchrone ici
      // Ajoutez votre logique pour cet événement
      break;
    case "checkout.session.async_payment_succeeded":
      // Gérer l'événement de réussite de paiement asynchrone ici
      // Ajoutez votre logique pour cet événement
      break;
    case "customer.subscription.paused":
      // Gérer l'événement de suspension d'abonnement ici
      // Ajoutez votre logique pour cet événement
      break;
    case "customer.subscription.pending_update_applied":
      // Gérer l'événement de mise à jour d'abonnement en attente appliqué ici
      // Ajoutez votre logique pour cet événement
      break;
    case "customer.subscription.pending_update_expired":
      // Gérer l'événement d'expiration de la mise à jour d'abonnement en attente ici
      // Ajoutez votre logique pour cet événement
      break;
    case "customer.subscription.resumed":
      // Gérer l'événement de reprise d'abonnement ici
      // Ajoutez votre logique pour cet événement
      break;
    case "payment_intent.canceled":
      // Gérer l'événement d'annulation de paiement ici
      // Ajoutez votre logique pour cet événement
      break;
    case "payment_intent.created":
      // Gérer l'événement de création de paiement ici
      // Ajoutez votre logique pour cet événement
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ message: "OK" });
};

module.exports = {
  createCheckoutSession,
  createPortal,
  getCustomerId,
  webhook,
};
