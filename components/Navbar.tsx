
import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate?: (view: 'home' | 'ai-solutions' | 'admin') => void;
  // Added 'blog-detail' to currentView to fix type error in App.tsx (line 226)
  currentView?: 'home' | 'ai-solutions' | 'admin' | 'blog-detail';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);

  type NavItem = { label: string; href: string; view: 'home' };

  const navItems: NavItem[] = [
    { label: 'Home', href: '#home', view: 'home' },
    { label: 'About Me', href: '#about', view: 'home' },
    { label: 'Services', href: '#services', view: 'home' },
    { label: 'Portfolio', href: '#portfolio', view: 'home' },
    { label: 'Testimonials', href: '#reviews', view: 'home' },
    { label: 'Articals', href: '#blog', view: 'home' },
  ];

  const handleLinkClick = (e: React.MouseEvent, item: NavItem) => {
    if (onNavigate) {
      if (currentView !== 'home' && item.view === 'home') {
        onNavigate('home');
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-[5%] py-2 md:py-4 z-[100] transition-all duration-300">
      <div className="glass rounded-[24px] md:rounded-3xl px-6 md:px-8 py-3 md:py-4 flex items-center justify-between relative shadow-sm border-white/50">
        {/* Logo */}
        <div 
          className="text-lg md:text-xl font-black tracking-tighter text-gunmetal cursor-pointer"
          onClick={() => onNavigate?.('home')}
        >
          <a href="#home" onClick={(e) => handleLinkClick(e, navItems[0])}>
            Dev.<span className="text-primary">IQRA</span>
          </a>
        </div>

        {/* Desktop Navigation - Only Home */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={(e) => handleLinkClick(e, item)}
              className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-all ${
                currentView === 'home'
                ? 'text-primary' 
                : 'text-gunmetal/60 hover:text-primary'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions (AI Labs + Mobile Toggle) */}
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, { label: 'Contact', href: '#contact', view: 'home' })}
            className="hidden sm:flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all glass text-gunmetal hover:bg-white/60"
          >
            <MessageCircle size={14} className="text-primary" />
            Contact Us
          </a>

          {/* Hamburger Icon */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-white/60 text-gunmetal shadow-sm hover:shadow-md transition-all active:scale-90"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full right-0 mt-2 w-[260px] bg-white rounded-[32px] p-5 lg:hidden flex flex-col gap-2 shadow-2xl border border-gray-100 z-50 origin-top-right"
            >
              <div className="p-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-4 px-3">Navigation</p>
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a 
                      key={item.label} 
                      href={item.href} 
                      onClick={(e) => handleLinkClick(e, item)}
                      className="px-4 py-3.5 text-[12px] font-extrabold uppercase tracking-[0.05em] text-black hover:text-primary hover:bg-gray-50 rounded-2xl transition-all"
                    >
                      {item.label}
                    </a>
                  ))}

                  <a
                    href="#contact"
                    onClick={(e) => handleLinkClick(e, { label: 'Contact', href: '#contact', view: 'home' })}
                    className="mt-1 w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-primary/10 text-primary text-[12px] font-black uppercase tracking-widest border border-primary/20"
                  >
                    <MessageCircle size={18} />
                    Contact Us
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
