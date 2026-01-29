import React from 'react';
import { Code, Brain, CheckCircle, Eye, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { 
      label: "Computer Science", 
      icon: <Code size={20} />, 
      color: "text-[#6C63FF]", 
      bg: "bg-[#6C63FF]/10",
      border: "border-[#6C63FF]/20"
    },
    { 
      label: "AI Innovation", 
      icon: <Brain size={20} />, 
      color: "text-[#00F0FF]", 
      bg: "bg-[#00F0FF]/10",
      border: "border-[#00F0FF]/20"
    },
    { 
      label: "Real-World Solutions", 
      icon: <CheckCircle size={20} />, 
      color: "text-[#6C63FF]", 
      bg: "bg-[#6C63FF]/10",
      border: "border-[#6C63FF]/20"
    },
    { 
      label: "Keen Eye for Detail", 
      icon: <Eye size={20} />, 
      color: "text-[#00F0FF]", 
      bg: "bg-[#00F0FF]/10",
      border: "border-[#00F0FF]/20"
    },
  ];

  return (
    <div className="relative group">
      <div className="relative overflow-visible">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[#6C63FF]/5 blur-[100px] rounded-full -z-10"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#00F0FF]/5 blur-[100px] rounded-full -z-10"></div>

        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-16 items-stretch">
          <div className="relative order-2 md:order-1 h-full min-h-[300px] md:min-h-0">
            <div className="relative h-full flex justify-center">
              <div className="absolute inset-0 bg-[#6C63FF] blur-[50px] opacity-10 rounded-[60px] scale-90 translate-y-4"></div>
              
              <div className="relative z-10 w-full max-w-[300px] md:max-w-none h-full rounded-[40px] md:rounded-[60px] border-[1px] border-white/60 shadow-[0_30px_80px_-20px_rgba(108,99,255,0.15)] overflow-hidden transition-all duration-700 hover:scale-[1.01] bg-white/30 backdrop-blur-md">
                <img 
                  src="profile.jpg" 
                  alt="Iqra" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  onError={(e) => {
                    const target = e.target;
                    if (target instanceof HTMLImageElement) {
                      target.src = "https://res.cloudinary.com/dmdjur2bd/image/upload/v1769704173/hkhjg_q3wqjv.png";
                    }
                  }}
                />
              </div>  

              <div className="absolute -bottom-2 right-4 md:right-10 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-[20px] border border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center gap-3 z-20 animate-float">
                <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_12px_#00F0FF]"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gunmetal">Engineering Excellence</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 order-1 md:order-2 flex flex-col justify-center text-center md:text-left items-center md:items-start">
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="text-[#6C63FF]" size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6C63FF]">ABOUT ME</span>
              </div>
              
              <h2 className="section-headline text-gunmetal drop-shadow-[0_10px_20px_rgba(108,99,255,0.1)]">
                Where Logic Automates <span className="italic text-[#6C63FF]">Real Business.</span>
              </h2>
            </div>
            
            <div className="space-y-4 text-gunmetal/70 text-sm md:text-base leading-relaxed font-medium">
              <p>
                I am a Computer Science graduate and focused web developer dedicated to building robust, scalable systems. My strength lies in deep problem-solving: I don't just write code; I design solutions that solve real-world problems.
              </p>
              <p>
                With core expertise in Python, React, and PHP, I am actively expanding my skills in new AI technologies and Agentic workflows.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="group/tile p-4 rounded-[28px] border transition-all duration-500 cursor-default bg-white/40 backdrop-blur-md border-white/80 hover:bg-white/90 hover:-translate-y-1.5 flex flex-col items-center md:items-start text-center md:text-left shadow-sm"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform duration-500 group-hover/tile:scale-110 ${stat.bg} ${stat.color} border ${stat.border}`}>
                    {stat.icon}
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-wider text-gunmetal/80 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;