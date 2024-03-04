import { FullCarType } from "@/types";
import PostCard from "../cards/post-card";

type Props = {
  initialData: FullCarType[];
};

const Posts = ({ initialData }: Props) => {
  return (
    <div className="grid grid-cols-1  py-8">
      {initialData.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};

export default Posts;
