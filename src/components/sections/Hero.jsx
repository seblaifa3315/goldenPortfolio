import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import bgImage from "../../assets/portrait.jpg";

const Hero = () => {
    const { data, loading } = useData();
    const { language } = useLanguage();

    if (loading) return <div></div>;

    const photoBackground = data.hero.photoBackground;
    const greet = language ? data.hero.greet : data.hero.greetFrench;
    const firstName = language ? data.hero.firstName : data.hero.firstNameFrench;
    const lastName = language ? data.hero.lastName : data.hero.lastNameFrench;
    const connection = language ? data.hero.connection : data.hero.connectionFrench;
    const title = language ? data.hero.title : data.hero.titleFrench;
    const role = language ? data.hero.roles : data.hero.rolesFrench;
    const description = language ? data.hero.description : data.hero.descriptionFrench;
    const btnProjects = language ? data.hero.buttonProjects : data.hero.buttonProjectsFrench;
    const btnContact = language ? data.hero.buttonContact : data.hero.buttonContactFrench;

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-16 lg:px-32">
            {/* Animated + Parallax Background */}
            <motion.div
                initial={{ scale: 5 }}
                animate={{ scale: 1}}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url(${bgImage})`,
                }}
            />

            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center lg:text-left gap-6">
                {/* Role */}
                <motion.p initial={{ opacity: 0, y: -400 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-lg md:text-xl tracking-widest uppercase text-muted font-medium text-white/50">
                    {role}
                </motion.p>

                {/* Headline */}
                <motion.h1 initial={{ opacity: 0, y: 400 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }} className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                    {greet}{" "}
                    <span className="text-gold">
                        {firstName} {lastName}
                    </span>
                    <br />
                    {connection} <span className="text-gold">{title}</span>
                </motion.h1>

                {/* Description */}
                <motion.p initial={{ opacity: 0, y: 400 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-muted text-sm md:text-base max-w-2xl text-white">
                    {description}
                </motion.p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                    <motion.div initial={{ opacity: 0, y: 400 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                        <a href="#portfolio" className="bg-gold text-white px-6 py-3 rounded-full border border-gold font-medium text-sm hover:bg-transparent hover:text-gold transition-all duration-300">
                            {btnProjects}
                        </a>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 400 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                        <a href="#contact" className="bg-transparent text-white px-6 py-3 rounded-full border border-white font-medium text-sm hover:bg-white/80 hover:text-black transition-all duration-300">
                            {btnContact}
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
