import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ErrorBoundary as ErrorCatcher } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import "./index.css";
import Router from "./Router.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorCatcher fallbackRender={ErrorBoundary}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorCatcher>
  </StrictMode>
);
