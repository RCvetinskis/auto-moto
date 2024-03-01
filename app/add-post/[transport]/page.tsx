import {
  getCarBrands,
  getMotorcycleBrands,
} from "@/actions/fetch/transport-api-action";
import { CarForm } from "@/components/form/car/car-form";
import MotorCycleForm from "@/components/form/motorcycle/motorcycle-form";

const TransportPage = async ({ params }: { params: { transport: string } }) => {
  const transportType = params.transport;
  if (transportType === "car") {
    const cars = await getCarBrands();

    return (
      <div>
        <h1 className="capitalize font-bold my-2">{transportType}</h1>
        <CarForm initialCars={cars} />
      </div>
    );
  }
  if (transportType === "motorcycle") {
    const motorcycles = await getMotorcycleBrands();

    return (
      <div>
        <h1 className="capitalize font-bold my-2">{transportType}</h1>
        <MotorCycleForm motorcycles={motorcycles} />
      </div>
    );
  }

  return <div>Page not found!</div>;
};

export default TransportPage;
