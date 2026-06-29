import { useState } from "react";
import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

const Portfolio = () => {
  const { data, loading } = useData();
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);

  if (loading) return <div></div>;

  const supTitle = language ? data.portfolio.supTitle : data.portfolio.supTitleFrench;
  const title = language ? data.portfolio.title : data.portfolio.titleFrench;
  const projects = data.portfolio.projects;
  const total = projects.length;

  const paginate = (dir) => {
    setCurrent((prev) => (prev + dir + total) % total);
  };

  // Position each card on a 3D cylinder
  const getCardStyle = (index) => {
    let diff = index - current;
    // Wrap around for shortest path
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isCenter = diff === 0;
    const isVisible = Math.abs(diff) <= 1;

    // Rotate around Y — side cards angled like on a drum
    const rotateY = diff * 30;
    // Push side cards back on the cylinder surface
    const translateZ = isCenter ? 80 : -80;
    // Spread cards horizontally
    const translateX = diff * 80;

    return {
      rotateY,
      translateZ,
      translateX,
      scale: isCenter ? 1 : 0.92,
      opacity: isVisible ? (isCenter ? 1 : 0.85) : 0,
      zIndex: isCenter ? 10 : 5 - Math.abs(diff),
      isCenter,
      isVisible,
    };
  };

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 bg-background text-foreground">
      {/* Section Header */}
      <motion.div
        className="flex flex-col items-center text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
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

      {/* 3D Carousel */}
      <div className="relative max-w-6xl mx-auto">
        {/* Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/15 bg-background2 flex items-center justify-center text-foreground/60 hover:text-gold hover:border-gold/40 transition-all duration-300 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/15 bg-background2 flex items-center justify-center text-foreground/60 hover:text-gold hover:border-gold/40 transition-all duration-300 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>

        {/* Cards with 3D perspective */}
        <div className="relative flex items-center justify-center px-8 md:px-14" style={{ perspective: "1000px" }}>
          {/* Spacer to maintain height based on center card */}
          <div className="w-full max-w-2xl invisible pointer-events-none">
            <div className="h-64 md:h-80" />
            <div className="p-8">
              <div className="h-8 mb-3" />
              <div className="h-16" />
              <div className="h-8 mt-4" />
              <div className="h-10 mt-4" />
            </div>
          </div>

          {projects.map((project, index) => {
            const style = getCardStyle(index);
            if (!style.isVisible) return null;

            return (
              <motion.div
                key={index}
                animate={{
                  rotateY: style.rotateY,
                  translateZ: style.translateZ,
                  x: `${style.translateX}%`,
                  scale: style.scale,
                  opacity: style.opacity,
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                style={{
                  zIndex: style.zIndex,
                  transformStyle: "preserve-3d",
                  position: "absolute",
                }}
                className={`w-full ${style.isCenter ? "max-w-2xl" : "max-w-[50%] md:max-w-xl"} bg-background2 rounded-2xl overflow-hidden
                  border
                  ${style.isCenter
                    ? "border-white/[0.06] group [transition:border-color_0.3s,box-shadow_0.3s] hover:border-gold/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(176,154,104,0.15)]"
                    : "border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                  }`}
              >
                {/* Thumbnail with overlay actions */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full object-cover transition-transform duration-500 ${
                      style.isCenter ? "h-64 md:h-80 group-hover:scale-105" : "h-52 md:h-60"
                    }`}
                  />
                  {style.isCenter && (
                    <>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={project.viewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gold/80 transition-colors duration-200"
                        >
                          <ExternalLink size={15} />
                          {language ? "View" : "Voir"}
                        </a>
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg text-sm font-medium border border-white/30 hover:bg-white/25 transition-colors duration-200"
                        >
                          <SiGithub size={15} />
                          {language ? "Code" : "Code"}
                        </a>
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className={`${style.isCenter ? "p-8" : "p-5"} flex flex-col gap-4`}>
                  <div>
                    <h3
                      className={`font-semibold text-foreground ${
                        style.isCenter ? "text-xl md:text-2xl mb-3" : "text-base mb-2"
                      }`}
                    >
                      {project.title}
                    </h3>
                    {style.isCenter && (
                      <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                        {language ? project.description : project.descriptionFrench}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(style.isCenter ? project.tags : project.tags.slice(0, 3)).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`font-medium text-gold/90 rounded-full border border-gold/30 bg-gold/[0.08] ${
                          style.isCenter ? "text-[11px] px-2.5 py-1" : "text-[10px] px-2 py-0.5"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === current ? "bg-gold w-6" : "bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
