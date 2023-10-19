"use client";

// IMPORT LIBRARIES
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
        <Image src={require("@/assets/logo/FinCash.svg")} alt="FinCash" className="mx-auto" />
        {/* LOGO */}

        <form onSubmit={handleSubmit} className="space-y-5 w-full mx-auto">
          {/* INPUT USERNAME */}
          <fieldset className="border-2 border-black group/username focus-within:border-myGreenD rounded-md px-3 pb-2 w-full">
            <legend className="group-focus-within/username:text-myGreenD px-2 font-semibold">
              Username
            </legend>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-transparent outline-none w-full"
            />
          </fieldset>
          {/* INPUT USERNAME */}

          {/* INPUT PASSWORD */}
          <fieldset className="border-2 border-black group/password focus-within:border-myGreenD rounded-md px-3 pb-2 w-full">
            <legend className="group-focus-within/password:text-myGreenD px-2 font-semibold">
              Password
            </legend>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent outline-none w-full"
            />
          </fieldset>
          {/* INPUT PASSWORD */}

          {/* INDICATOR */}
          <p className="text-center text-lg text-red-500">
            {invalid && "Invalid Username Or Password"}
          </p>
          {/* INDICATOR */}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full flex items-center justify-center gap-1 rounded-md bg-myGreenD/70 font-bold hover:bg-myGreenD/80"
          >
            <span>LOGIN</span>
            {loading && (
              <Image
                src={require("@/assets/loading/Loading-Black.svg")}
                alt="Loading"
                width={20}
                height={0}
                loading="eager"
                className="stroke-black"
              />
            )}
          </button>
          {/* LOGIN BUTTON */}
        </form>

        <Link
          href={"/register"}
          className="hover:text-blue-600 text-sm w-fit block mx-auto text-center"
        >
          Don&apos;t have an account yet?
        </Link>

        {/* COPYRIGHT */}
        <p className="text-center">© 2023 FinCash. All rights reserved.</p>
        {/* END COPYRIGHT */}
      </div>
    </main>
  );
}
