import React, { useEffect, useState } from "react";
import { ContactFormData } from "@/ah/utils/type";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.success !== 1) {
      setError((prevError) => !prevError);
    }

    setSuccess((prevSuccess) => !prevSuccess);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <div>
        {error && (
          <div
            className={`mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800`}
            role="alert"
          >
            <span className="font-medium">Error happened!</span> please try
            again.
          </div>
        )}

        {success && (
          <div
            className={`mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800`}
            role="alert"
          >
            <span className="font-medium">Success!</span> your message has been
            sent.
          </div>
        )}
      </div>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Name
          </label>
        </div>
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Email
          </label>
        </div>
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
          />
          <label
            htmlFor="subject"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Subject
          </label>
        </div>
        <div className="group relative z-0 mb-6 w-full">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="peer block h-36 w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
          />
          <label
            htmlFor="message"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
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
    </>
  );
};

export default ContactForm;
