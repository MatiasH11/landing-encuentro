"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/pixel";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: string;
  params?: Record<string, unknown>;
}

/** Link que dispara un evento del Meta Pixel al hacer click (Lead, Contact, ViewContent). */
export default function TrackedLink({ event, params, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(event, params);
        onClick?.(e);
      }}
    />
  );
}
