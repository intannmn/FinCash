import Header from "@/components/finance/Header";
import Navbar from "@/components/finance/Navbar";
import OpenAIAss from "@/components/finance/openAI/OpenAIAss";

export default function FinanceLayout({ children }) {
  return (
    <>
      <Header />
      <Navbar />
      <OpenAIAss />
      <div className="mb-5 ml-[296px] mr-5 mt-28">{children}</div>
    </>
  );
}
