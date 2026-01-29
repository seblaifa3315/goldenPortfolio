import { Award, Brain, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import portrait from "../../assets/portrait.jpg";

const About = () => {
  const { data, loading } = useData();
  const { language } = useLanguage();

  if (loading) return null;

  const supTitle = language ? data.about.supTitle : data.about.supTitleFrench;
  const title = language ? data.about.title : data.about.titleFrench;
  const subTitle = language ? data.about.subTitle : data.about.subTitleFrench;
  const paraTitle = language
    ? data.about.paraTitle
    : data.about.paraTitleFrench;
  const education = language
    ? data.about.education
    : data.about.educationFrench;
  const bachelorCS = language
    ? data.about.bachelorCS
    : data.about.bachelorCSFrench;
  const bachelorManagement = language
    ? data.about.bachelorManagement
    : data.about.bachelorManagementFrench;
  const experience = language
    ? data.about.experience
    : data.about.experienceFrench;
  const experienceYears = language
    ? data.about.experienceYears
    : data.about.experienceYearsFrench;
  const experienceRole = language
    ? data.about.experienceRole
    : data.about.experienceRoleFrench;
  const description = language
    ? data.about.description
    : data.about.descriptionFrench;
  const btnCV = language ? data.about.btnCV : data.about.btnCVFrench;
  const btnCVView = language ? data.about.btnCVView : data.about.btnCVViewFrench;
  const resumeDocx = language
    ? "/resume_sebastien_laifa.docx"
    : "/resume_sebastien_laifa_french.docx";
  const resumePdf = language
    ? "/resume_sebastien_laifa.pdf"
    : "/resume_sebastien_laifa_french.pdf";

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-16 lg:px-32 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <motion.header
        className="text-center mb-16 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-8 bg-gold/60" />
          <p className="text-xs uppercase tracking-[0.2em] text-gold/80 font-medium">
            {supTitle}
          </p>
          <span className="h-px w-8 bg-gold/60" />
        </div>
        <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-3">
          {title}
        </h2>
        <p className="text-foreground/60 text-sm max-w-md mx-auto">{subTitle}</p>
      </motion.header>

      {/* Main Content */}
      <motion.div
        className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Portrait */}
        <div className="mx-auto lg:mx-0">
          <div className="relative">
            <img
              src={portrait}
              alt="Portrait"
              className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-2xl shadow-lg shadow-foreground/5 hover:shadow-gold/20 hover:shadow-xl transition-all duration-300"
            />
            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-l-2 border-b-2 border-gold/40 rounded-bl-2xl" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center lg:text-left">
          <h3 className="text-foreground text-xl md:text-2xl font-medium mb-6">
            {paraTitle}
          </h3>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="group p-5 rounded-xl bg-foreground/[0.03] border border-foreground/10 hover:-translate-y-1 hover:border-gold/30 transition-all duration-300 cursor-default">
              <div className="flex items-center gap-2.5 mb-2 justify-center lg:justify-start">
                <Brain className="w-4 h-4 text-gold group-hover:scale-110 transition-transform duration-300" />
                <span className="text-foreground text-sm font-medium">
                  {education}
                </span>
              </div>
              <p className="text-foreground/70 text-xs leading-relaxed">
                {bachelorCS}
              </p>
              <p className="text-foreground/70 text-xs leading-relaxed">
                {bachelorManagement}
              </p>
            </div>

            <div className="group p-5 rounded-xl bg-foreground/[0.03] border border-foreground/10 hover:-translate-y-1 hover:border-gold/30 transition-all duration-300 cursor-default">
              <div className="flex items-center gap-2.5 mb-2 justify-center lg:justify-start">
                <Award className="w-4 h-4 text-gold group-hover:scale-110 transition-transform duration-300" />
                <span className="text-foreground text-sm font-medium">
                  {experience}
                </span>
              </div>
              <p className="text-foreground/70 text-xs leading-relaxed">
                {experienceYears}
              </p>
              <p className="text-foreground/70 text-xs leading-relaxed">
                {experienceRole}
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-foreground/70 text-sm leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            {description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href={resumeDocx}
              download
              className="group inline-flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gold/90 transition-all duration-300"
            >
              <Download size={15} className="group-hover:translate-y-0.5 transition-transform duration-300" />
              {btnCV}
            </a>
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-foreground px-5 py-2.5 rounded-lg text-sm font-medium border border-foreground/20 hover:border-foreground/40 transition-all duration-300"
            >
              <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              {btnCVView}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
