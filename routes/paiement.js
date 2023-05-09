const express = require("express");
const cors = require("cors");

const router = express.Router();

const stripe = require("stripe")(
  "sk_test_51N5qCYEOLgROgT8Xcd1BW3UZRitEMvUd2sjE8Y3OQu02nJnlMbgpId8CjpUrYxmgBUCbFTSqwuVy8P1SOje2KML200NujR4wez"
);

const app = express();
app.use(cors());
app.use(express.json());
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/payment", isAuthenticated, async (req, res) => {
  try {
    const stripeToken = req.body.stripeToken;
    const responseFromStripe = await stripe.charges.create({
      amount: 2000,
      currency: "eur",
      description: "La description de l'objet acheté",
      source: stripeToken,
    });
    console.log(responseFromStripe);
    res.json(responseFromStripe.status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
