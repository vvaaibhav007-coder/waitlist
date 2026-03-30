import React, { useState, useEffect } from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";
import { CountrySelect } from "@/components/ui/country-select";
import {
  Brain,
  TrendingUp,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Heart,
  Download,
  Globe,
  Star,
  ArrowRight,
  Shield,
  Check,
  Circle
} from "lucide-react";

const AppNameColored = () => (
  <span>
    Clarit<span className="text-[#6E9EEB]">ee</span>
  </span>
);

const AppNamePlain = () => (
  <span>Claritee</span>
);

const features = [
  {
    icon: Brain,
    title: "AI-Powered Decision Making",
    description: "Our AI analyzes your options and provides intelligent recommendations based on your goals and preferences."
  },
  {
    icon: TrendingUp,
    title: "Trade-off Analysis",
    description: "Automatically surface the pros and cons of each choice so you can make informed decisions."
  },
  {
    icon: Zap,
    title: "Nine-Step Framework",
    description: "A proven methodology that guides you through clarity in 9 structured steps."
  },
  {
    icon: CheckCircle2,
    title: "Score Your Options",
    description: "Get a numerical score for each option based on weighted criteria that matter to you."
  }
];

const steps = [
  {
    number: "01",
    title: "Define Your Goal",
    description: "Start by clearly stating what decision you need to make and why it matters."
  },
  {
    number: "02",
    title: "List Your Options",
    description: "Write down all possible choices you're considering, no matter how different they are."
  },
  {
    number: "03",
    title: "Set Criteria",
    description: "Identify what factors are most important to you in this decision."
  },
  {
    number: "04",
    title: "Score Each Option",
    description: "Rate every option against your criteria using our intuitive scoring system."
  },
  {
    number: "05",
    title: "Get Your Recommendation",
    description: "Receive an AI-generated recommendation with a clear explanation of why."
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    content: "Claritee helped me decide between two job offers. The trade-off analysis was incredibly insightful!",
    rating: 5,
    image: "/avatar_1.png"
  },
  {
    name: "Marcus Johnson",
    role: "Startup Founder",
    content: "I was stuck on a major business decision for weeks. Claritee gave me clarity in minutes.",
    rating: 5,
    image: "/avatar_2.png"
  },
  {
    name: "Emily Rodriguez",
    role: "Software Engineer",
    content: "The nine-step framework is brilliant. It feels like having a personal decision coach.",
    rating: 5,
    image: "/avatar_3.png"
  }
];

const faqs = [
  {
    question: "When will Claritee be available?",
    answer: "We're aiming for early access in Q2 2026. Join the waitlist to get notified first!"
  },
  {
    question: "What platforms will Claritee support?",
    answer: "Claritee will be available on iOS first, with Android and web versions coming later."
  },
  {
    question: "Is there a free version?",
    answer: "Yes! We'll have a free tier with basic features, plus premium plans for advanced analysis."
  },
  {
    question: "How does the decision scoring work?",
    answer: "You set weighted criteria based on what's important to you, and our AI scores each option against those criteria to give you an objective recommendation."
  }
];

const GOAL_AMOUNT = 200;

