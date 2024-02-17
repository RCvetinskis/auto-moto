import { getCarBrands } from "@/actions/fetch/cars-api-action";
import { CarForm } from "./_components/form/car/car-form";

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

  return <div>Page not found!</div>;
};

export default TransportPage;
