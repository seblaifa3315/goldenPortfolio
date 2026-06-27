import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = ({ strings, className }) => {
  const el = useRef(null);

  useEffect(() => {
    if (!strings || strings.length === 0) return;

    const typed = new Typed(el.current, {
      strings,
      typeSpeed: 75,
      backSpeed: 50,
      loop: true,
      showCursor: false,
      contentType: 'html',
    });

    return () => typed.destroy();
  }, [strings]);

  return <span ref={el} className={className} />;
};

export default TypedText;
