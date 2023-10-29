"use client";

import { useState } from "react";
import OpenAI from "openai";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextArea from "@/components/inputs/TextArea";
import InputText from "@/components/inputs/InputText";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";

export default function OpenAIAss() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerateAnswer = async (e) => {
    e.preventDefault();

    if (question.length === 0) {
      alert("Please enter your question.");
      return;
    }

    setLoading(true);

    try {
      const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Please answer the following question: ${question}`,
        max_tokens: 150,
      });

      setAnswer(response.choices[0].text);
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setLoading(false);
  };

  return (
    <section>
      {!isOpen && (
        <section
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-A3 text-white hover:bg-A4"
        >
          <RiCustomerService2Fill size={30} />
        </section>
      )}

      {isOpen && (
        <section className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-A3/20 backdrop-blur-lg">
          <form onSubmit={handleGenerateAnswer} className="space-y-3 rounded bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Ask a Question</h2>
              <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
                <GrFormClose size={30} />
              </div>
            </div>
            <InputText label={"Question"} value={question} onChange={(e) => setQuestion(e.target.value)} />
            <div className="text-white">
              <SubmitButton label={loading ? "Generating..." : "Get Answer"} font={"semibold"} size={"md-full"} loading={loading} />
            </div>
            <TextArea label={"Answer"} value={answer} onChange={(e) => {}} />
          </form>
        </section>
      )}
    </section>
  );
}
