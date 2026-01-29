import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
  const { data, loading } = useData();
  const { language } = useLanguage();

  if (loading) return <div></div>;

  const rights = language ? data.footer.rights : data.footer.rightsFrench;
  const built = language ? data.footer.built : data.footer.builtFrench;

  return (
    <footer className="bg-background px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-gold/40" />
          <span className="text-gold/60 text-xs tracking-widest">SL</span>
          <span className="h-px w-6 bg-gold/40" />
        </div>

        <div className="text-center space-y-1">
          <p className="text-xs text-foreground/50 tracking-wide">
            © {new Date().getFullYear()} Sebastien Laifa · {rights}
          </p>
          <p className="text-xs text-foreground/30">{built}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
