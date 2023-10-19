import {
  useCheckoutMutation,
  useCheckoutQuery,
} from "@/features/stripe/stripeApiSlice";
import {
  selectCurrentSessionUrl,
  setSessionUrl,
} from "@/features/stripe/stripeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentModal = () => {
  const dispatch = useDispatch();
  const { data: checkout } = useCheckoutQuery(); // Appeler useCheckoutQuery comme une fonction

  useEffect(() => {
    if (checkout) {
      // Accédez à l'URL de session
      const sessionUrl = checkout.sessionUrl;

      // Dispatchez l'URL de session dans votre état Redux
      dispatch(setSessionUrl(sessionUrl));

      // Vous pouvez également imprimer l'URL dans la console pour le vérifier
      console.log(sessionUrl);
    }
  }, [checkout, dispatch]);

  const sessionUrl = useSelector(selectCurrentSessionUrl);

  return (
    <article className="payment-modal">
      <div className="overlay"></div>
      <div className="content">
        <h2 className="modal-title">ACCESS BLOCKED</h2>
        <h3 className="modal-price">
          9.99€<span className="price-recurence">/month</span>
        </h3>
        <button className="btn btn-solid">
          <a href={sessionUrl}>Checkout</a>
        </button>
      </div>
    </article>
  );
};

export default PaymentModal;
