const stripe = require('stripe')(process.env.SK_TEST)

const DOMAIN = "http://localhost:5173"

const createCheckoutSession = async (req, res) => {
    // const prices = await stripe.prices.list({
    //     lookup_keys: [req.body.lookup_key],
    //     expand: ['data.product']
    // })
    try {
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            payment_method_types: ['card', "paypal", "sepa_debit"],
            line_items: [
                {
                    // price: prices?.data[0]?.id,
                    price: "price_1O17VxKAfQUpwzxoa4noTpy5",
                    quantity: 1,
                }
            ],
            mode: 'subscription',
            success_url: `${DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}?canceled=true`,
            automatic_tax: { enabled: true },
        })
        return res.status(303).json({ sessionUrl: session.url })
    } catch (err) {
        console.log(err);
    }
}


// Not in test mode
const createPortal = async (req, res) => {
    const session_id = req.body
    const checkoutSession = await stripe.checkout.sessions.retrieve("cs_test_a1SLfB5Cy1K0L84LJFZdeR5e1ls3SpbLLk4O5BGceQ1MrtYpYDNIveEZtu");
    const returnUrl = DOMAIN;

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer,
        return_url: returnUrl,
    });

    console.log(portalSession.url);

    return res.status(303).json({ portalUrl: portalSession.url })
}

const webhook = async (req, res) => {

    let event = req.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = 'whsec_caibGtVDs2uecPiBLLz15OYjzdIF1cze';
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return res. sendStatus(400);
        }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
        case 'customer.subscription.trial_will_end':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            // Then define and call a method to handle the subscription trial ending.
            // handleSubscriptionTrialEnding(subscription);
            break;
        case 'customer.subscription.deleted':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            // Then define and call a method to handle the subscription deleted.
            // handleSubscriptionDeleted(subscriptionDeleted);
            break;
        case 'customer.subscription.created':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            // Then define and call a method to handle the subscription created.
            // handleSubscriptionCreated(subscription);
            break;
        case 'customer.subscription.updated':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            // Then define and call a method to handle the subscription update.
            // handleSubscriptionUpdated(subscription);
            break;
        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send();
}
      
      







module.exports = { createCheckoutSession, createPortal, webhook }