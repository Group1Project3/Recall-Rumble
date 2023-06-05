const router = require('express').Router();
const userRoutes = require('./user-routes');
const stripeRoutes = require('./Stripe');  // Stripe routes

router.use('/users', userRoutes);
router.use('/stripe', stripeRoutes);

module.exports = router;
