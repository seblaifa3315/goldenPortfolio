import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";

const Portfolio = () => {
  const { data, loading } = useData();
  const { language } = useLanguage();

  if (loading) return <div></div>;

  const supTitle = language ? data.portfolio.supTitle : data.portfolio.supTitleFrench;
  const title = language ? data.portfolio.title : data.portfolio.titleFrench;
  const projects = data.portfolio.projects;

  return (
    <section id="portfolio" className="py-24 px-6 md:px-20 lg:px-40 bg-background text-foreground">
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="group bg-background2 rounded-2xl overflow-hidden
              border border-white/[0.06]
              shadow-[0_4px_20px_rgba(0,0,0,0.08)]
              flex flex-col transition-all duration-300
              hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              hover:border-white/[0.1]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background2/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-4 flex-1">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {language ? project.description : project.descriptionFrench}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-[11px] font-medium text-gold/90 px-2.5 py-1 rounded-full
                      border border-gold/30 bg-gold/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-5 pt-4 border-t border-white/[0.06]">
                <a
                  href={project.viewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70
                    hover:text-gold transition-colors duration-200"
                >
                  <ExternalLink size={15} />
                  {language ? "View" : "Voir"}
                </a>

                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70
                    hover:text-gold transition-colors duration-200"
                >
                  <SiGithub size={15} />
                  {language ? "Code" : "Code"}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
