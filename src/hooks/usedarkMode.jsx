import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    // If stored, use it
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";

    // If no stored preference, check for class on <html>
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return [dark, setDark];
};

export default useDarkMode;
