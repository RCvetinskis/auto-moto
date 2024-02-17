"use client";

import { onCreatePaymentIntent } from "@/actions/fetch/payment-intent.action";
import { useEffect, useState } from "react";

import { usePost } from "@/store/store";

const useCheckout = () => {
  const [loading, setLoading] = useState(true);
  const { service } = usePost();
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPaymentIntent() {
      if (service) {
        const intent = await onCreatePaymentIntent(service);

        setPaymentIntent(intent);
        setLoading(false);
      }
    }
    fetchPaymentIntent();
  }, [service]);

  return { loading, paymentIntent };
};

export default useCheckout;
