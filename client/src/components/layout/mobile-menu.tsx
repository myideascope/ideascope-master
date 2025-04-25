import React from 'react';
import { Link } from 'wouter';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { RocketIcon, X } from 'lucide-react';

interface MenuItemProps {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItemProps[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, menuItems }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="flex justify-between items-center">
          <SheetTitle>
            <div className="flex items-center">
              <RocketIcon className="h-5 w-5 text-primary mr-2" />
              <span className="font-heading font-bold">StartupLaunch</span>
            </div>
          </SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>
        
        <div className="mt-8 flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link 
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="text-neutral-600 hover:text-primary px-3 py-2 rounded-md text-lg font-medium"
            >
              {item.label}
            </Link>
          ))}
          
          <div className="pt-4 mt-4 border-t border-neutral-200">
            <Link href="/evaluation" onClick={onClose}>
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
