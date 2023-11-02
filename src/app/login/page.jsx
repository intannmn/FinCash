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
    <main className="flex h-screen w-screen items-center justify-center bg-gradient-to-b">
      <div className="w-[400px] space-y-5 rounded-lg p-5">
        <div className="rounded-full bg-white px-6 py-4">
          <Image src={require("@/assets/logo/FinCash.svg")} alt="FinCash" quality={50} className="mx-auto" priority />
        </div>
        <form onSubmit={handleSubmit} className="mx-auto w-full space-y-5">
          <InputText label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <InputPassword label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p className="text-center text-lg text-red-500">{invalid && "Invalid Username Or Password"}</p>
          <SubmitButton label={"LOGIN"} font={"bold"} size={"lg-full"} loading={loading} />
        </form>
        <Link href={"/register"} className="mx-auto block w-fit text-center text-sm hover:text-blue-500">
          Don&apos;t have an account yet? Click here!
        </Link>
        <p className="text-center">© 2023 FinCash. All rights reserved.</p>
      </div>
    </main>
  );
}
