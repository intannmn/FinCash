"use client";
import Image from "next/image";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState(false);

  const authentication = (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      try {
        console.log(username, password, confirmPassword);
        setInvalid(false);
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    } else {
      setPassword("");
      setConfirmPassword("");
      setInvalid(true);
    }
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-myGreenA/80 to-white/50">
      <div className="bg-dots-background bg-no-repeat bg-fixed bg-cover -z-10 fixed w-full h-full" />
      <div className="space-y-5 p-5 w-[400px] bg-myGreenA/50 rounded-lg border-2 border-black">
        {/* LOGO */}
        <Image src={require("@/assets/logo/FinCash.svg")} alt="FinCash" className="mx-auto" />
        {/* LOGO */}

        <form onSubmit={authentication} className="space-y-5 w-full mx-auto">
          {/* INPUT USERNAME */}
          <fieldset className="border-2 group/username focus-within:border-myGreenD border-black rounded-md px-3 pb-2 w-full">
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
          <fieldset className="border-2 group/password focus-within:border-myGreenD border-black rounded-md px-3 pb-2 w-full">
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

          {/* INPUT CONFIRM PASSWORD */}
          <fieldset className="border-2 group/password focus-within:border-myGreenD border-black rounded-md px-3 pb-2 w-full">
            <legend className="group-focus-within/password:text-myGreenD px-2 font-semibold">
              Confirm Password
            </legend>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-transparent outline-none w-full"
            />
          </fieldset>
          {/* INPUT CONFIRM PASSWORD */}

          {/* INDICATOR */}
          <p className="text-center text-lg text-red-500">
            {invalid && "Confirm Password Do Not Match"}
          </p>
          {/* INDICATOR */}

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="h-11 w-full rounded-md bg-myGreenD/70 font-bold hover:bg-myGreenD/80"
          >
            REGISTER
          </button>
          {/* REGISTER BUTTON */}
        </form>

        {/* COPYRIGHT */}
        <p className="text-center">© 2023 FinCash. All rights reserved.</p>
        {/* END COPYRIGHT */}
      </div>
    </main>
  );
}
