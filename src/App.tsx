import { ThemeProvider } from "./context/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      App
    </ThemeProvider>
  );
};

export default App;
