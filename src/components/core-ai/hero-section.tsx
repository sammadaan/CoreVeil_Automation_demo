import { ArrowRight, Rocket, Phone } from 'lucide-react';
import Link from 'next/link';
import FloatingCard from './floating-card';
import { stats } from '@/lib/data';
import AnimateOnScroll from './animate-on-scroll';
import { Button } from '@/components/ui/button';
import TypingAnimation from './typing-animation';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 md:pt-20">
      <div className="max-w-6xl mx-auto text-center z-10">
        <AnimateOnScroll animationClass="animate-scale-in">
          <div className="inline-block mb-8 px-4 py-2 bg-secondary/50 border border-secondary rounded-full">
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-blue-400" />
              <span className="text-foreground font-semibold">Transform Your Business with AI</span>
            </div>
          </div>
        </AnimateOnScroll>
        
        <div className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <TypingAnimation
                lines={[
                    { text: "Automate Everything.", className: "block text-gradient-animate" },
                    { text: "Focus on Growth.", className: "block text-white mt-2" }
                ]}
            />
        </div>
        
        <AnimateOnScroll animationClass="animate-slide-in-up" delay={200}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            We help Indian businesses deploy AI voice agents, chatbots, and workflow automations 
            that save time, capture leads, and boost revenue.
          </p>
        </AnimateOnScroll>
        
        <AnimateOnScroll animationClass="animate-slide-in-up" delay={300}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button asChild size="lg" className="group relative px-8 py-4 overflow-hidden rounded-xl font-semibold text-background bg-foreground hover:bg-foreground/90 transition-all duration-300 hover-lift">
              <Link href="/contact">
                Get Free Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group relative px-8 py-4 overflow-hidden rounded-xl font-semibold text-foreground hover:bg-accent/50 transition-all duration-300 hover-lift">
              <Link href="https://cal.com/coreveil" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5 mr-2" />
                Get a Call
              </Link>
            </Button>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <AnimateOnScroll key={i} animationClass="animate-scale-in" delay={400 + i * 100}>
              <FloatingCard delay={i * 0.2}>
                <div className="group p-6 glass-morphism rounded-2xl hover:bg-secondary/50 transition-all hover-lift cursor-pointer h-full">
                  <div className="flex justify-center mb-3 text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-gradient-animate mb-2">
                    {stat.value}
                    <span className="text-2xl">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </FloatingCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-1 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
