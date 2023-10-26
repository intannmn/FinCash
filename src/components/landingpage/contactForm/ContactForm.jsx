"use client";

import { useState } from "react";
import InputText from "@/components/inputs/InputText";
import TextArea from "@/components/inputs/TextArea";
import SubmitButtonLine from "@/components/buttons/SubmitButtonLine";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Name: ${name}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nMessage: ${message}`);
      setName("");
      setPhoneNumber("");
      setEmail("");
      setMessage("");
    }, 1000);
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
      <SubmitButtonLine label={"Send"} font={"semibold"} size={"sm"} loading={loading} />
    </form>
  );
}
