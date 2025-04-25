import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/layout/theme-provider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="startup-launch-theme">
    <App />
  </ThemeProvider>
);
