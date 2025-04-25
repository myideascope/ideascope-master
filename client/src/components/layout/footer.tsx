import React from 'react';
import { Link } from 'wouter';
import { RocketIcon, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <RocketIcon className="h-6 w-6 text-primary-400 mr-2" />
              <span className="font-heading font-bold text-lg">StartupLaunch</span>
            </div>
            <p className="mt-4 text-base text-neutral-300">
              Helping entrepreneurs transform ideas into investor-ready businesses.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-neutral-400 hover:text-neutral-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-300">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">Platform</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/#process" className="text-base text-neutral-300 hover:text-white">How it Works</Link></li>
                <li><Link href="/#features" className="text-base text-neutral-300 hover:text-white">Features</Link></li>
                <li><Link href="/#" className="text-base text-neutral-300 hover:text-white">Pricing</Link></li>
                <li><Link href="/#testimonials" className="text-base text-neutral-300 hover:text-white">Success Stories</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-neutral-300 hover:text-white">Startup Guide</Link></li>
                <li><Link href="#" className="text-base text-neutral-300 hover:text-white">Business Templates</Link></li>
                <li><Link href="#" className="text-base text-neutral-300 hover:text-white">Investor Database</Link></li>
                <li><Link href="#" className="text-base text-neutral-300 hover:text-white">Learning Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-neutral-300 hover:text-white">About Us</Link></li>
                <li><Link href="#" className="text-base text-neutral-300 hover:text-white">Contact</Link></li>
                <li><Link href="#" className="text-base text-neutral-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="text-base text-neutral-300 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-neutral-700 pt-8">
          <p className="text-base text-neutral-400 text-center">
            &copy; {new Date().getFullYear()} StartupLaunch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
