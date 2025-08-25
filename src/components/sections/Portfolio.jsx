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
    <section id="portfolio" className="py-24 px-6 md:px-20 lg:px-40 bg-background text-foreground gap-10">
      {/* Section Header */}
      <motion.div
        className="flex flex-col items-center text-center mb-16 gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-20 h-1 bg-gradient-to-r from-gold to-transparent rounded-full mb-2" />
        <p className="text-grey text-sm uppercase tracking-widest">{supTitle}</p>
        <h2 className="text-4xl md:text-5xl font-semibold">{title}</h2>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="group bg-background2 rounded-xl overflow-hidden shadow-md flex flex-col transition-transform duration-300 hover:translate-y-1 hover:shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Thumbnail */}
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />

            {/* Content */}
            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-gold">{project.title}</h3>
              <p className="text-sm text-muted">{language ? project.description : project.descriptionFrench}</p>

              <div className="flex flex-wrap gap-2 text-xs mt-2">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-gold text-white px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-6 mt-2">
                <a
                  href={project.viewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-gold hover:underline"
                >
                  {language ? "View Project" : "Voir le projet"}
                  <ExternalLink size={16} className="ml-1" />
                </a>

                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-gold hover:underline"
                >
                  {language ? "Source Code" : "Code source"}
                  <SiGithub size={16} className="ml-1" />
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
