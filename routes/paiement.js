const express = require("express");
const cors = require("cors");

const router = express.Router();

const stripe = require("stripe")(
  "sk_test_51N5qCYEOLgROgT8Xcd1BW3UZRitEMvUd2sjE8Y3OQu02nJnlMbgpId8CjpUrYxmgBUCbFTSqwuVy8P1SOje2KML200NujR4wez"
);

const app = express();
app.use(cors());
app.use(express.json());

router.post("/payment", async (req, res) => {
  try {
    const stripeToken = req.body.stripeToken;
    const response = await stripe.charges.create({
      amount: 2000,
      currency: "eur",
      description: "description de l'obj",
      source: stripeToken,
    });
    console.log(response);
    res.json("ok");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
