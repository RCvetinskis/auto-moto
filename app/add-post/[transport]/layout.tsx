import { NavBar } from "../components/navigaiton/navbar";

interface TransportLayoutProps {
  children: React.ReactNode;
}
const TransportLayout = ({ children }: TransportLayoutProps) => {
  return (
    <div>
      <NavBar />
      <div className="bg-white p-3 shadow-4xl shadow-black rounded">
        {children}
      </div>
    </div>
  );
};

export default TransportLayout;
