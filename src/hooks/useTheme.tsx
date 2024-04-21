import { themeContext } from "@/context/ThemeProvider";
import { useContext } from "react";

const useTheme = () => {
  const theme = useContext(themeContext);

  if (theme === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return theme;
};

export default useTheme;
