interface CustomSeparatorProps {
  text: string;
}
export const CustomSeparator = ({ text }: CustomSeparatorProps) => {
  return (
    <div className="flex items-center w-full">
      <p className="border border-black flex-grow"></p>

      <p className="mx-2 font-bold">{text}</p>
      <p className="border border-black flex-grow"></p>
    </div>
  );
};
