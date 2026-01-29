import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import bgImage from "../../assets/testPortrait.jpg";

const Hero = () => {
  const { data, loading } = useData();
  const { language } = useLanguage();

  if (loading) return <div className="min-h-screen" />;

  const greet = language ? data.hero.greet : data.hero.greetFrench;
  const firstName = language ? data.hero.firstName : data.hero.firstNameFrench;
  const lastName = language ? data.hero.lastName : data.hero.lastNameFrench;
  const connection = language ? data.hero.connection : data.hero.connectionFrench;
  const title = language ? data.hero.title : data.hero.titleFrench;
  const role = language ? data.hero.roles : data.hero.rolesFrench;
  const description = language ? data.hero.description : data.hero.descriptionFrench;
  const btnProjects = language ? data.hero.buttonProjects : data.hero.buttonProjectsFrench;
  const btnContact = language ? data.hero.buttonContact : data.hero.buttonContactFrench;

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Full-screen background image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "70% top",
        }}
      />

      {/* Gradient overlay - darker on left for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

      {/* Content Container */}
      <div className="relative z-[2] w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col items-start text-left gap-6 py-24 lg:py-0">
            {/* Role Badge */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs md:text-sm font-medium tracking-widest uppercase">
                {role}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white font-bold tracking-tight"
            >
              {/* Name line - stays together */}
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                {greet}{" "}
                <span className="text-gold whitespace-nowrap">{firstName} {lastName}</span>
                <span className="text-white/60 font-normal">,</span>
              </span>
              {/* Title line - always on its own line */}
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white/80 mt-2 leading-snug">
                {connection} <span className="text-gold font-semibold">{title}</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-16 h-[2px] bg-gold origin-left"
            />

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#portfolio"
                className="group relative inline-flex items-center gap-2 bg-gold text-white px-8 py-4 font-medium text-sm tracking-wide overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold/25"
              >
                <span className="relative z-10">{btnProjects}</span>
                <svg
                  className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 border border-white/30 font-medium text-sm tracking-wide overflow-hidden transition-all duration-300 hover:border-white"
              >
                <span className="relative z-10">{btnContact}</span>
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Empty space for the image to show through */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
