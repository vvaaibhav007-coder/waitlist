import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-47CVCRT6G8";

export function GTMTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("config", GA_MEASUREMENT_ID, {
          page_path: location.pathname,
          page_title: document.title,
        });
      }
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "page_view",
          page_path: location.pathname,
          page_title: document.title,
        });
      }
    }
  }, [location]);

  return null;
}

type EventParams = Record<string, unknown>;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  } else if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}

export function setUserProperty(propertyName: string, value: unknown) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", "user_properties", {
      [propertyName]: value,
    });
  }
}

export function trackConversion(conversionId: string, params?: EventParams) {
  trackEvent("conversion", {
    send_to: conversionId,
    ...params,
  });
}

export function trackWaitlistSignUp(params?: EventParams) {
  trackEvent("sign_up", {
    method: "waitlist",
    ...params,
  });
}

export function trackLead(params?: EventParams) {
  trackEvent("generate_lead", params);
}

export function trackBeginCheckout(params?: EventParams) {
  trackEvent("begin_checkout", params);
}

export function trackPurchase(transactionId: string, value: number, currency: string = "USD", params?: EventParams) {
  trackEvent("purchase", {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    ...params,
  });
}