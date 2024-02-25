"use client";
import { StripeProvider } from "@/providers/stripe-provider";
import { PostCard } from "../_components/post-card";
import { CheckoutForm } from "./_components/checkout-form";
import { usePost } from "@/store/store";
import { redirect } from "next/navigation";

const PaymentPage = ({ params }: { params: { transport: string } }) => {
  const { post } = usePost();
  if (!post.data) {
    redirect("/add-post");
  }

  console.log(post);
  return (
    <main className="space-y-4">
      <PostCard />
      <div className="py-6">
        <StripeProvider>
          <CheckoutForm transportType={params.transport} />
        </StripeProvider>
      </div>
    </main>
  );
};

export default PaymentPage;
