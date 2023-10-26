"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import InputPassword from "@/components/inputs/InputPassword";
import InputText from "@/components/inputs/InputText";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function createAccount(account) {
  try {
    const response = await fetch("https://653a4cfee3b530c8d9e975ac.mockapi.io/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("An error occurred while sending data:", error);
    throw error;
  }
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Request failed with status: " + response.status);
  }
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [invalidLabel, setInvalidLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (username && password && confirmPassword) {
      if (password === confirmPassword) {
        const account = {
          username,
          password,
        };
        try {
          await createAccount(account);
          router.push("/login");
        } catch (error) {
          setLoading(false);
          console.error("An error occurred while creating an account:", error);
        }
      } else {
        setLoading(false);
        setInvalidLabel("Confirm Password Does Not Match");
        setInvalid(true);
      }
    } else {
      setLoading(false);
      setInvalidLabel("Fields Cannot Be Empty");
      setInvalid(true);
    }
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-myGreenA/80 to-white/50">
      <div className="fixed -z-10 h-full w-full bg-dots-background bg-cover bg-fixed bg-no-repeat" />
      <div className="w-[400px] space-y-5 rounded-lg border-2 border-black bg-myGreenA/50 p-5">
        <Image src={require("@/assets/logo/FinCash.svg")} alt="FinCash" quality={50} className="mx-auto" priority />
        <form onSubmit={handleSubmit} className="mx-auto w-full space-y-5">
          <InputText label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <InputPassword label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputPassword label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <p className="text-center text-lg text-red-500">{invalid && invalidLabel}</p>
          <SubmitButton label={"REGISTER"} font={"bold"} size={"lg-full"} loading={loading} />
        </form>
        <p className="text-center">© 2023 FinCash. All rights reserved.</p>
      </div>
    </main>
  );
}
