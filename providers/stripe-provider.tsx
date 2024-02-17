"use client";

import useCheckout from "@/hooks/useCheckout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
interface StripeProviderProps {
  children: React.ReactNode;
}
export const StripeProvider = ({ children }: StripeProviderProps) => {
  const checkout = useCheckout();
  if (checkout.loading) {
    return <div className="spinner transition-all"></div>;
  }

  return (
    <>
      {checkout.paymentIntent && (
        <Elements
          options={{
            clientSecret: checkout.paymentIntent,
            appearance: { theme: "stripe" },
          }}
          stripe={stripePromise}
        >
          {children}
        </Elements>
      )}
    </>
  );
};
