import { DirectionProvider } from "@radix-ui/react-direction";
import { ThemeProvider } from "./context/ThemeProvider";
import AppRoutes from "./routes";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <DirectionProvider dir="rtl">
        <AppRoutes />
      </DirectionProvider>
    </ThemeProvider>
  );
};

export default App;
