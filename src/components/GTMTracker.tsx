import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function GTMTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "page_view",
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}