import SmallPosts from "@/components/posts/small-posts";
import { getSortedCars } from "@/lib/car-service";
import SectionSelect from "./_components/section-select";
import Search from "@/components/search/search";
import { getCarBrands } from "@/actions/fetch/transport-api-action";

const HomePage = async ({
  searchParams,
}: {
  searchParams?: { page?: string; section?: string };
}) => {
  const query = searchParams?.section || "deal";
  const posts = await getSortedCars(1, 10, query);

  return (
    <main>
      <header className="flex gap-3 w-full">
        {/* TODO: Display search history on the right side */}
        <Search />
        <Search />
      </header>
      <div>
        <SectionSelect />
        <SmallPosts posts={posts} />
      </div>
    </main>
  );
};

export default HomePage;
