import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import { useState } from "react";
import emailjs from "emailjs-com";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const Contact = () => {
    const { data, loading } = useData();
    const { language } = useLanguage();

    const [formData, setFormData] = useState({
        from_name: "",
        email: "",
        message: "",
    });

    if (loading) return <div />;

    const supTitle = language ? data.contact.supTitle : data.contact.supTitleFrench;
    const title = language ? data.contact.title : data.contact.titleFrench;
    const subTitle = language ? data.contact.subTitle : data.contact.subTitleFrench;
    const text = language ? data.contact.text : data.contact.textFrench;
    const name = language ? data.contact.name : data.contact.nameFrench;
    const nameInput = language ? data.contact.nameInput : data.contact.nameInputFrench;
    const email = language ? data.contact.email : data.contact.emailFrench;
    const emailInput = language ? data.contact.emailInput : data.contact.emailInputFrench;
    const message = language ? data.contact.message : data.contact.messageFrench;
    const messageInput = language ? data.contact.messageInput : data.contact.messageInputFrench;
    const toastSuccess = language ? data.contact.toastSuccess : data.contact.toastSuccessFrench;
    const toastFail = language ? data.contact.toastFail : data.contact.toastFailFrench;
    const button = language ? data.contact.button : data.contact.buttonFrench;

    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
            .then(() => {
                toast.success(toastSuccess);
                setFormData({ from_name: "", email: "", message: "" });
            })
            .catch(() => toast.error(toastFail));
    };

    return (
        <section id="contact" className="py-24 px-6 md:px-20 lg:px-40 bg-background2 text-foreground flex flex-col gap-10">
            <Toaster position="top-right" />

            {/* Section Header */}
            <motion.div className="text-center flex flex-col items-center gap-2 mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <div className="w-20 h-1 bg-gradient-to-r from-gold to-transparent rounded-full" />
                <p className="text-grey text-sm uppercase tracking-widest">{supTitle}</p>
                <h2 className="text-4xl md:text-5xl font-semibold">{title}</h2>
            </motion.div>

            {/* Grid Layout */}
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                {/* Left Info */}
                <div className="space-y-8">
                    <h3 className="text-4xl font-semibold text-gold">{subTitle}</h3>
                    <p className="text-sm text-muted">{text}</p>
                    <div className="space-y-6 text-sm">
                        <div className="flex items-center gap-4">
                            <IoIosMail className="w-6 h-6 text-foregroundIcons" />
                            <span>seblaifa@hotmail.com</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaPhoneVolume className="w-5 h-5 text-foregroundIcons" />
                            <span>+702-498-0917</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaLocationDot className="w-6 h-6 text-foregroundIcons" />
                            <span>NV, United States</span>
                        </div>
                        <a href="https://github.com/seblaifa3315" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 mt-2 hover:underline">
                            <FaGithub className="w-6 h-6 text-foregroundIcons" />
                            <span className="">https://github.com/seblaifa3315</span>
                        </a>
                    </div>
                </div>

                {/* Right Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">{name}</label>
                        <input
                            type="text"
                            name="from_name"
                            value={formData.from_name}
                            onChange={(e) => setFormData({ ...formData, from_name: e.target.value })}
                            required
                            placeholder={nameInput}
                            className="bg-backgroundCard px-4 py-3 rounded-xs text-sm border border-foreground/20 text-foreground placeholder-foregroundPlaceholder focus:outline-none focus:ring-1 focus:ring-gold transition"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">{email}</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder={emailInput}
                            className="bg-backgroundCard px-4 py-3 rounded-xs text-sm border border-foreground/20 text-foreground placeholder-foregroundPlaceholder focus:outline-none focus:ring-1 focus:ring-gold transition"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">{message}</label>
                        <textarea
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            placeholder={messageInput}
                            className="bg-backgroundCard px-4 py-3 rounded-xs text-sm border border-foreground/20 text-foreground placeholder-foregroundPlaceholder focus:outline-none focus:ring-1 focus:ring-gold transition resize-none"
                        />
                    </div>

                    <button type="submit" className="bg-gold text-white px-6 py-3 rounded-full font-medium hover:bg-transparent hover:text-gold border border-gold transition-all duration-300 cursor-pointer">
                        {button}
                    </button>
                </form>
            </motion.div>
        </section>
    );
};

export default Contact;
