import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Admin from "./pages/admin";

import "./index.css";
import NotFound from "./pages/NotFound";

// 🚀 Configuración del router con las flags v7 activadas
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],

);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
