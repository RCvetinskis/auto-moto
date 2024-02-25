import { getCarBrands } from "@/actions/fetch/cars-api-action";
import { CarFormUpdate } from "@/components/form/car/car-form-update";
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
      {/* <CarFormUpdate initialCars={cars} currentCar={currentCar} />  */}
    </div>
  );
};

export default Page;
