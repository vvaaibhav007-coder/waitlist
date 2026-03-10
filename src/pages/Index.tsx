import React, { useState, useEffect } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're on the list!");
    setEmail("");
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-void">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedText
              text="Clarity.ai"
              textClassName="text-6xl md:text-8xl font-extrabold"
              underlineDuration={1.8}
            />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            className="flex w-full flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-9xl text-primary-foreground px-0 py-px mx-0 my-px font-extrabold md:text-7xl">
              Clarity.ai
            </h1>

            <p className="mt-4 max-w-xl text-center text-base text-muted-foreground/80 leading-relaxed px-4">
              Clarity.ai is a decision intelligence tool that scores your options, surfaces your trade-offs, and gives you a clear recommendation — in nine steps. Join the waitlist for early access.
            </p>

            <div className="relative mt-6 h-40 w-[40rem] max-w-full">
              <div className="absolute inset-x-1/4 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
              <div className="absolute inset-x-1/4 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <div className="absolute inset-x-[35%] top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
              <div className="absolute inset-x-[35%] top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="h-full w-full"
                particleColor="#FFFFFF"
              />

              <div className="absolute inset-0 h-full w-full bg-void [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
            </div>

            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-lg px-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hi@manuarora.in"
                className="w-full rounded-lg border border-muted-foreground/20 bg-transparent px-4 py-3 text-sm text-primary-foreground placeholder:text-muted-foreground/40 outline-none focus:border-muted-foreground/40"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
