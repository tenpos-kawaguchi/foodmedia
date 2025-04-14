"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Contact() {
  console.log("Resend API Key:", process.env.NEXT_PUBLIC_RESEND_API_KEY);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("送信中...");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("送信成功しました！");
      setFormData({ name: "", email: "", message: "" });
      router.push("/contact/thanks"); // 送信後にサンクスページへリダイレクト
    } else {
      setStatus("送信に失敗しました。");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center">
          <label htmlFor="name">お名前</label>
          <input
            type="text"
            name="name"
            placeholder="お名前"
            value={formData.name}
            onChange={handleChange}
            required
            className="ml-2 border border-gray-700 rounded-md p-2"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="name">メールアドレス</label>
          <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={formData.email}
            onChange={handleChange}
            required
            className="ml-2 border border-gray-700 rounded-md p-2"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="name">お問い合わせ内容</label>
          <textarea
            name="message"
            placeholder="お問い合わせ内容"
            value={formData.message}
            onChange={handleChange}
            required
            className="ml-2 border border-gray-700 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-5 rounded-md"
        >
          送信
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
}
