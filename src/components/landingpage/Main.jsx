import Image from "next/image";
import FinCash from "@/assets/logo/FinCash.svg";
import Logo from "@/assets/logo/Logo.svg";

import Form from "./form/Form";

export default function Main() {
  return (
    <main>
      <section className="flex h-[500px] w-full flex-col items-center justify-center">
        {/* TODO Jangan lupa benerin logo nya  dan perbaiki Height nya */}
        <Image src={FinCash} alt="FinCash" height={90.61} width={400} />
        <h1 className="text-xl font-bold">Personal Finance Solution</h1>
      </section>

      <section className="container mx-auto h-[400px] w-full px-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h2 className="w-fit text-3xl font-semibold text-myGreenD">
              ABO<span className="text-myGreenC">UT</span>
              <div className="mx-auto h-0.5 w-20 rounded-full bg-black" />
            </h2>
            <p className="mt-2 text-justify font-semibold">
              FinCash is a personal financial management website designed to assist individuals in managing and tracking their personal finances. The
              purpose of this product is to provide an effective and user-friendly tool for managing expenses, income, and offering simple financial
              analysis. This product is created to help individuals plan budgets, save money, and achieve their personal financial goals.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Image src={Logo} alt="FinCash" height={0} width={150} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h2 className="w-fit text-3xl font-semibold text-myGreenD">
              CONTA<span className="text-myGreenC">CT</span>
              <div className="mx-auto h-0.5 w-20 rounded-full bg-black" />
            </h2>
            <Form />
          </div>

          <div className="flex flex-col items-center justify-center text-center font-bold">
            <p>123 Main Street London, W1A, United Kingdom</p>
            <p>info@fincash.com</p>
            <p>+91 8865230</p>
          </div>
        </div>
      </section>
    </main>
  );
}
