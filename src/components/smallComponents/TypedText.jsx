import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { useData } from '../../context/DataContext';
import { useLanguage } from "../../context/LanguageContext";

const TypedText = () => {
  const { data, loading } = useData();
  const {language, setLanguage} = useLanguage();
  const el = useRef(null);

  useEffect(() => {
    if (loading || !data) return;

    const strings = language ? data.typedText : data.typedTextFrench;

    if (!strings) return;

    const typed = new Typed(el.current, {
      strings,
      typeSpeed: 75,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    });

    return () => typed.destroy();
  }, [data, loading, language]);

  return <span ref={el} className="" />;
};

export default TypedText;
