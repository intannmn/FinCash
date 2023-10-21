"use client";

// IMPORT LIBRARIES
import Image from "next/image";
import { useState } from "react";

// IMPORT COMPONENTS
import InputPassword from "@/components/inputs/InputPassword";
import InputText from "@/components/inputs/InputText";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [invalidLabel, setInvalidLabel] = useState("");
  const [loading, setLoading] = useState(false);

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (username && password && confirmPassword) {
        if (password === confirmPassword) {
          setLoading(false);
          alert(`Username: ${username}\nPassword: ${password}`);
        } else {
          setLoading(false);
          setInvalidLabel("Confirm Password Do Not Match");
          setInvalid(true);
        }
      } else {
        setLoading(false);
        setInvalidLabel("Can Not Be Empty");
        setInvalid(true);
      }
    }, 2000);
  };

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

          {/* INPUT CONFIRM PASSWORD */}
          <InputPassword
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* INVALID */}
          <p className="text-center text-lg text-red-500">{invalid && invalidLabel}</p>

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`h-11 w-full flex items-center justify-center gap-1 rounded-md font-bold ${
              loading ? "bg-myGreenD/60 cursor-wait" : "bg-myGreenD/70 hover:bg-myGreenD/80"
            }`}
          >
            <span>REGISTER</span>
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

        {/* COPYRIGHT */}
        <p className="text-center">© 2023 FinCash. All rights reserved.</p>
      </div>
    </main>
  );
}
