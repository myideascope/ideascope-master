import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { RocketIcon, Menu } from 'lucide-react';
import MobileMenu from './mobile-menu';

const Header: React.FC = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'How it Works', href: '/#process' },
    { label: 'Features', href: '/#features' },
    { label: 'Success Stories', href: '/#testimonials' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <RocketIcon className="h-6 w-6 text-primary mr-2" />
              <span className="font-heading font-bold text-lg text-neutral-800">IdeaScope</span>
            </Link>
          </div>
          
          {!isMobile && (
            <div className="flex items-center space-x-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.label}
                  href={item.href}
                  className="text-neutral-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
              
              <Link href="/evaluation">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
          
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        menuItems={menuItems} 
      />
    </header>
  );
};

export default Header;
