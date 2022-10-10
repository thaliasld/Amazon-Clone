const functions = require("firebase-functions");
const express = require("express");
//like security
const cors = require("cors");
//we put the secret key from stripe
const stripe = require("stripe")(
  "sk_test_51LpZB0EMn6PIPrbbdoQ7SS6xENyNC4rkC9epjuxYSpt7xfsMC2oYidAG4ZIx6bIGnEizCi6WeBzrlbkdppR0dchf006V0A1dvJ"
);

//API

// - API config
const app = express();

// - Middle_wares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (req, res) => {
  res.send("Hello from Thalia");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payments Request Recieved of amount: ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currency
    currency: "usd",
  });

  //201 means: OK - Created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// -Listen command
exports.api = functions.https.onRequest(app);