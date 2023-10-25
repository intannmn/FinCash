"use client";

import { useState } from "react";
import InputText from "@/components/inputs/InputText";
import TextArea from "@/components/inputs/TextArea";

export default function Form() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nMessage: ${message}`);
    setName("");
    setPhoneNumber("");
    setEmail("");
    setMessage("");
  };
  return (
    <form className="mt-2 space-y-3" onSubmit={handleSubmit}>
      <InputText
        label="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <InputText
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <InputText
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextArea
        label="Message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        type="submit"
        className="flex h-8 w-20 items-center justify-center border-2 border-myGreenD font-semibold text-myGreenD hover:bg-myGreenD hover:text-white"
      >
        Send
      </button>
    </form>
  );
}
