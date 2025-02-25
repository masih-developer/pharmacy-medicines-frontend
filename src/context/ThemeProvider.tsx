import { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeContextState = {
  theme: "system",
  setTheme: () => null,
};

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme: Theme;
  storageKey?: string;
};

export const themeContext = createContext<ThemeContextState>(initialState);

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");

    // check has exist system theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    // add aonther themes form theme state
    root.classList.add(theme);
  }, [theme]);

  // create value constant
  const value: ThemeContextState = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <themeContext.Provider {...props} value={value}>
      {children}
    </themeContext.Provider>
  );
};
