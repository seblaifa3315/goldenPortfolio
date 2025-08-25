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
      className="py-24 px-6 md:px-20 lg:px-40 bg-background2 text-foreground space-y-16"
    >
      {/* Section Heading */}
      <motion.div
        className="flex flex-col items-center text-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="w-20 h-[3px] bg-gradient-to-r from-gold to-transparent rounded-full mb-1" />
        <p className="text-sm uppercase tracking-widest text-muted-foreground">{supTitle}</p>
        <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
      </motion.div>

      {/* Skill Categories */}
      <div className="space-y-14">
        {skillCategories.map((category, idx) => {
          const CategoryIcon = iconMap[category.icon];
          return (
            <motion.div
              key={idx}
              className="space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {/* Category Title */}
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold text-gold flex items-center gap-2">
                  {CategoryIcon && <CategoryIcon size={22} className="text-gold" />}
                  {category.title}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {category.skills.map((skill, index) => {
                  const SkillIcon = iconMap[skill.icon];
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className="flex flex-col items-center justify-center text-center p-4 rounded-2xl 
                        bg-white/10 backdrop-blur-md border border-white/20 
                        shadow-[0_4px_12px_rgba(0,0,0,0.1)] 
                        transition-all duration-300"
                    >
                      {SkillIcon && (
                        <SkillIcon size={36} style={{ color: skill.color }} className="mb-2" />
                      )}
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
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
