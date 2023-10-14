import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const handleCheckout = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch("http://localhost:3500/stripe/createCheckout", {
        method: "POST",
      })
     const data = await response.json()
     if (response.status === 200) {
      console.log("Fetch correctly");
      window.location.href = data.sessionUrl; // Rediriger l'utilisateur vers l'URL reçue
    } else {
      console.error("Failed to fetch");
    }
      
    }catch(err){
      console.log(err);
    }
  }



  return (
    <div>
      <form onSubmit={(e)=> handleCheckout(e)}>
        {/* Add a hidden field with the lookup_key of your Price */}
        <input type="hidden" name="lookup_key" value="price_1O17VxKAfQUpwzxoa4noTpy5" />
        <button id="checkout-and-portal-button" type="submit">
          Checkout
        </button>
      </form>
    </div>
  )
}

export default App
