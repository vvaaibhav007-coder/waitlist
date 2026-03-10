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

interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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
      children,
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
          <div className="absolute inset-0">
            {/* Main large glow - lamp spotlight */}
            <div className="absolute left-1/2 top-0 h-[70%] w-[80%] -translate-x-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent" 
              style={{ clipPath: "polygon(40% 0%, 60% 0%, 90% 100%, 10% 100%)" }} 
            />

            {/* Bright center glow */}
            <div className="absolute left-1/2 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-white/10 blur-[100px]" />

            {/* Top edge bright line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[4px] w-1/4 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-sm" />

            {/* Softer wide ambient */}
            <div className="absolute left-1/2 top-0 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-white/5 blur-[150px]" />
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
          {children}
        </div>
      </div>
    );
  }
);

Hero.displayName = "Hero";

export { Hero };
export type { HeroProps, HeroAction };
