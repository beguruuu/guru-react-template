import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/layouts/app-layout";
import { WelcomePage } from "@/pages/welcome";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";

const getBasePath = () => {
  const injected = (window as Window & { __BASE_PATH__?: string }).__BASE_PATH__;
  if (injected) {
    return injected.replace(/\/$/, "") || "/";
  }
  const b = import.meta.env.BASE_URL;
  if (b === "/") return "/";
  return b.replace(/\/$/, "") || "/";
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
], { basename: getBasePath() });
