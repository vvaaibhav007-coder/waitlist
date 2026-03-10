import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-void">
      {/* Atmospheric particle field */}
      <div className="absolute inset-0 h-screen w-full">
        <SparklesCore
          id="tsparticles-stillpoint"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Stark typographic content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-light md:text-7xl lg:text-9xl">
          Stillpoint
        </h1>
        <motion.p
          className="mt-4 text-lg font-normal text-light/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Architecture, not interfaces.
        </motion.p>
      </motion.div>
    </main>
  );
};

export default Index;
