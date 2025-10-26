export interface MousePosition {
  x: number;
  y: number;
}

export interface DragonProps {
  mouse: MousePosition;
}

export interface FormData {
  name: string;
  email: string;
  business: string;
  services: string[];
  message: string;
}

export interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
  price: string;
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
}

export interface Testimonial {
  name: string;
  business: string;
  rating: number;
  text: string;
  image: string;
}

export interface Stat {
    icon: JSX.Element,
    label: string,
    value: string,
    suffix: string
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}
