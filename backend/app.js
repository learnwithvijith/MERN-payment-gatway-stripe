import express from "express";
import Stripe from "stripe";
import cors from 'cors'

const app = express();
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const stripe = new Stripe("SECRET_KEY"); // your test secret key

app.post("/create-checkout-session", async (req, res) => {
    
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Test Product",
            },
            unit_amount: 5000,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/',async(req,res)=>{
    res.json({message:'success'})
})




app.listen(8000, () => console.log("Server running on http://localhost:8000"));
