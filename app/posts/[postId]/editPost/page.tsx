import { getCarBrands } from "@/actions/fetch/cars-api-action";
import { CarForm } from "@/app/add-post/[transport]/_components/form/car/car-form";
import { getCarById } from "@/lib/car-service";
import { redirect } from "next/navigation";

type Props = {
  params: { postId: string };
};

const Page = async ({ params }: Props) => {
  const cars = await getCarBrands();
  const currentCar = await getCarById(params.postId);
  if (!currentCar) return redirect("/");
  return (
    <div>
      <CarForm initialCars={cars} currentCar={currentCar} />
    </div>
  );
};

export default Page;
