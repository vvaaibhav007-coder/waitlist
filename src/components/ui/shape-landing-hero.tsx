"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  neon = false,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  neon?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            neon
              ? "border border-[#6E9EEB]/40 shadow-[0_0_15px_rgba(110,158,235,0.3),inset_0_0_15px_rgba(110,158,235,0.1)]"
              : "border border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.04)]",
            "backdrop-blur-[2px]",
            "after:absolute after:inset-0 after:rounded-full",
            neon
              ? "after:bg-[radial-gradient(circle_at_50%_50%,rgba(110,158,235,0.1),transparent_70%)]"
              : "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
  subtitle,
  children,
}: {
  badge?: React.ReactNode;
  title1?: React.ReactNode;
  title2?: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-void">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.1}
          width={600}
          height={140}
          rotate={12}
          gradient="from-white/[0.07]"
          neon
          className="-left-[10%] top-[15%] md:left-[-5%]"
        />
        <ElegantShape
          delay={0.2}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-white/[0.05]"
          className="-right-[10%] top-[20%] md:right-[-5%]"
        />
        <ElegantShape
          delay={0.15}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-white/[0.06]"
          neon
          className="-left-[5%] bottom-[15%] md:left-[5%]"
        />
        <ElegantShape
          delay={0.25}
          width={200}
          height={60}
          rotate={20}
          gradient="from-white/[0.04]"
          className="-right-[5%] bottom-[20%] md:right-[10%]"
        />
        <ElegantShape
          delay={0.3}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-white/[0.05]"
          neon
          className="left-[15%] top-[10%]"
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5"
        >
          <span className="text-sm text-white/80 font-medium">{badge}</span>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            <span>
              {title1}
            </span>
            <br />
            <span>
              {title2}
            </span>
          </h1>
        </motion.div>

        {subtitle && (
          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-base leading-relaxed md:text-lg animate-shimmer bg-[size:200%_auto] bg-gradient-to-r from-muted-foreground/70 via-white/90 to-muted-foreground/70 bg-clip-text text-transparent"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export { HeroGeometric };
