import { Award, Brain, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import portrait from "../../assets/portrait.jpg";



const About = () => {
  const { data, loading } = useData();
  const { language } = useLanguage();

  if (loading) return <div></div>;

  const profilePicture = data.about.profilePicture;
  const supTitle = language ? data.about.supTitle : data.about.supTitleFrench;
  const title = language ? data.about.title : data.about.titleFrench;
  const subTitle = language ? data.about.subTitle : data.about.subTitleFrench;
  const paraTitle = language ? data.about.paraTitle : data.about.paraTitleFrench;
  const education = language ? data.about.education : data.about.educationFrench;
  const bachelorCS = language ? data.about.bachelorCS : data.about.bachelorCSFrench;
  const bachelorManagement = language ? data.about.bachelorManagement : data.about.bachelorManagementFrench;
  const experience = language ? data.about.experience : data.about.experienceFrench;
  const experienceYears = language ? data.about.experienceYears : data.about.experienceYearsFrench;
  const experienceRole = language ? data.about.experienceRole : data.about.experienceRoleFrench;
  const description = language ? data.about.description : data.about.descriptionFrench;
  const btnCV = language ? data.about.btnCV : data.about.btnCVFrench;
  const downloadLink = data.about.downloadLink;
  const btnCVView = language ? data.about.btnCVView : data.about.btnCVViewFrench;
  const viewLink = data.about.viewLink;
  const resumeDocx = language ? "/resume_sebastien_laifa.docx" : "/resume_sebastien_laifa_french.docx";
  const resumePdf = language ? "/resume_sebastien_laifa.pdf" : "/resume_sebastien_laifa_french.pdf";



  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center pt-20 pb-40 px-6 md:px-20 lg:px-40 gap-10"
    >
      {/* Section Header */}
      <motion.div
        className="flex flex-col items-center text-center mb-10 gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="w-20 h-1 bg-gradient-to-r from-gold to-transparent rounded-full mb-2" />
        <p className="text-grey text-sm uppercase tracking-widest">{supTitle}</p>
        <h1 className="text-foreground text-4xl md:text-5xl font-semibold">{title}</h1>
        <p className="italic text-muted text-foreground font-extralight text-sm mt-2">
          {subTitle}
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-between w-full gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Image */}
        <motion.div
          className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={portrait}
            alt="Profile Picture"
            className="w-full h-full object-cover rounded-3xl shadow-lg [mask-image:radial-gradient(ellipse_at_center,white,transparent)] [mask-size:100%_100%] [mask-repeat:no-repeat]"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className=" flex flex-col gap-4 lg:w-2/3 text-center lg:text-left text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-xl md:text-2xl font-medium text-foreground mb-4">
            {paraTitle}
          </h2>

          {/* Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
            {/* Education */}
            <div className="bg-background border border-foreground/30 rounded-xl px-6 py-4 text-sm shadow-md flex flex-col gap-2 items-center w-full sm:w-1/2">
              <div className="flex items-center gap-2 font-semibold text-md">
                <Brain className="w-5 h-5 text-gold" />
                <h3>{education}</h3>
              </div>
              <div className="text-foreground/90 text-xs text-center">
                <p>{bachelorCS}</p>
                <p>{bachelorManagement}</p>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-background border border-foreground/30 rounded-xl px-6 py-4 text-sm shadow-md flex flex-col gap-2 items-center w-full sm:w-1/2">
              <div className="flex items-center gap-2 font-semibold text-md">
                <Award className="w-5 h-5 text-gold" />
                <h3>{experience}</h3>
              </div>
              <div className="text-foreground/90 text-xs text-center">
                <p>{experienceYears}</p>
                <p>{experienceRole}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted leading-relaxed mb-6 text-balance">
            {description}
          </p>

          {/* Resume Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href={resumeDocx}
              download={resumeDocx}
              target="_blank"
              className="flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-transparent hover:text-gold border border-gold transition-all duration-300"
            >
              <Download size={16} />
              {btnCV}
            </a>

            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border text-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-foreground hover:text-background border-foreground transition-all duration-300"
            >
              <ExternalLink size={16} />
              {btnCVView}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
