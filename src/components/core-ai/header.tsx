
'use client';

import {
  Home,
  Info,
  Zap,
  Mail,
  Linkedin,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const navItems = [
  {
    title: 'Home',
    icon: <Home className='h-full w-full' />,
    href: '/',
  },
  {
    title: 'About',
    icon: <Info className='h-full w-full' />,
    href: '/about',
  },
  {
    title: 'Services',
    icon: <Zap className='h-full w-full' />,
    href: '/services',
  },
  {
    title: 'Contact',
    icon: <Mail className='h-full w-full' />,
    href: '/contact',
  },
  {
    title: 'LinkedIn',
    icon: <Linkedin className='h-full w-full' />,
    href: 'https://www.linkedin.com/in/aseem-9-madaan/',
  },
];

export default function Header() {
  return (
    <header className='fixed top-2 left-1/2 -translate-x-1/2 z-50'>
        <Dock className='items-end pb-3 glass-morphism'>
            <DockItem className='aspect-square rounded-full bg-transparent'>
                <DockLabel>Coreveil</DockLabel>
                <Link href="/" className="w-full h-full flex items-center justify-center text-muted-foreground hover:text-foreground">
                    <DockIcon>
                        <Image src="/logo.jpg" alt="Coreveil Logo" width={40} height={40} className="object-cover rounded-md" />
                    </DockIcon>
                </Link>
            </DockItem>
            {navItems.map((item, idx) => (
            <DockItem
                key={idx}
                className='aspect-square rounded-full bg-transparent'
            >
                <DockLabel>{item.title}</DockLabel>
                <Link href={item.href} target={item.title === 'LinkedIn' ? '_blank' : undefined} className="w-full h-full flex items-center justify-center text-muted-foreground hover:text-foreground">
                    <DockIcon>{item.icon}</DockIcon>
                </Link>
            </DockItem>
            ))}
        </Dock>
    </header>
  );
}
