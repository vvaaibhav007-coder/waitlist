import React, { useState, useEffect } from "react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ffffff", "#6E9EEB", "#4287f5"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ffffff", "#6E9EEB", "#4287f5"],
      });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Tiny artificial delay to make the submission feel intentional before hitting DB
    await new Promise((resolve) => setTimeout(resolve, 600));

    const { error } = await supabase.from("waitlist").insert({ email: trimmed });
    
    setIsSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        toast.info("You're already on the list!");
        setIsJoined(true);
        triggerConfetti();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      return;
    }
    
    toast.success("You've been added to the waitlist!");
    setIsJoined(true);
    triggerConfetti();
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
            text={
              <>
                Clarity<span className="text-[#6E9EEB]">.ai</span>
              </>
            }
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
            title1={
              <>
                Clarity<span className="text-[#6E9EEB]">.ai</span>
              </>
            }
            title2=""
            subtitle="Clarity.ai is a decision intelligence tool that scores your options, surfaces your trade-offs, and gives you a clear recommendation — in nine steps. Join the waitlist for early access."
          >
            <div className="mt-12 w-full max-w-lg">
              <AnimatePresence mode="wait">
                {!isJoined ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="relative flex flex-col sm:flex-row items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-md shadow-2xl"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-transparent px-4 py-3 text-sm text-primary-foreground placeholder:text-muted-foreground/50 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-[#6E9EEB]/90 hover:bg-[#6E9EEB] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(110,158,235,0.4)] transition-all hover:shadow-[0_0_30px_rgba(110,158,235,0.6)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Joining..." : "Join Waitlist"}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[#6E9EEB]/10 p-8 py-10 backdrop-blur-md shadow-2xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6E9EEB]/20 text-[#6E9EEB]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">You're on the list!</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      We'll notify you as soon as early access is available.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </HeroGeometric>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
