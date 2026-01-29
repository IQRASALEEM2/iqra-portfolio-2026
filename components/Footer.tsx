
import React from 'react';

const Footer: React.FC = () => {
  const sections = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <footer className="w-full pt-20 pb-16 bg-white/30 backdrop-blur-sm border-t border-white/50 relative mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-black tracking-tighter text-gunmetal mb-4">
              Dev.<span className="text-primary">IQRA</span>
            </h3>
            <p className="text-sm text-gunmetal/50 font-medium max-w-sm">
              Architecting intelligent digital ecosystems and high-performance web experiences.
            </p>
          </div>

          {/* Quick Links / IDs Section */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
            {sections.map((section) => (
              <a 
                key={section.id} 
                href={`#${section.id}`}
                className="group flex flex-col items-center md:items-end"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-gunmetal/40 group-hover:text-primary transition-colors">
                  {section.name}
                </span>
                <span className="text-[8px] font-bold text-primary/40 group-hover:text-primary/80 transition-colors">
                  #{section.id}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center gap-6 border-t border-gunmetal/5 pt-12">
          {/* Copyright Subtitle */}
          <div className="space-y-2">
            <p className="text-[10px] md:text-[11px] font-black text-gunmetal/60 uppercase tracking-[0.4em]">
              © 2026 IQRA SALEEM — DIGITAL ARCHITECT
            </p>
            <p className="text-[9px] text-gunmetal/30 font-bold uppercase tracking-widest">
              Built with precision & intelligence
            </p>
          </div>

          {/* Minimalist Visual Accents */}
          <div className="flex items-center justify-center gap-1.5 opacity-20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gunmetal"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
