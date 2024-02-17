import { getCarsByUsername } from "@/lib/car-service";
import PostCard from "@/components/cards/post-card";

const UserPostsPage = async ({ params }: { params: { username: string } }) => {
  const posts = await getCarsByUsername(params.username);

  if (!posts || posts.length === 0) return <div>test</div>;
  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold">
          Posts <span className="text-lg">({posts?.length})</span>
        </h1>
      </header>
      {posts?.length === 0 && <div>User has no posts</div>}
      <main className="grid grid-cols-1  py-8">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </main>
    </div>
  );
};

export default UserPostsPage;
