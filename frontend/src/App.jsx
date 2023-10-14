import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, useParams, useLocation } from 'react-router-dom';

function App() {
  const handleCheckout = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3500/stripe/createCheckout", {
        method: "POST",
      })
      const data = await response.json()
      console.log(response.status);
      console.log(data);
      if (response.status === 303) {
        console.log("Fetch correctly");
        window.location.href = data.sessionUrl;
      } else {
        console.error("Failed to fetch");
      }

    } catch (err) {
      console.log(err);
    }
  }


  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const isCancelled = params.get('canceled') === 'true';
  const isSuccess = params.get("success") === 'true'
  const sessionId = params.get('session_id')
  console.log("Cancel?: ", isCancelled);
  console.log("Success?: ", isSuccess);
  console.log('SessionId: ', sessionId);



  return (
    <div>
     
      <form onSubmit={(e) => handleCheckout(e)}>
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
