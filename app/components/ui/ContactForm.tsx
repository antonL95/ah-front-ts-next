import React, { useState } from "react";
import { ContactFormData } from "@/ah/utils/type";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      console.log("error");
    }

    const data = await res.json();
    console.log(data);
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      <div className="relative mb-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border-gray-300 placeholder-transparent focus:border-blue-600 peer h-10 w-full border-b focus:outline-none"
          placeholder="Name"
        />
        <label
          htmlFor="name"
          className="text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 absolute -top-3.5 left-0 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm"
        >
          Name
        </label>
      </div>
      <div className="relative mb-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-gray-300 placeholder-transparent focus:border-blue-600 peer h-10 w-full border-b focus:outline-none"
          placeholder="Email"
        />
        <label
          htmlFor="email"
          className="text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 absolute -top-3.5 left-0 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm"
        >
          Email
        </label>
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="border-gray-300 placeholder-transparent focus:border-blue-600 peer h-10 w-full border-b focus:outline-none"
          placeholder="Subject"
        />
        <label
          htmlFor="subject"
          className="text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 absolute -top-3.5 left-0 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm"
        >
          Subject
        </label>
      </div>
      <div className="relative mb-4">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="border-gray-300 placeholder-transparent focus:border-blue-600 peer h-32 w-full resize-none border-b focus:outline-none"
          placeholder="Message"
        />
        <label
          htmlFor="message"
          className="text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 absolute left-0 text-sm transition-all peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm"
        >
          Message
        </label>
      </div>
      <button
        type="submit"
        className="w-full border border-black bg-black px-8 py-4 font-roboto font-thin text-white hover:bg-white hover:text-black focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
