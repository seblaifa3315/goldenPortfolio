import About from "./components/sections/About";
import Hero from "./components/sections/Hero";
import Navbar from "./components/sections/Navbar";
import Portfolio from "./components/sections/Portfolio";
import Skills from "./components/sections/Skills";
import "./index.css";
import Footer from "./components/sections/Footer";
import Contact from "./components/sections/Contact";

export default function App() {

    return (
        <>
            <Navbar />
            <Hero/>
            <About />

            <Skills />
            <Portfolio />
            <Contact />
            <Footer />
        </>
    );
}

