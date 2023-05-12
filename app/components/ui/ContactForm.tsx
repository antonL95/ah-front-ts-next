import React, {useState} from 'react';

type ContactFormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(
            (prevFormData)=> {
                return {...prevFormData, [e.target.name]: e.target.value}
            }
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
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
                    className="peer h-10 w-full border-b border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-600"
                    placeholder="Name"
                />
                <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
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
                    className="peer h-10 w-full border-b border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-600"
                    placeholder="Email"
                />
                <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
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
                    className="peer h-10 w-full border-b border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-600"
                    placeholder="Subject"
                />
                <label
                    htmlFor="subject"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
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
                    className="peer h-32 w-full border-b border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-600 resize-none"
                    placeholder="Message"
                />
                <label
                    htmlFor="message"
                    className="absolute left-0 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0 transition-all peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600"
                >
                    Message
                </label>
            </div>
            <button type="submit" className="w-full bg-black text-white font-roboto font-thin py-4 px-8 border border-black hover:bg-white hover:text-black focus:outline-none">
                Submit
            </button>
        </form>
    );
};

export default ContactForm;
