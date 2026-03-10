import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

const Index = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-void">
      <h1 className="text-5xl font-bold text-light lg:text-9xl md:text-5xl">Stop guessing. Start deciding.

      </h1>

      <div className="relative mt-4 h-40 w-[40rem] max-w-full">
        {/* Gradients */}
        <div className="absolute inset-x-1/4 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
        <div className="absolute inset-x-1/4 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-[35%] top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
        <div className="absolute inset-x-[35%] top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

        {/* Core sparkles component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="h-full w-full"
          particleColor="#FFFFFF" />
        

        {/* Radial gradient to prevent sharp edges */}
        <div className="absolute inset-0 h-full w-full bg-void [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
      </div>
    </div>);

};

export default Index;