const Index = () => {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [donationAmount, setDonationAmount] = useState(45);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [suggestion, setSuggestion] = useState("");
  const [isSubmittingSuggestion, setIsSubmittingSuggestion] = useState(false);
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);
  const [displayCount, setDisplayCount] = useState(1000);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const incrementCounter = () => {
      const randomInterval = Math.random() * 50000 + 5000;
      timeoutId = setTimeout(() => {
        setDisplayCount(prev => prev + 1);
        incrementCounter();
      }, randomInterval);
    };

    incrementCounter();

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const feedbackToast = toast(
      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3">
        <span className="text-sm sm:text-base">Tell us what you expect from Claritee!</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const el = document.getElementById("feedback-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              toast.dismiss(feedbackToast);
            }}
            className="text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-[#6E9EEB] text-white hover:bg-[#5a8bd6] transition-colors"
          >
            Share Now
          </button>
          <button
            onClick={() => toast.dismiss(feedbackToast)}
            className="text-white/60 hover:text-white p-1"
          >
            ✕
          </button>
        </div>
      </div>,
      {
        duration: 10000,
      }
    );
  }, []);

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = suggestion.trim();
    if (!trimmed) {
      toast.error("Please enter your suggestion.");
      return;
    }

    setIsSubmittingSuggestion(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!supabase) {
      toast.error("Service unavailable. Please try again later.");
      return;
    }
    const { error } = await supabase.from("feedback").insert({
      suggestion: trimmed
    });

    setIsSubmittingSuggestion(false);

    if (error) {
      toast.error("Failed to submit. Please try again.");
      return;
    }

    toast.success("Thanks for your feedback!");
    setSuggestionSubmitted(true);
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
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

    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!supabase) {
      toast.error("Service unavailable. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("waitlist").insert({
      email: trimmed,
      ...(country ? { country } : {})
    });

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

  const progressPercentage = Math.min((donationAmount / GOAL_AMOUNT) * 100, 100);

  return (
    <div className="bg-void">
          <HeroGeometric
            badge={<><Circle className="h-2 w-2 fill-green-400/80 text-green-400/80 inline mr-2" />Now in early access — {displayCount.toLocaleString()} spots claimed</>}
            title1="Make your most difficult"
            title2={<>decisions with <span className="text-[#6e9eeb]">100% confidence.</span></>}
            subtitle="Get AI-powered clarity in minutes, not days."
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
                    className="relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md shadow-2xl"
                  >
                    <div className="flex w-full rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-transparent px-4 py-3 text-sm text-primary-foreground placeholder:text-muted-foreground/50 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full whitespace-nowrap rounded-xl bg-[#6E9EEB]/90 hover:bg-[#6E9EEB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(110,158,235,0.4)] transition-all hover:shadow-[0_0_30px_rgba(110,158,235,0.6)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Joining..." : "Get early access →"}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-8 py-10 backdrop-blur-xl shadow-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#6E9EEB]/30 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#6E9EEB]/20 text-[#6E9EEB]">
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
                    <h3 className="relative z-10 text-xl font-semibold text-white">You're on the list!</h3>
                    <p className="relative z-10 text-sm text-muted-foreground text-center">
                      We'll notify you as soon as early access is available.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!isJoined && (
                <>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-sm text-muted-foreground mt-4"
                  >
                    <span className="text-white font-medium">{displayCount.toLocaleString()}</span> people have already joined the waitlist
                  </motion.p>
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-green-400" />
                      <span>No spam, ever</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6E9EEB]" />
                      <span>Early access</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Free to join</span>
                    </div>
                  </div>
                  <p className="text-center text-xs text-[#6E9EEB] mt-2 font-medium">
                    Limited spots available for early access
                  </p>
                </>
              )}
            </div>
          </HeroGeometric>

          {/* Problem Section */}
          <section className="relative py-24 px-4 border-b border-white/5 bg-void/50">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative z-10 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  The Decision Paralysis <span className="text-[#6E9EEB]">Problem</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  When faced with a tough choice, the mental load becomes overwhelming. You overthink, delay, and let opportunities slip away because it's impossible to track dozens of variables, pros, and cons in your head alone.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Endless Overthinking",
                    desc: "You spend weeks researching and endlessly comparing options without ever getting closer to a confident answer."
                  },
                  {
                    title: "Missed Opportunities",
                    desc: "By delaying your decision, you often let the best options expire, letting circumstances decide for you."
                  },
                  {
                    title: "Mental Exhaustion",
                    desc: "Your cognitive load maxes out from trying to constantly weigh trade-offs and remember every little detail."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="p-8 rounded-2xl border border-rose-500/10 bg-rose-500/5 hover:bg-rose-500/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center mb-6">
                      <span className="text-rose-400 font-bold">0{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative py-24 px-4">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative z-10 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Why <AppNameColored />?
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Make better decisions with AI-powered analysis that uncovers what truly matters to you.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#6E9EEB]/10 flex items-center justify-center mb-4 group-hover:bg-[#6E9EEB]/20 transition-all">
                      <feature.icon className="w-6 h-6 text-[#6E9EEB]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="relative py-24 px-4 bg-white/[0.02]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative z-10 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  How It <span className="text-[#6E9EEB]">Works</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Get clarity in just five simple steps
                </p>
              </motion.div>

              <div className="grid md:grid-cols-5 gap-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] text-center"
                  >
                    <div className="text-4xl font-bold text-[#6E9EEB]/30 mb-4">{step.number}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                    {index < steps.length - 1 && (
                      <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/20 w-6 h-6" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Donation Section */}
          <section className="relative py-24 px-4">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 md:p-12 rounded-3xl border border-[#6E9EEB]/30 bg-gradient-to-br from-[#6E9EEB]/5 to-transparent"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Star className="w-8 h-8 text-[#6E9EEB] fill-[#6E9EEB]/30" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Become a Founding Supporter
                  </h2>
                </div>

                <p className="text-muted-foreground text-center mb-6 text-lg">
                  Join our exclusive inner circle to help launch <AppNameColored /> to the world.
                </p>

                <div className="bg-[#6E9EEB]/10 rounded-xl p-5 mb-6 border border-[#6E9EEB]/20 relative overflow-hidden z-10">
                  <div className="absolute -top-4 -right-4 bg-[#6e9eeb]/20 blur-xl w-32 h-32 rounded-full pointer-events-none" />
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <p className="text-base text-white font-semibold tracking-wide">Founding Supporter Reward</p>
                  </div>
                  <p className="text-lg text-white/90 font-medium">
                    Supporters get 10 months of Pro access (worth over $100) when we launch.
                  </p>
                </div>

                <div className="mb-8 relative z-20">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white font-medium">${donationAmount} raised</span>
                    <span className="text-muted-foreground">Goal: ${GOAL_AMOUNT}</span>
                  </div>
                  <div className="h-6 rounded-full bg-white/10 overflow-hidden shadow-inner">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#6e9eeb] to-[#8fb8f9]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progressPercentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <p className="text-center text-sm text-[#6e9eeb]/80 font-medium mt-3">
                    {progressPercentage.toFixed(0)}% funded • {GOAL_AMOUNT - donationAmount} more needed
                  </p>
                </div>

                <div className="flex justify-center relative z-20">
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-[#6E9EEB] hover:bg-[#5a8bd6] text-white font-semibold text-lg transition-all shadow-[0_0_20px_rgba(110,158,235,0.4)] hover:shadow-[0_0_30px_rgba(110,158,235,0.6)] cursor-not-allowed opacity-70"
                  >
                    <Star className="w-5 h-5 fill-white" />
                    <span>Become a Supporter with Stripe</span>
                  </button>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4 relative z-20">
                  Secure payment via Stripe • Coming soon
                </p>
              </motion.div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="relative py-24 px-4">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative z-10 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  What People <span className="text-[#6E9EEB]">Say</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Early testers love <AppNamePlain />
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 flex-grow">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Meet the Founder Section */}
          <section className="relative py-24 px-4 bg-void/30 border-y border-white/5">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative z-10 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-[2fr_1fr] gap-12 p-8 md:p-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md"
              >
                {/* The Letter */}
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-yellow-400 font-medium tracking-wide">Meet the Maker</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                    A Note From the <span className="text-[#6E9EEB]">Founder</span>
                  </h2>
                  <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                    <p>
                      Two years ago, I was agonizing over a major life pivot. I spent weeks staring at blank spreadsheets, trying to forcefully logic my way out of a confusing crossroads. I was exhausted, overloaded with advice, and completely paralyzed by the fear of making the "wrong" choice.
                    </p>
                    <p>
                      That's when I realized: <strong className="text-white">our brains aren't built to cleanly juggle dozens of competing variables and emotions at once.</strong> 
                    </p>
                    <p>
                      I built <AppNameColored /> to be the objective sounding board I desperately needed. My vision is a world where anyone facing a complex, high-stakes choice can find instant clarity and confidence, powered by unbiased AI analysis. No more second-guessing. No more sleepless nights.
                    </p>
                    <p>
                      We are building a tool that doesn't dictate your path, but elegantly hands you the map. I'm incredibly passionate about solving this problem, and I'd love for you to join me as a Founding Supporter on this journey.
                    </p>
                  </div>
                  <div className="mt-10">
                    <p className="font-[Caveat,cursive,sans-serif] text-4xl text-white opacity-90 transform -rotate-2">
                      Vaibhav
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 font-medium tracking-wide uppercase">Founder & Lead Developer</p>
                  </div>
                </div>

                {/* Professional Bio */}
                <div className="md:border-l md:border-white/10 md:pl-12 pt-12 md:pt-0 border-t border-white/10 md:border-t-0 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#6E9EEB]/10 flex items-center justify-center border border-[#6E9EEB]/20 mb-6">
                      <Star className="w-8 h-8 text-[#6E9EEB] fill-[#6E9EEB]/30" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">About Vaibhav</h3>
                    <p className="text-[#6E9EEB] text-sm font-semibold tracking-wide mb-4">PRODUCT DEVELOPER & AI ENTHUSIAST</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    With a rich background in software engineering and product development, Vaibhav has spent the last half-decade building tools that simplify complex human workflows.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm mt-4">
                    Combining a deep interest in behavioral psychology with cutting-edge LLM architectures, his core mission is to create technology that actively reduces cognitive load rather than adding to it.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Feedback Section */}
          <section id="feedback-section" className="relative py-24 px-4">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Share Your <span className="text-[#6E9EEB]">Expectations</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  What features would you like to see in <AppNamePlain />? Your input helps us build the best app for you.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {!suggestionSubmitted ? (
                  <form onSubmit={handleSuggestionSubmit} className="space-y-4">
                    <textarea
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      placeholder="I would love to see..."
                      className="w-full h-40 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#6E9EEB] resize-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingSuggestion}
                      className="w-full py-4 rounded-xl bg-[#6E9EEB]/90 hover:bg-[#6E9EEB] text-white font-semibold transition-all hover:shadow-[0_0_20px_rgba(110,158,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmittingSuggestion ? "Submitting..." : "Submit Your Suggestion"}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl border border-[#6E9EEB]/30 bg-[#6E9EEB]/5 text-center"
                  >
                    <CheckCircle2 className="w-12 h-12 text-[#6E9EEB] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Thank you!</h3>
                    <p className="text-muted-foreground">
                      Your suggestion has been recorded. We'll consider it when building <AppNamePlain />.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>

          {/* App Download Section */}
          <section className="relative py-24 px-4 bg-white/[0.02]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Get <AppNameColored /> on Your Device
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  Be among the first to experience decision-making made simple. Download on iOS when we launch!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all cursor-not-allowed opacity-70"
                  >
                    <Download className="w-5 h-5" />
                    <span>App Store</span>
                    <span className="text-xs text-muted-foreground ml-1">(Coming Soon)</span>
                  </button>

                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all cursor-not-allowed opacity-70"
                  >
                    <Globe className="w-5 h-5" />
                    <span>Google Play</span>
                    <span className="text-xs text-muted-foreground ml-1">(Coming Soon)</span>
                  </button>
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                  Join {displayCount.toLocaleString()}+ others on the waitlist
                </p>
              </motion.div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="relative py-24 px-4 bg-white/[0.02]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Frequently Asked <span className="text-[#6E9EEB]">Questions</span>
                </h2>
              </motion.div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-medium text-white">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-[#6E9EEB] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-muted-foreground">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="relative py-20 px-4 bg-gradient-to-t from-[#6E9EEB]/10 to-transparent">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Make Better Decisions?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Join thousands of others on the waitlist. Early access is limited.
                </p>
                {!isJoined && (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full sm:flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 outline-none focus:border-[#6E9EEB] transition-colors"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto whitespace-nowrap rounded-xl bg-[#6E9EEB] hover:bg-[#5a8bd6] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(110,158,235,0.4)] transition-all hover:shadow-[0_0_30px_rgba(110,158,235,0.6)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Joining..." : "Get early access →"}
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-green-400" />
                    <span>No spam</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6E9EEB]" />
                    <span>Early access</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Free forever</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="relative py-12 px-4 border-t border-white/10">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">
                    <AppNamePlain />
                  </span>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <a href="https://clariteeai.me/privacypolicy" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="https://clariteeai.me/terms" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>

                <p className="text-sm text-muted-foreground">
                  © 2026 Claritee. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
    </div>
  );
};

export default Index;
