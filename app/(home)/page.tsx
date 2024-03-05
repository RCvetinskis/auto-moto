import SmallPosts from "@/components/posts/small-posts";
import { getSortedCars } from "@/lib/car-service";
import SectionSelect from "./_components/section-select";
import Search from "@/components/search/search";
import {
  getCarBrands,
  getMotorcycleBrands,
} from "@/actions/fetch/transport-api-action";

const HomePage = async ({
  searchParams,
}: {
  searchParams?: { page?: string; section?: string; transport?: string };
}) => {
  const query = searchParams?.section || "deal";
  const posts = await getSortedCars(1, 10, query);
  const currentTransport = searchParams?.transport || "car";
  let data = [];
  if (currentTransport === "car") {
    data = await getCarBrands();
    data.unshift("All");
  } else if (currentTransport === "moto") {
    data = await getMotorcycleBrands();
    data.unshift("All");
  } else {
    data = await getCarBrands();
    data.unshift("All");
  }

  return (
    <main>
      <header className="flex gap-3 w-full">
        {/* TODO: Display search history on the right side */}
        <Search data={data} />
      </header>
      <div>
        <SectionSelect />
        <SmallPosts posts={posts} />
      </div>
    </main>
  );
};

export default HomePage;
