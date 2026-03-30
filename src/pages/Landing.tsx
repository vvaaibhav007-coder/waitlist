import React from 'react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center text-white flex-col gap-4">
      <h1 className="text-4xl font-bold">Claritee</h1>
      <p className="text-muted-foreground text-lg">Landing page coming soon.</p>
      <a href="/waitlist" className="px-6 py-3 rounded-xl bg-[#6E9EEB] hover:bg-[#5a8bd6] text-white font-semibold transition-colors">
        Join the Waitlist
      </a>
    </div>
  );
};

export default Landing;
