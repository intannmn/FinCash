"use client";
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
    <main className="flex h-screen w-screen items-center justify-center text-white bg-myDarkPurple">
      <div className="space-y-5 p-5 w-[400px]">
        {/* TITLE */}
        <p className="text-3xl text-center font-bold">-- FinCash Register --</p>
        {/* TITLE */}

        <form onSubmit={authentication} className="space-y-5 w-full mx-auto">
          {/* INPUT USERNAME */}
          <fieldset className="border-2 group/username focus-within:border-myPurple rounded-md px-3 pb-2 w-full">
            <legend className="group-focus-within/username:text-myPurple px-2">Username</legend>
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
          <fieldset className="border-2 group/password focus-within:border-myPurple rounded-md px-3 pb-2 w-full">
            <legend className="group-focus-within/password:text-myPurple px-2">Password</legend>
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
          <fieldset className="border-2 group/password focus-within:border-myPurple rounded-md px-3 pb-2 w-full">
            <legend className="group-focus-within/password:text-myPurple px-2">
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
            className="h-11 w-full rounded-md bg-myPurple font-bold hover:bg-myPurpleSec"
          >
            REGISTER
          </button>
          {/* REGISTER BUTTON */}
        </form>

        {/* COPYRIGHT */}
        <p className="text-center text-gray-400">© 2023 FinCash. All rights reserved.</p>
        {/* END COPYRIGHT */}
      </div>
    </main>
  );
}
