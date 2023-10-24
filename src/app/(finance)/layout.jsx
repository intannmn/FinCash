import Navbar from "@/components/finance/Navbar";

export default function FinanceLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="ml-72">{children}</div>
    </>
  );
}
