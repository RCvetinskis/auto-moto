type Props = {
  params: { postId: string };
};

const Page = ({ params }: Props) => {
  console.log(params);
  return <div>Page</div>;
};

export default Page;
