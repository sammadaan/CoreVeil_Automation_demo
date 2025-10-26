
"use client";

import { testimonials as testimonialData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import AnimateOnScroll from './animate-on-scroll';

const testimonials = testimonialData.map((t, i) => {
  const placeholder = PlaceHolderImages.find(p => p.id === `testimonial-${i+1}`);
  return {
    quote: t.text,
    name: t.name,
    designation: t.business,
    src: placeholder?.imageUrl || `https://picsum.photos/seed/${i+1}/500/500`,
  }
});


export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll animationClass="animate-slide-in-up" className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-animate">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground">Real results from real businesses</p>
        </AnimateOnScroll>
        
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />

      </div>
    </section>
  );
}
