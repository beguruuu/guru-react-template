import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/layouts/app-layout";
import { WelcomePage } from "@/pages/welcome";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";

const getBasePath = () => {
  const base = (window as Window & { __BASE_PATH__?: string }).__BASE_PATH__;
  return base ? base.replace(/\/$/, "") : "/";
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
