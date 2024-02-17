"use client";
import { onPostCar } from "@/actions/car-action";
import { Button } from "@/components/ui/button";
import useCheckout from "@/hooks/useCheckout";
import { usePost } from "@/store/store";

import {
  CardElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useTransition } from "react";
import { toast } from "sonner";

interface CheckoutFormProps {
  transportType: string;
}
export const CheckoutForm = ({ transportType }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await confirmPayment();
    });
  };

  const confirmPayment = async () => {
    if (!stripe || !elements) return;
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:3000/add-post/${transportType}/service/payment/success`,
        },
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred.");
          console.log(error);
        }
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      toast.error("An unexpected error occurred.");
    }
  };
  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="space-y-4  bg-white p-3 py-6 rounded"
    >
      <PaymentElement id="payment-element" />

      <Button
        disabled={isPending}
        id="submit"
        size={"lg"}
        className="w-full"
        type="submit"
      >
        Pay
      </Button>
    </form>
  );
};
