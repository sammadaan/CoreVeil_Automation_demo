
"use client";

import { useState } from 'react';
import { services } from '@/lib/data';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AnimateOnScroll from './animate-on-scroll';

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll animationClass="animate-slide-in-up">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-animate">Our AI Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect automation package for your business needs
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimateOnScroll key={index} animationClass='animate-scale-in' delay={index * 100}>
              <div
                className="group relative"
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className={`absolute -inset-0.5 rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt`} 
                     style={{ background: service.title === 'AI WhatsApp & Chat Automation' ? `linear-gradient(to right, #25D366, #128C7E)` : `linear-gradient(to right, ${service.gradientFrom}, ${service.gradientTo})`}}></div>
                <div className={`relative h-full p-8 bg-secondary/40 border border-border rounded-3xl transition-all duration-300 flex flex-col`}>

                  <div className={`relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-md bg-accent`}>
                    <div className="text-white">{service.icon}</div>
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-4 ${service.title === 'AI WhatsApp & Chat Automation' ? 'text-[#25D366]' : 'text-gradient-animate'}`}>{service.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10">
                          <Check className="w-3 h-3 text-background" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6 border-t border-border mt-auto">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-3xl font-bold">{service.price}</span>
                      <span className="text-sm text-muted-foreground">per project</span>
                    </div>
                    <Link 
                      href="/contact"
                      className="group/button inline-flex items-center justify-center w-full py-3 rounded-xl text-center font-semibold transition-all hover:scale-105 shadow-lg text-white"
                      style={{ background: service.title === 'AI WhatsApp & Chat Automation' ? `linear-gradient(to right, rgb(168 85 247), rgb(219 39 119))` : `linear-gradient(to right, ${service.gradientFrom}, ${service.gradientTo})` }}
                    >
                      Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
