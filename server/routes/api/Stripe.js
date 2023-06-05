require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const { donationAmount } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Donation',
                    },
                    unit_amount: donationAmount * 100, // Stripe uses cents instead of dollars
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        // this needs to be modified to your website's URL (each heroku app has a unique URL)
        success_url: 'http://localhost:3000/Donate',
        cancel_url: 'http://localhost:3000/canceled',
    });

    res.json({ id: session.id });
});

module.exports = router;
