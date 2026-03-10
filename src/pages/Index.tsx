import React, { useState, useEffect } from "react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
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
    <AnimatePresence mode="wait">
      {showSplash ? (
        <motion.div
          key="splash"
          className="flex min-h-screen w-full items-center justify-center bg-void"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroGeometric
            badge="Clarity.ai"
            title1="Clarity.ai"
            title2=""
            subtitle="Clarity.ai is a decision intelligence tool that scores your options, surfaces your trade-offs, and gives you a clear recommendation — in nine steps. Join the waitlist for early access."
          >
            <form onSubmit={handleSubmit} className="mt-8 w-full max-w-lg">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hi@manuarora.in"
                className="w-full rounded-lg border border-muted-foreground/20 bg-transparent px-4 py-3 text-sm text-primary-foreground placeholder:text-muted-foreground/40 outline-none focus:border-muted-foreground/40"
              />
            </form>
          </HeroGeometric>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
