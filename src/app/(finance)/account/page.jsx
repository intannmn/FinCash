"use client";

import { useEffect, useState } from "react";
import InputText from "@/components/inputs/InputText";
import InputPassword from "@/components/inputs/InputPassword";
import { useSession, signOut } from "next-auth/react";
import SubmitButton from "@/components/buttons/SubmitButton";

async function getAccountById(id) {
  try {
    const response = await fetch(`https://653a4cfee3b530c8d9e975ac.mockapi.io/account/${id}`, { cache: "default" });
    return handleResponse(response);
  } catch (error) {
    console.error("An error occurred while retrieving data:", error);
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

async function updateAccount(id, newData) {
  try {
    const response = await fetch(`https://653a4cfee3b530c8d9e975ac.mockapi.io/account/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("An error occurred while updating account data:", error);
    throw error;
  }
}

export default function Account() {
  const session = useSession();
  const [accountData, setAccountData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session.data?.user.id !== undefined) {
      async function getAccount() {
        try {
          const res = await getAccountById(session.data.user.id);
          setAccountData(res);
        } catch (error) {
          console.error("An error occurred while fetching account data:", error);
        }
      }
      getAccount();
    }
  }, [session]);

  const handleNameChange = (e) => {
    setAccountData({ ...accountData, name: e.target.value });
  };

  const handleUsernameChange = (e) => {
    setAccountData({ ...accountData, username: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setAccountData({ ...accountData, password: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const account = {
      name: accountData.name,
      username: accountData.username,
      email: accountData.username,
      password: accountData.password,
    };
    try {
      await updateAccount(session.data.user.id, account);
      signOut();
    } catch (error) {
      console.error("An error occurred while saving account data:", error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSave} className="space-y-3">
        <InputText label={"Name"} value={accountData.name} onChange={handleNameChange} />
        <InputText label={"Username"} value={accountData.username} onChange={handleUsernameChange} />
        <InputPassword label={"Password"} value={accountData.password} onChange={handlePasswordChange} />
        <SubmitButton label={"SAVE"} font={"semibold"} size={"md"} loading={loading} />
      </form>
    </main>
  );
}
