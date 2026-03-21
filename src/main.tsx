import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
import "@fontsource/geist/700.css";
import "@fontsource/geist-mono/400.css";
import "./styles/globals.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/query-provider";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <App />
      </TooltipProvider>
    </QueryProvider>
  </StrictMode>
);