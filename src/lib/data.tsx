import {
  MessageSquare,
  Bot,
  Zap,
  Clock,
  TrendingUp,
  Users,
  Star,
} from 'lucide-react';
import type { Service, Testimonial, Stat } from './types';

const WhatsAppIcon = () => (
  <svg
    className="w-12 h-12 text-[#25D366]"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.76.46 3.42 1.28 4.88L2 22l5.27-1.38c1.41.79 3.03 1.25 4.77 1.25h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zM12.05 20.15h-.01c-1.55 0-3.05-.44-4.34-1.25L7.5 18.8l-3.3 1.1.8-3.4-.2-.2c-.88-1.47-1.4-3.16-1.4-4.95 0-4.5 3.65-8.15 8.15-8.15 2.22 0 4.29.86 5.76 2.34 1.48 1.47 2.34 3.54 2.34 5.76-.01 4.5-3.66 8.15-8.16 8.15zm4.83-6.13c-.26-.13-1.56-.77-1.8-0.87-.24-.09-.42-.13-.59.13-.17.26-.68.87-.83 1.04s-.3.18-.56.06c-1.02-.49-1.92-1.15-2.62-2.12-.54-.76-.04-1.11.08-1.24.11-.12.24-.3.36-.42.12-.13.16-.21.24-.36.08-.15.04-.28-.02-.38-.06-.1-.59-1.42-.81-1.95-.21-.52-.43-.45-.58-.45-.14 0-.3 0-.46 0-.16 0-.42.06-.64.3.22.24-.87 1.04-0.87 2.54s.9 2.95 1.02 3.15c.12.2.18.66.86 1.39.96 1.02 1.63 1.32 2.18 1.57.88.39 1.2.31 1.63.19.48-.14 1.56-.64 1.78-1.26.22-.62.22-1.15.16-1.26-.06-.11-.24-.18-.5-.31z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);


export const services: Service[] = [
  {
    icon: <Zap className="w-12 h-12" />,
    title: "Business Process Automation",
    description: "Automate daily workflows - invoicing, feedback collection, CRM syncing, and data management to save hours every day.",
    features: ["Auto Invoicing", "CRM Integration", "Workflow Automation", "Time Saving"],
    price: "₹5k - ₹15k",
    gradient: "from-purple-500 to-pink-600",
    gradientFrom: "rgb(168 85 247)",
    gradientTo: "rgb(219 39 119)",
    shadowColor: "shadow-purple-500/50",
  },
  {
    icon: <WhatsAppIcon />,
    title: "AI WhatsApp & Chat Automation",
    description: "Build intelligent WhatsApp and website bots that answer FAQs, take orders, handle bookings, and collect leads automatically.",
    features: ["24/7 Customer Support", "Lead Collection", "Order Management", "Smart Responses"],
    price: "₹15k - ₹20k",
    gradient: "from-green-500 to-emerald-600",
    gradientFrom: "#25D366",
    gradientTo: "#128C7E",
    shadowColor: "shadow-green-500/50",
  },
  {
    icon: <Bot className="w-12 h-12" />,
    title: "AI Voice Call Agents",
    description: "Deploy AI voice agents that call leads, confirm orders, collect feedback, and book appointments with natural conversations.",
    features: ["Order Confirmation", "Feedback Collection", "Appointment Booking", "Human-like Voice"],
    price: "₹25k - ₹40k",
    gradient: "from-blue-500 to-cyan-600",
    gradientFrom: "rgb(59 130 246)",
    gradientTo: "rgb(8 145 178)",
    shadowColor: "shadow-blue-500/50",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    business: "Kumar Electronics",
    rating: 5,
    text: "Our WhatsApp bot handles 200+ customer queries daily. Sales increased by 40% in just 2 months!",
    image: "RK"
  },
  {
    name: "Priya Sharma",
    business: "Sharma Boutique",
    rating: 5,
    text: "The AI voice agent books appointments perfectly. We save 4 hours daily on phone calls now.",
    image: "PS"
  },
  {
    name: "Amit Patel",
    business: "Patel Industries",
    rating: 5,
    text: "Invoice automation changed our business. What took 5 hours now takes 30 minutes!",
    image: "AP"
  }
];

export const stats: Stat[] = [
  { icon: <Clock className="w-8 h-8" />, label: "Hours Saved Daily", value: "3-5", suffix: "hrs" },
  { icon: <TrendingUp className="w-8 h-8" />, label: "Lead Conversion", value: "70", suffix: "%" },
  { icon: <Users className="w-8 h-8" />, label: "Happy Clients", value: "100", suffix: "+" },
  { icon: <Star className="w-8 h-8" />, label: "Client Rating", value: "4.9", suffix: "/5" }
];
