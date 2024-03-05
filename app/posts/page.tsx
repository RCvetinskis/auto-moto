type Props = {
  searchParams?: {
    transport?: string;
    brand?: string;
    model?: string;
    yearFrom?: string;
    yearTill?: string;
    priceFrom?: string;
    priceTill?: string;
    fuel?: string;
    body?: string;
    ccFrom?: string;
    ccTill?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  console.log(searchParams);
  return <div>Page</div>;
};

export default Page;
