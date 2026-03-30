import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  Timer,
  List,
  RefreshCw,
  Zap,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Mail,
  Download,
  Wand2,
  BookOpen,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
  Plus
} from "lucide-react";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { toast } from "sonner";
import { BentoPricing } from "@/components/ui/bento-pricing";

const AppNameColored = () => (
  <span className="font-bold">
    Clarit<span className="text-[#6E9EEB]">ee</span>
  </span>
);

const Landing = () => {
  return (
    <div className="bg-void min-h-screen selection:bg-[#6e9eeb]/30 text-white font-sans overflow-x-hidden">

      {/* Bloom-style Full Screen Hero */}
      <section className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" type="video/mp4" />
        </video>

        {/* WebGL Shader Background Overlay (Tinted #6e9eeb) */}
        <WebGLShader />

        {/* Left Panel */}
        <div className="relative z-10 w-full lg:w-[52%] flex flex-col p-4 lg:p-6 min-h-screen">
          <div className="liquid-glass-strong absolute inset-4 lg:inset-6 rounded-3xl z-[-1]" />

          <div className="flex justify-between items-center p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#6e9eeb]/20 flex items-center justify-center border border-[#6e9eeb]/50">
                <Brain className="w-4 h-4 text-[#6e9eeb]" />
              </div>
              <span className="font-semibold text-2xl tracking-tighter text-white font-['Poppins']">
                claritee
              </span>
            </div>

            <button className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-4 lg:px-12 relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-[#6e9eeb]/20 flex items-center justify-center border border-[#6e9eeb]/40 mb-8 backdrop-blur-md">
              <Brain className="w-10 h-10 text-[#6e9eeb]" />
            </div>

            <h1 className="text-6xl lg:text-7xl font-medium tracking-[-0.05em] text-white leading-[1.1] mb-8 font-['Poppins']">
              Stop guessing. <br />
              <em className="font-['Source_Serif_4'] italic text-white/80">Start deciding.</em>
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <LiquidButton
                size="xl"
                className="rounded-full font-['Poppins']"
                onClick={() => document.getElementById('waitlist-cta')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Download className="w-4 h-4 text-white" />
                </div>
                Download
              </LiquidButton>
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              <div className="liquid-glass px-4 py-2 rounded-full text-xs text-white/80 font-['Poppins']">Career</div>
              <div className="liquid-glass px-4 py-2 rounded-full text-xs text-white/80 font-['Poppins']">Business</div>
              <div className="liquid-glass px-4 py-2 rounded-full text-xs text-white/80 font-['Poppins']">Product</div>
              <div className="liquid-glass px-4 py-2 rounded-full text-xs text-white/80 font-['Poppins']">Life</div>
            </div>
          </div>

          <div className="px-4 lg:px-12 pb-8 flex flex-col gap-2 relative z-10">
            <span className="text-xs tracking-widest uppercase text-[#6e9eeb]/80 font-semibold font-['Poppins']">Decision Intelligence</span>
            <p className="text-lg text-white">
              <span className="font-['Poppins']">"Most decisions aren't hard. </span>
              <em className="font-['Source_Serif_4'] italic text-white/80">They're just unstructured.</em>
              <span className="font-['Poppins']">"</span>
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="h-px bg-white/20 w-8" />
              <span className="text-xs tracking-widest uppercase text-white/60 font-['Poppins']"> VAIBHAV, FOUNDER OF CLARITEE </span>
              <div className="h-px bg-white/20 w-8" />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="relative z-10 hidden lg:flex w-[48%] flex-col justify-between p-6">
          <div className="flex justify-between items-center w-full">
            <div className="liquid-glass rounded-full flex items-center gap-2 p-1.5 pr-4">
              <a href="https://x.com/VaibhavRaj009" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-white hover:scale-105 transition-transform"><Twitter className="w-4 h-4" /></a>
              <a href="https://www.linkedin.com/in/vaibhav-raj09/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-white hover:scale-105 transition-transform"><Linkedin className="w-4 h-4" /></a>
              <button onClick={() => toast("Instagram coming soon!")} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-white hover:scale-105 transition-transform"><Instagram className="w-4 h-4" /></button>
              <div className="w-px h-6 bg-white/20 mx-2" />
              <ArrowRight className="w-5 h-5 text-white/80" />
            </div>

            <button className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-[#6e9eeb]" />
            </button>
          </div>

          <div className="liquid-glass w-56 rounded-3xl p-5 ml-auto translate-y-24">
            <h3 className="text-white font-medium mb-1 font-['Poppins']">How it works</h3>
            <p className="text-white/60 text-xs leading-relaxed font-['Poppins']">9 structured steps. Weighted scoring. AI-assisted thinking. One clear answer.</p>
          </div>

          <div className="liquid-glass rounded-[2.5rem] p-3 flex flex-col gap-3 mt-auto w-full">
            <div className="grid grid-cols-2 gap-3">
              <div className="liquid-glass rounded-3xl p-5 flex flex-col items-center justify-center text-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-[#6e9eeb]" />
                </div>
                <span className="text-white text-sm font-medium mt-1 font-['Poppins']">Weighted Scoring</span>
              </div>
              <div className="liquid-glass rounded-3xl p-5 flex flex-col items-center justify-center text-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#6e9eeb]" />
                </div>
                <span className="text-white text-sm font-medium mt-1 font-['Poppins']">Decision History</span>
              </div>
            </div>

            <div className="liquid-glass rounded-[2rem] p-3 flex items-center gap-4 hover:scale-[1.01] transition-transform cursor-pointer">
              <div className="w-24 h-16 rounded-2xl bg-white/10 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm font-medium font-['Poppins']">Advanced Logic Sculpting</h4>
                <p className="text-white/50 text-xs font-['Poppins']">Structure your thoughts</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-2">
                <Plus className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="relative py-32 px-4 border-t border-white/5 bg-void">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-1.5 mb-6">
              <span className="text-sm text-rose-400 font-medium tracking-wide uppercase font-['Poppins']">The Problem</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 font-['Poppins']">
              Important decisions break our brains.
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-['Poppins']">
              When the stakes are high, standard logic fails. We succumb to cognitive biases, become overwhelmed by variables, and let paralysis dictate our path.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Timer,
                title: "Decision Fatigue",
                desc: "By the time you've weighed every variable, your willpower is drained and you settle for the path of least resistance."
              },
              {
                icon: List,
                title: "Hidden Variables",
                desc: "We rarely consider all potential downstream effects because our working memory can only hold so many competing facts."
              },
              {
                icon: RefreshCw,
                title: "Endless Cycling",
                desc: "Circling back to the same pros and cons repeatedly without any mathematical or structured way to break the tie."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="liquid-glass-strong p-8 rounded-3xl hover:bg-white/[0.03] transition-colors group relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-7 h-7 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3 font-['Poppins']">{item.title}</h3>
                <p className="text-white/60 leading-relaxed font-['Poppins']">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (9 Steps Stepper) */}
      <section id="how-it-works" className="relative py-32 px-4 bg-white/[0.01] border-y border-white/5">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 md:text-center"
          >
            <div className="inline-flex md:mx-auto items-center gap-2 rounded-full border border-[#6E9EEB]/20 bg-[#6E9EEB]/10 px-4 py-1.5 mb-6">
              <span className="text-sm text-[#6E9EEB] font-medium tracking-wide uppercase font-['Poppins']">How It Works</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 font-['Poppins']">
              From confusion to clarity <br className="hidden md:block" /> in nine structured steps.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {[
              { num: "01", title: "Define the decision" },
              { num: "02", title: "Set context" },
              { num: "03", title: "Generate options", ai: true },
              { num: "04", title: "Generate pros", ai: true },
              { num: "05", title: "Generate cons", ai: true },
              { num: "06", title: "Assign weights" },
              { num: "07", title: "Review scores" },
              { num: "08", title: "Explore sandbox" },
              { num: "09", title: "Get explanation", ai: true }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="liquid-glass relative p-6 rounded-2xl flex flex-col justify-between group hover:bg-white/[0.03]"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="font-['Poppins'] text-4xl font-light text-white/20 group-hover:text-white/40 transition-colors">
                    {step.num}
                  </span>
                  {step.ai && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6e9eeb]/10 border border-[#6e9eeb]/20 text-[#6e9eeb] text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(110,158,235,0.15)] font-['Poppins']">
                      <Zap className="w-3 h-3 fill-[#6e9eeb]" /> AI
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium text-white/90 tracking-wide font-['Poppins']">
                  {step.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section (Bento) */}
      <section id="pricing" className="relative py-32 px-4 bg-void">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,158,235,0.05)_0%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[#6E9EEB]/20 bg-[#6E9EEB]/10 px-4 py-1.5 mb-6">
              <span className="text-sm text-[#6E9EEB] font-medium tracking-wide uppercase font-['Inter']">PRICING</span>
            </div>
            <h2 className="text-[36px] font-bold text-[#EEEEFF] mb-6 font-['Inter']">
              Start free. Scale when you're ready.
            </h2>
            <p className="text-[#8888AA] text-[16px] max-w-[480px] mx-auto leading-relaxed font-['Inter']">
              Free tier includes 5 credits to get started. Buy more anytime, or go Pro for monthly delivery.
            </p>
          </motion.div>

          <BentoPricing />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-4 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto text-center liquid-glass-strong rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-medium text-white mb-8 font-['Poppins']">About Claritee</h2>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto font-['Poppins']">
              Built by one person who was tired of making decisions based on spreadsheets, gut feelings, and infinite browser tabs. We're on a mission to bring mathematical rigor and AI intelligence to personal and professional strategy.
            </p>
            <a
              href="mailto:support@clariteeai.me"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white font-['Poppins']"
            >
              <Mail className="w-4 h-4 text-white/60" />
              support@clariteeai.me
            </a>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="waitlist-cta" className="relative py-32 px-4 border-t border-white/5 overflow-hidden bg-void">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#6E9EEB]/5 blur-[100px] rounded-[100%] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-8 font-['Poppins']">
              Make your next decision <br /> your <em className="font-['Source_Serif_4'] italic text-white/90">best decision.</em>
            </h2>
            <Link to="/waitlist" className="inline-block mt-4">
              <LiquidButton size="xl" className="font-['Poppins'] bg-[#6E9EEB] text-[#09090F] hover:bg-[#6E9EEB]/90 font-semibold border-none">
                Join the waitlist today <ArrowRight className="w-5 h-5 ml-2" />
              </LiquidButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 bg-void text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-white text-lg font-['Poppins']">claritee</span>
          </div>
          <div className="text-white/50 text-sm font-['Poppins']">
            &copy; {new Date().getFullYear()} Claritee. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-white/50 font-['Poppins']">
            <a href="https://clariteeai.me/privacypolicy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="https://clariteeai.me/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
