import { DirectionProvider } from "@radix-ui/react-direction";
import { ThemeProvider } from "./context/ThemeProvider";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <DirectionProvider dir="rtl">
        <AppRoutes />
        <Toaster
          toastOptions={{
            className: "bg-primary text-background max-w-[400px]",
          }}
        />
      </DirectionProvider>
    </ThemeProvider>
  );
};

export default App;
