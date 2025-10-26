"use client";

import { useState } from 'react';
import { Mail, Linkedin, Check, Phone } from 'lucide-react';
import Link from 'next/link';
import type { FormData } from '@/lib/types';
import { services as serviceOptions } from '@/lib/data';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// 1. Import your configured Supabase client
import { supabase } from '@/lib/supabaseClient'; 

const contactLinks = [
  { 
    icon: <Mail className="w-6 h-6" />, 
    label: "Email", 
    value: "aseemmadaan9@gmail.com", 
    href: "mailto:aseemmadaan9@gmail.com",
    color: "blue"
  },
  { 
    icon: <Linkedin className="w-6 h-6" />, 
    label: "LinkedIn", 
    value: "Connect with Aseem", 
    href: "https://www.linkedin.com/in/aseem-9-madaan/",
    color: "blue"
  }
];

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', business: '', services: [], message: ''
  });
  const [status, setStatus] = useState<string | null>(null);
  const { toast } = useToast();

  const handleServiceToggle = (serviceTitle: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceTitle)
        ? prev.services.filter(s => s !== serviceTitle)
        : [...prev.services, serviceTitle]
    }));
  };

  // 2. The handleSubmit function is now async to await the Supabase call
  const handleSubmit = async () => {
    // --- Validation remains the same ---
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email).",
        variant: "destructive",
      })
      setStatus('Please fill in all required fields');
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setStatus('sending');

    // 3. Try/Catch block to handle the database operation
    try {
      const submission = {
        name: formData.name,
        email: formData.email,
        business: formData.business || null, // Use null for empty optional fields
        services: formData.services,
        message: formData.message || null,   // Use null for empty optional fields
      };
      
      // 4. Insert the form data into the 'leads' table in Supabase
      const { error } = await supabase.from('leads').insert([submission]);

      // Handle any errors from Supabase
      if (error) {
        throw error;
      }

      // --- Success Case ---
      toast({
        title: "Message Sent!",
        description: "Thanks! We'll reach out within 24 hours.",
        className: "bg-green-600 border-green-600 text-white"
      });
      setStatus('sent');
      setFormData({ name: '', email: '', business: '', services: [], message: '' }); // Reset form
      setTimeout(() => setStatus(null), 5000);

    } catch (error) {
      // --- Error Case ---
      console.error('Error submitting to Supabase:', error);
      toast({
        title: "Submission Error",
        description: "Sorry, something went wrong. Please try again later.",
        variant: "destructive",
      });
      setStatus('Could not send message.');
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-animate">Let's Automate Your Business</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Tell us what you need, and we'll build the perfect AI solution
          </p>
        </div>

        <div className="relative">
          <div className="relative p-8 md:p-12 bg-secondary/30 border border-border rounded-3xl">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">Your Name *</label>
                  <Input id="name" type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-background/70 border-border focus:border-blue-500 focus:ring-blue-500/50" placeholder="Rahul Sharma" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">Email *</label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-background/70 border-border focus:border-blue-500 focus:ring-blue-500/50" placeholder="rahul@example.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <label htmlFor="business" className="block text-sm font-medium mb-2 text-muted-foreground">Business Name</label>
                  <Input id="business" type="text" value={formData.business} onChange={(e) => setFormData({...formData, business: e.target.value})} className="bg-background/70 border-border focus:border-blue-500 focus:ring-blue-500/50" placeholder="Your Business Name" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-muted-foreground">Services You Need</label>
                <div className="space-y-3">
                  {serviceOptions.map((service, index) => (
                    <label key={index} className={`flex items-center gap-4 p-4 bg-background/70 border border-border rounded-xl cursor-pointer transition-all hover-lift ${formData.services.includes(service.title) ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}>
                      <input type="checkbox" checked={formData.services.includes(service.title)} onChange={() => handleServiceToggle(service.title)} className="hidden" />
                      <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${formData.services.includes(service.title) ? 'bg-blue-500 border-blue-500' : 'border-muted-foreground'}`}>
                        {formData.services.includes(service.title) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="flex-1 font-medium">{service.title}</span>
                      <span className="text-sm text-muted-foreground">{service.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">Additional Details</label>
                <Textarea id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} className="bg-background/70 border-border focus:border-blue-500 focus:ring-blue-500/50 resize-none" placeholder="Tell us about your business needs..." />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* 5. The onClick handler now calls the new async handleSubmit */}
                <Button onClick={handleSubmit} size="lg" className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold transition-all hover-lift flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 text-white">
                  <Mail className="w-5 h-5" /> Send Message
                </Button>
                <Button size="lg" variant="outline" asChild className="flex-1 py-4 rounded-xl font-semibold transition-all hover-lift flex items-center justify-center gap-2 text-white">
                  <Link href="https://cal.com/coreveil" target="_blank" rel="noopener noreferrer">
                    <Phone className="w-5 h-5" /> Get a Call
                  </Link>
                </Button>
              </div>

              {status && (
                <div className={`text-center font-semibold animate-slide-in-up ${status === 'sending' ? 'text-blue-400' : status === 'sent' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {status === 'sending' ? '⏳ Sending...' : status === 'sent' ? '' : `⚠️ ${status}`}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {contactLinks.map((contact, i) => (
            <a key={i} href={contact.href} target={contact.label === 'LinkedIn' ? '_blank' : undefined} rel={contact.label === 'LinkedIn' ? 'noopener noreferrer' : undefined} className="group p-6 bg-secondary/30 border border-border rounded-2xl transition-all hover-lift flex items-center gap-4 hover:bg-secondary/70">
              <div className={`w-12 h-12 bg-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <div className={`text-${contact.color}-400`}>{contact.icon}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{contact.label}</div>
                <div className="font-semibold">{contact.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}