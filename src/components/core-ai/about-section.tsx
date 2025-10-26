import { Globe, Shield, Award, BarChart3, Brain, Cpu, Zap } from 'lucide-react';
import AnimateOnScroll from '@/components/core-ai/animate-on-scroll';

const whyChooseUs = [
  { icon: <Globe className="w-6 h-6" />, title: "Local Expertise", desc: "Solutions designed for Indian market needs" },
  { icon: <Shield className="w-6 h-6" />, title: "100% Secure", desc: "Your data stays safe with enterprise-grade security" },
  { icon: <Award className="w-6 h-6" />, title: "Proven Results", desc: "100+ businesses automated successfully" },
  { icon: <BarChart3 className="w-6 h-6" />, title: "ROI Focused", desc: "See returns from day one of implementation" }
];

const visualStats = [
    { icon: <Brain className="w-8 h-8" />, label: "AI Powered" },
    { icon: <Cpu className="w-8 h-8" />, label: "Smart Tech" },
    { icon: <Zap className="w-8 h-8" />, label: "Fast Setup" },
    { icon: <Shield className="w-8 h-8" />, label: "Secure" }
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <AnimateOnScroll animationClass="animate-slide-in-left" className="w-full">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient-animate">Why Choose Coreveil Automation?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We're not just another automation agency. We understand Indian businesses 
                and build solutions that actually work for your customers.
              </p>
            </AnimateOnScroll>
            
            <div className="space-y-6">
              {whyChooseUs.map((item, i) => (
                <AnimateOnScroll
                  key={i}
                  animationClass="animate-slide-in-left"
                  delay={i * 100}
                >
                  <div className="flex gap-4 items-start p-4 bg-secondary/40 rounded-xl hover:bg-secondary/80 transition-all border border-border">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="text-blue-400">{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          <div className="relative">
            <AnimateOnScroll animationClass="animate-scale-in">
              <div className="relative">
                <div className="relative bg-secondary/40 border border-border rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {visualStats.map((item, i) => (
                      <AnimateOnScroll 
                        key={i}
                        animationClass="animate-scale-in"
                        delay={i * 100}
                        className="w-full"
                      >
                        <div className="p-6 bg-accent rounded-xl text-center hover:bg-accent/70 transition-all hover-lift border border-border">
                          <div className="text-blue-400 mb-2 flex justify-center">{item.icon}</div>
                          <div className="text-sm font-medium">{item.label}</div>
                        </div>
                      </AnimateOnScroll>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
