import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
    const { data, loading } = useData();
    const { language } = useLanguage();

    if (loading) return <div></div>;

    const rights = language ? data.footer.rights : data.footer.rightsFrench;
    const built = language ? data.footer.built : data.footer.builtFrench;

    return (
        <footer className="bg-background border-t border-foreground/10 px-6 py-10 text-sm text-center text-foreground/60">
            <div className="max-w-6xl mx-auto">
                <p className="mb-2">© {new Date().getFullYear()} Sebastien Laifa. {rights}</p>
                <p className="text-foreground/40">{built}</p>
            </div>
        </footer>
    );
};

export default Footer;
