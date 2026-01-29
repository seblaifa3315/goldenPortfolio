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
    <section id="contact" className="py-24 px-6 md:px-20 lg:px-40 bg-background2 text-foreground">
      <Toaster position="top-right" />

      {/* Section Header */}
      <motion.div
        className="flex flex-col items-center text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-gold/60" />
          <p className="text-xs uppercase tracking-[0.2em] text-gold/80 font-medium">
            {supTitle}
          </p>
          <span className="h-px w-8 bg-gold/60" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
      </motion.div>

      {/* Grid Layout */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Left Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              {subTitle}
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed max-w-md">
              {text}
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:seblaifa@hotmail.com"
              className="group flex items-center gap-4 p-4 rounded-xl
                bg-white/[0.03] border border-white/[0.06]
                hover:bg-white/[0.06] hover:border-white/[0.1]
                transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10">
                <IoIosMail className="w-5 h-5 text-gold" />
              </div>
              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                seblaifa@hotmail.com
              </span>
            </a>

            <a
              href="tel:+7024980917"
              className="group flex items-center gap-4 p-4 rounded-xl
                bg-white/[0.03] border border-white/[0.06]
                hover:bg-white/[0.06] hover:border-white/[0.1]
                transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10">
                <FaPhoneVolume className="w-4 h-4 text-gold" />
              </div>
              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                +702-498-0917
              </span>
            </a>

            <div
              className="group flex items-center gap-4 p-4 rounded-xl
                bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10">
                <FaLocationDot className="w-4 h-4 text-gold" />
              </div>
              <span className="text-sm text-foreground/80">
                NV, United States
              </span>
            </div>

            <a
              href="https://github.com/seblaifa3315"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl
                bg-white/[0.03] border border-white/[0.06]
                hover:bg-white/[0.06] hover:border-white/[0.1]
                transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10">
                <FaGithub className="w-5 h-5 text-gold" />
              </div>
              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                github.com/seblaifa3315
              </span>
            </a>
          </div>
        </div>

        {/* Right Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">{name}</label>
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={(e) => setFormData({ ...formData, from_name: e.target.value })}
              required
              placeholder={nameInput}
              className="w-full bg-white/[0.03] px-4 py-3.5 rounded-xl text-sm
                border border-white/[0.08] text-foreground
                placeholder-foreground/30
                focus:outline-none focus:border-gold/50 focus:bg-white/[0.05]
                transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">{email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder={emailInput}
              className="w-full bg-white/[0.03] px-4 py-3.5 rounded-xl text-sm
                border border-white/[0.08] text-foreground
                placeholder-foreground/30
                focus:outline-none focus:border-gold/50 focus:bg-white/[0.05]
                transition-all duration-300"
            />
          </div>

          <div className="flex-1 flex flex-col space-y-2">
            <label className="text-sm font-medium text-foreground/80">{message}</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              placeholder={messageInput}
              className="flex-1 w-full bg-white/[0.03] px-4 py-3.5 rounded-xl text-sm
                border border-white/[0.08] text-foreground
                placeholder-foreground/30
                focus:outline-none focus:border-gold/50 focus:bg-white/[0.05]
                transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            className="group bg-gold text-white px-8 py-3 rounded-lg text-sm font-medium
              hover:bg-gold/90 transition-all duration-300 cursor-pointer"
          >
            {button}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
