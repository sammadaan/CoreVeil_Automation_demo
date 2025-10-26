

import Image from 'next/image';
import Link from 'next/link';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
];

const legalItems = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10 bg-secondary rounded-lg flex items-center justify-center ring-1 ring-border overflow-hidden">
                  <Image src="/logo.jpg" alt="Coreveil Logo" width={40} height={40} className="object-cover" />
              </div>
              <span className="text-xl font-bold text-gradient-animate">Coreveil Automation</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Empowering businesses with intelligent AI solutions.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Pages</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Legal</h4>
              <ul className="space-y-2">
                {legalItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
                <h4 className="font-semibold text-foreground mb-3">Connect</h4>
                <ul className="space-y-2">
                    <li><a href="mailto:aseemmadaan9@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Email</a></li>
                    <li><a href="https://www.linkedin.com/in/aseem-9-madaan/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">LinkedIn</a></li>
                </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground/70">
          <p>© {new Date().getFullYear()} Coreveil Automations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
