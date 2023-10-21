"use client";

// IMPORT LIBRARIES
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// IMPORT COMPONENTS
import InputPassword from "@/components/inputs/InputPassword";
import InputText from "@/components/inputs/InputText";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  // HANDLE SUBMIT
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

  // CHECK STATUS & REDIRECT
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
      <div className="bg-dots-background bg-no-repeat bg-fixed bg-cover -z-10 fixed w-full h-full" />
      <div className="space-y-5 p-5 w-[400px] bg-myGreenA/50 rounded-lg border-2 border-black">
        {/* LOGO */}
        <Image
          src={require("@/assets/logo/FinCash.svg")}
          alt="FinCash"
          quality={50}
          className="mx-auto"
        />

        <form onSubmit={handleSubmit} className="space-y-5 w-full mx-auto">
          {/* INPUT USERNAME */}
          <InputText
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* INPUT PASSWORD */}
          <InputPassword
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* INVALID */}
          <p className="text-center text-lg text-red-500">
            {invalid && "Invalid Username Or Password"}
          </p>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`h-11 w-full flex items-center justify-center gap-1 rounded-md font-bold ${
              loading ? "bg-myGreenD/60 cursor-wait" : "bg-myGreenD/70 hover:bg-myGreenD/80"
            }`}
          >
            <span>LOGIN</span>
            {loading && (
              <Image
                src={require("@/assets/loading/Loading-Black.svg")}
                alt="Loading"
                width={20}
                height={0}
                quality={50}
                loading="eager"
                className="stroke-black"
              />
            )}
          </button>
        </form>

        <Link
          href={"/register"}
          className="hover:text-blue-600 text-sm w-fit block mx-auto text-center"
        >
          Don&apos;t have an account yet?
        </Link>

        {/* COPYRIGHT */}
        <p className="text-center">© 2023 FinCash. All rights reserved.</p>
      </div>
    </main>
  );
}
