import './App.css'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('PUBLISHED_KEY');

function App() {


  const clickHandler = async()=>{
      const stripe = await stripePromise

      const response  = await fetch('http://localhost:8000/create-checkout-session',{
        method : 'POST',
        headers: {"content-Type":"application/json"}
      })

      const session = await response.json()
      const result = await stripe.redirectToCheckout({
        sessionId:session.id
      })

      if(result.error){
        alert(result.error.message)
      }
  }

  return (
    <>
      <button onClick={clickHandler}>
        Payment
      </button>
    </>
  )
}

export default App
