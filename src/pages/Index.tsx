import React, { useState, useEffect } from "react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
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
  Mail,
  Globe,
  Star,
  ArrowRight
} from "lucide-react";

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
    content: "Clarity.ai helped me decide between two job offers. The trade-off analysis was incredibly insightful!",
    rating: 5
  },
  {
    name: "Marcus Johnson",
    role: "Startup Founder",
    content: "I was stuck on a major business decision for weeks. Clarity.ai gave me clarity in minutes.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Software Engineer",
    description: "The nine-step framework is brilliant. It feels like having a personal decision coach.",
    rating: 5
  }
];

const faqs = [
  {
    question: "When will Clarity.ai be available?",
    answer: "We're aiming for early access in Q2 2026. Join the waitlist to get notified first!"
  },
  {
    question: "What platforms will Clarity.ai support?",
    answer: "Clarity.ai will be available on iOS first, with Android and web versions coming later."
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
  const [showSplash, setShowSplash] = useState(true);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [donationAmount, setDonationAmount] = useState(45);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    if (!country) {
      toast.error("Please select a country.");
      return;
    }

    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 600));

    const { error } = await supabase.from("waitlist").insert({ 
      email: trimmed,
      country: country
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
          className="bg-void"
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
                    className="relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md shadow-2xl"
                  >
                    <div className="flex w-full flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/10 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full sm:w-[55%] bg-transparent px-4 py-3 text-sm text-primary-foreground placeholder:text-muted-foreground/50 outline-none"
                      />
                      <CountrySelect value={country} onChange={setCountry} />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full whitespace-nowrap rounded-xl bg-[#6E9EEB]/90 hover:bg-[#6E9EEB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(110,158,235,0.4)] transition-all hover:shadow-[0_0_30px_rgba(110,158,235,0.6)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Joining..." : "Join Waitlist →"}
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
                  Why <span className="text-[#6E9EEB]">Clarity.ai</span>?
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
                  Early testers love Clarity.ai
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
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                  Get <span className="text-[#6E9EEB]">Clarity.ai</span> on Your Device
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
                  Join {Math.floor(Math.random() * 500 + 1200)}+ others on the waitlist
                </p>
              </motion.div>
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
                  <Heart className="w-8 h-8 text-[#6E9EEB] fill-[#6E9EEB]/30" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Support Clarity.ai
                  </h2>
                </div>
                
                <p className="text-muted-foreground text-center mb-8 text-lg">
                  I need money to publish this app in Apple's App Store and to pay for Apple's Developer Program. 
                  Your support helps bring Clarity.ai to life!
                </p>

                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white font-medium">${donationAmount} raised</span>
                    <span className="text-muted-foreground">Goal: ${GOAL_AMOUNT}</span>
                  </div>
                  <div className="h-6 rounded-full bg-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full bg-[#6e9eeb]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progressPercentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    {progressPercentage.toFixed(0)}% funded
                  </p>
                </div>

                <div className="flex justify-center">
                  <button 
                    disabled
                    className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-[#6E9EEB] hover:bg-[#5a8bd6] text-white font-semibold text-lg transition-all shadow-[0_0_20px_rgba(110,158,235,0.4)] hover:shadow-[0_0_30px_rgba(110,158,235,0.6)] cursor-not-allowed opacity-70"
                  >
                    <Heart className="w-5 h-5 fill-white" />
                    <span>Donate with Stripe</span>
                  </button>
                </div>
                
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Stripe payment link coming soon
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

          {/* Footer */}
          <footer className="relative py-12 px-4 border-t border-white/10">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">
                    Clarity<span className="text-[#6E9EEB]">.ai</span>
                  </span>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  © 2026 Clarity.ai. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
