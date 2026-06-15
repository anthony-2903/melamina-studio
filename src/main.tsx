import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { reportWebVitals } from "@/lib/reportWebVitals";

createRoot(document.getElementById("root")!).render(
  <App />
);

void reportWebVitals();
