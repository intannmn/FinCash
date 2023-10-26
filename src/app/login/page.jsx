"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import InputPassword from "@/components/inputs/InputPassword";
import InputText from "@/components/inputs/InputText";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn(`credentials`, {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setInvalid(true);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      setLoading(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  }, [session, router]);

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-myGreenA/80 to-white/50">
      <div className="fixed -z-10 h-full w-full bg-dots-background bg-cover bg-fixed bg-no-repeat" />
      <div className="w-[400px] space-y-5 rounded-lg border-2 border-black bg-myGreenA/50 p-5">
        <Image src={require("@/assets/logo/FinCash.svg")} alt="FinCash" quality={50} className="mx-auto" />
        <form onSubmit={handleSubmit} className="mx-auto w-full space-y-5">
          <InputText label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <InputPassword label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p className="text-center text-lg text-red-500">{invalid && "Invalid Username Or Password"}</p>
          <SubmitButton label={"LOGIN"} font={"bold"} size={"lg-full"} loading={loading} />
        </form>
        <Link href={"/register"} className="mx-auto block w-fit text-center text-sm hover:text-blue-600">
          Don&apos;t have an account yet? Click here!
        </Link>
        <p className="text-center">© 2023 FinCash. All rights reserved.</p>
      </div>
    </main>
  );
}
