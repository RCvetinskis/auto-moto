import { NavBar } from "../components/navigaiton/navbar";

interface TransportLayoutProps {
  children: React.ReactNode;
}
const TransportLayout = ({ children }: TransportLayoutProps) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default TransportLayout;
