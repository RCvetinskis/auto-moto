import { getCarsByUsername } from "@/lib/car-service";

import Posts from "@/components/posts/posts";
import PaginationComponent from "@/components/pagination-component";

const UserPostsPage = async ({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams?: { page?: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const postsPerPage = 5;
  const posts = await getCarsByUsername(
    params.username,
    currentPage,
    postsPerPage
  );

  if (!posts || posts.data.length === 0) return <div>test</div>;
  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold">
          Posts <span className="text-lg">({posts.totalCount})</span>
        </h1>
      </header>

      <main>
        <Posts initialData={posts.data} />
      </main>
      <footer className="pb-10">
        <PaginationComponent
          totalPosts={posts.totalCount}
          postsPerPage={postsPerPage}
        />
      </footer>
    </div>
  );
};

export default UserPostsPage;
