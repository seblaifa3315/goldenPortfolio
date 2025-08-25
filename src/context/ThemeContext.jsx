import { createContext, useContext } from "react";
import useDarkMode from "../hooks/usedarkMode";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useDarkMode();

  return (
    <ThemeContext.Provider value={{ dark, setDark}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
