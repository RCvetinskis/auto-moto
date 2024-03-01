"use client";

import { onPostCar } from "@/actions/car-action";
import { onPostMotorcycle } from "@/actions/motorcylce-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePost } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { Car, Motorcyle } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const { post, service, removeAll } = usePost((state) => state);
  const { user } = useUser();
  const router = useRouter();
  const [postData, setPostData] = useState<Car | Motorcyle | null>(null);
  useEffect(() => {
    const paymentStatus = searchParams.get("redirect_status");
    if (!paymentStatus) return;

    switch (paymentStatus) {
      case "succeeded":
        const { data, images, type } = post;

        if (service && data) {
          if (type === "car") {
            onPostCar(data, images, service)
              .then((res) => {
                setPostData(res);
                removeAll();
              })
              .catch((error) => toast.error(error.message));
          } else {
            onPostMotorcycle(data, images, service)
              .then((res) => {
                setPostData(res);
                removeAll();
              })
              .catch((error) => toast.error(error.message));
          }
        }

        toast.success("Payment succeeded!");
        break;
      case "canceled":
        toast.error("Your payment is canceled");
        break;

      default:
        toast.error("Something went wrong!");
        break;
    }
  }, [searchParams, post, service, removeAll]);

  return (
    <div>
      {postData && <div>{postData.brand}</div>}
      <Card>
        <CardHeader>
          <CardTitle>
            Congratulations, you succesfully published your transport!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Checkout your post!</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between gap-3 md:gap-0">
          <Button
            onClick={() => router.push("/")}
            size={"lg"}
            className="w-[200px]"
          >
            Home
          </Button>
          <Button
            onClick={() => router.push(`/user/${user?.username}/posts`)}
            size={"lg"}
            className="w-[200px]"
          >
            My posts
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessPage;
