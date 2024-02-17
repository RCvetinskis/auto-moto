"use server";
import { serviceData } from "@/lib/service-data";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/user-service";

export const onCreatePaymentIntent = async (service: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;

    const selectedService = serviceData.find(
      (serviceItem) => serviceItem.service === service
    );
    if (!selectedService) return null;

    const price = selectedService
      ? selectedService.options.reduce((sum, option) => {
          const priceString = option.price || "";
          const numericValue = parseFloat(
            priceString.match(/\d+(\.\d+)?/)?.[0] || "0"
          );
          return sum + numericValue;
        }, 0)
      : null;

    const paymentIntent = await stripe.paymentIntents.create({
      metadata: {
        service,
      },
      currency: "eur",
      amount: Number(price) * 100,
      description: `Bought service ${service}`,
      receipt_email: currentUser.email,
    });

    if (!paymentIntent) return null;
    return String(paymentIntent.client_secret);
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    return null;
  }
};
