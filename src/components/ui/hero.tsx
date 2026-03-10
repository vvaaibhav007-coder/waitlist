"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroAction {
  label: string;
  href: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  blur?: boolean;
  title: React.ReactNode;
  subtitle?: string;
  actions?: HeroAction[];
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  (
    {
      className,
      gradient = true,
      blur = true,
      title,
      subtitle,
      actions,
      titleClassName,
      subtitleClassName,
      actionsClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-void",
          className
        )}
        {...props}
      >
        {gradient && (
          <div className="absolute inset-0 flex items-center justify-center">
            {blur && (
              <div className="absolute inset-0 bg-void/80 backdrop-blur-3xl" />
            )}

            {/* Main glow */}
            <div className="absolute top-1/2 h-[300px] w-[600px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

            {/* Lamp effect */}
            <div className="absolute top-[40%] h-px w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Top line */}
            <div className="absolute top-[40%] h-[2px] w-1/3 bg-gradient-to-r from-transparent via-primary/80 to-transparent blur-sm" />

            {/* Left gradient cone */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-1/4 top-[35%] h-[200px] w-[2px]"
            >
              <div className="h-full w-full bg-gradient-to-b from-primary/60 to-transparent" />
              <div className="absolute inset-0 h-full w-[80px] -translate-x-1/2 bg-gradient-to-b from-primary/10 to-transparent blur-2xl" />
            </motion.div>

            {/* Right gradient cone */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute right-1/4 top-[35%] h-[200px] w-[2px]"
            >
              <div className="h-full w-full bg-gradient-to-b from-primary/60 to-transparent" />
              <div className="absolute inset-0 h-full w-[80px] -translate-x-1/2 bg-gradient-to-b from-primary/10 to-transparent blur-2xl" />
            </motion.div>
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              className={cn(
                "text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl lg:text-7xl",
                titleClassName
              )}
            >
              {title}
            </h1>
          </motion.div>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={cn(
                "mt-6 max-w-xl text-base text-muted-foreground/80 leading-relaxed",
                subtitleClassName
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {actions && actions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={cn("mt-8 flex flex-wrap items-center justify-center gap-4", actionsClassName)}
            >
              {actions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <Button variant={action.variant || "default"}>{action.label}</Button>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    );
  }
);

Hero.displayName = "Hero";

export { Hero };
export type { HeroProps, HeroAction };
