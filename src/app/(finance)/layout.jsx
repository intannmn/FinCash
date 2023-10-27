import Header from "@/components/finance/Header";
import Navbar from "@/components/finance/Navbar";

export default function FinanceLayout({ children }) {
  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-screen w-screen bg-gradient-to-b from-myGreenA/80 to-white/50 bg-cover bg-fixed bg-no-repeat" />
      <div className="fixed left-0 top-0 -z-[11] h-screen w-screen bg-dots-background bg-cover bg-fixed bg-no-repeat" />
      <Header />
      <Navbar />
      <div className="mb-5 ml-[296px] mr-5 mt-28">{children}</div>
    </>
  );
}
