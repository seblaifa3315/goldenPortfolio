import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import * as SiIcons from "react-icons/si";
import { Code2, Server, Wrench } from "lucide-react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

const iconMap = {
  Code2,
  Server,
  Wrench,
  ...SiIcons,
  ...FaIcons,
  ...MdIcons,
  ...RiIcons,
};

const Skills = () => {
  const { data, loading } = useData();
  const { language } = useLanguage();

  if (loading) return <div></div>;

  const supTitle = language ? data.skills.supTitle : data.skills.supTitleFrench;
  const title = language ? data.skills.title : data.skills.titleFrench;
  const skillCategories = data.skills.skillCategories;

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-20 lg:px-40 bg-background2 text-foreground"
    >
      {/* Section Heading */}
      <motion.div
        className="flex flex-col items-center text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
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

      {/* Skill Categories */}
      <div className="space-y-12">
        {skillCategories.map((category, idx) => {
          const CategoryIcon = iconMap[category.icon];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {/* Category Title */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold/10">
                  {CategoryIcon && <CategoryIcon size={18} className="text-gold" />}
                </div>
                <h3 className="text-lg font-semibold text-foreground/90 tracking-wide">
                  {category.title}
                </h3>
                <div className="divider-line flex-1 h-px ml-2" />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.skills.map((skill, index) => {
                  const SkillIcon = iconMap[skill.icon];
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className="skill-card group flex flex-col items-center justify-center text-center
                        py-5 px-3 rounded-xl backdrop-blur-sm
                        transition-all duration-300 cursor-default"
                    >
                      {SkillIcon && (
                        <SkillIcon
                          size={32}
                          style={{ color: skill.color }}
                          className="mb-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      )}
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
