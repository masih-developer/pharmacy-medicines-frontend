import { ThemeProvider } from "./context/ThemeProvider";
import AppRoutes from "./routes";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
