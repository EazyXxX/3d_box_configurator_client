import { ThemeProvider, createTheme, IconButton } from "@mui/material";
import { Sun, Moon } from "lucide-react";
import { BoxScene } from "./components/BoxScene";
import { BoxForm } from "./components/BoxForm";
import { useBoxStore } from "./store";

function App() {
  const isDarkMode = useBoxStore((state) => state.isDarkMode);
  const toggleDarkMode = useBoxStore((state) => state.toggleDarkMode);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1
              className={`text-3xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              3D Box Configurator
            </h1>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {isDarkMode ? (
                <Sun className="text-white transition-colors duration-300" />
              ) : (
                <Moon className="text-gray-900 transition-colors duration-300" />
              )}
            </IconButton>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <BoxScene />
            <BoxForm />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
