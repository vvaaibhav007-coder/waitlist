import React, { useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");

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
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-void">
      <h1 className="text-5xl lg:text-9xl text-primary-foreground px-0 py-px mx-0 my-px font-extrabold md:text-7xl">Clarity.ai</h1>

      <p className="mt-4 max-w-xl text-center text-base text-muted-foreground/80 leading-relaxed px-4">
        Clarity.ai is a decision intelligence tool that scores your options, surfaces your trade-offs, and gives you a clear recommendation — in nine steps. Join the waitlist for early access.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md px-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 rounded-none border border-muted-foreground/30 bg-transparent px-4 py-3 text-sm text-primary-foreground placeholder:text-muted-foreground/50 outline-none focus:border-muted-foreground/60"
        />
        <button
          type="submit"
          className="border border-l-0 border-muted-foreground/30 bg-primary-foreground px-5 py-3 text-sm font-medium text-void transition-opacity hover:opacity-80"
        >
          Join
        </button>
      </form>

      <div className="relative mt-6 h-40 w-[40rem] max-w-full">
        {/* Gradients */}
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
          particleColor="#FFFFFF" />

        <div className="absolute inset-0 h-full w-full bg-void [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
      </div>
    </div>
  );
};

export default Index;