import React from 'react';
import { Layers, ShoppingBag, Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const services = [
    {
      title: "Interactive Interfaces",
      desc: "Converting complex logic into clean, responsive, and pixel-perfect experiences using React, Bootstrap, and Modern CSS.",
      icon: <Layers size={32} />,
      color: "text-[#6C63FF]",
      glow: "hover:shadow-[0_20px_50px_rgba(108,99,255,0.2)]",
      border: "hover:border-[#6C63FF]/50",
      tags: ["React", "UI/UX", "Responsive"]
    },
    {
      title: "CMS & Brand Design",
      desc: "Building clean, professional websites and high-converting E-Commerce stores using WordPress and Elementor. I focus on design clarity and easy-to-manage systems.",
      icon: <ShoppingBag size={32} />,
      color: "text-[#00F0FF]",
      glow: "hover:shadow-[0_20px_50px_rgba(0,240,255,0.2)]",
      border: "hover:border-[#00F0FF]/50",
      tags: ["WordPress", "Elementor", "WooCommerce"]
    },
    {
      title: "Intelligent Automation",
      desc: "Integrating AI agents to automate business workflows. From smart chatbots to data-driven decision systems that save time and reduce error.",
      icon: <Brain size={32} />,
      color: "text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-[#6C63FF]",
      glow: "hover:shadow-[0_20px_50px_rgba(108,99,255,0.3)]",
      border: "border-[#6C63FF]/30",
      highlight: true,
      tags: ["AI Agents", "Automation", "SaaS Logic"]
    }
  ];

  return (
    <div className="w-full relative">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-[#6C63FF]/5 to-transparent blur-[120px] -z-10"></div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16 text-center md:text-left space-y-4 px-[2%]"
      >
        <div className="flex items-center justify-center md:justify-start gap-2">
          <Sparkles className="text-[#6C63FF]" size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6C63FF]">Technical Expertise</span>
        </div>
        <h2 className="section-headline text-gunmetal">
          Comprehensive <span className="text-primary italic drop-shadow-[0_10px_20px_rgba(108,99,255,0.4)]">Solution</span>
        </h2>
        <p className="text-sm md:text-lg text-gunmetal/50 font-medium max-w-2xl mx-auto md:mx-0">
          From high-performance frontend architecture to intelligent agentic automation.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 px-[2%]">
        {services.map((s, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`
              relative group glass-service-card p-10 lg:p-12 rounded-[50px] transition-all duration-500 
              hover:-translate-y-3 flex flex-col items-center md:items-start text-center md:text-left
              ${s.glow} border ${s.highlight ? 'border-[#6C63FF]/30 bg-white/50' : 'border-white/40 bg-white/40'}
              ${s.border}
            `}
          >
            {/* 3D Icon Container */}
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center mb-8 
              bg-white/60 shadow-[inset_0_2px_10px_rgba(255,255,255,1),0_10px_20px_rgba(0,0,0,0.05)]
              group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500
              ${s.highlight ? 'text-[#6C63FF]' : s.color}
            `}>
              {s.icon}
            </div>

            <h3 className="text-2xl font-bold text-gunmetal mb-4 tracking-tight">
              {s.title}
            </h3>
            
            <p className="text-gunmetal/60 text-sm md:text-base leading-relaxed font-medium mb-8 flex-grow">
              {s.desc}
            </p>

            {/* Tags Container */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {s.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-white/50 border border-white/80 text-[9px] font-black uppercase tracking-widest text-gunmetal/40 group-hover:text-gunmetal/70 transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            {/* Subtle Gradient Glow for Highlighted Card */}
            {s.highlight && (
              <div className="absolute -inset-px rounded-[50px] bg-gradient-to-br from-[#6C63FF]/20 via-transparent to-[#00F0FF]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10"></div>
            )}
          </motion.div>
        ))}
      </div>

      <style>{`
        .glass-service-card {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};

export default Services;