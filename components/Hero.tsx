
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Terminal, Cpu, Atom, Globe } from 'lucide-react';

interface HeroProps {
  onExploreAI?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreAI }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const x = (clientX - innerWidth / 2) / 60;
    const y = (clientY - innerHeight / 2) / 60;
    
    setTilt({ x, y });
  };

  const skills = [
    { 
      name: 'WordPress Ecosystem', 
      subtitle: 'Commercial Sites & E-Commerce',
      icon: <Globe size={20} strokeWidth={2} /> 
    },
    { 
      name: 'Python Architecture', 
      subtitle: 'Scalable Backend Systems',
      icon: <Cpu size={20} strokeWidth={2} /> 
    },
    { 
      name: 'React Framework', 
      subtitle: 'Modern Interactive Web Apps',
      icon: <Atom size={20} strokeWidth={2} /> 
    },
    { 
      name: 'AI Agents & LLMs', 
      subtitle: 'Intelligent Automation Workflows',
      icon: <Terminal size={20} strokeWidth={2} /> 
    }
  ];

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="relative flex items-center justify-center pt-4 md:pt-[0.1%] pb-0 overflow-visible min-h-fit"
    >
      {/* Top Background Blob */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] orb bg-gradient-to-b from-primary/30 via-secondary/20 to-transparent transition-transform duration-1000 ease-out" 
        style={{ transform: `translate(${-50 + tilt.x * 0.5}%, ${tilt.y * 0.5}px)` }}
      ></div>

      {/* BLEND BLOB: Bottom Background Blob to merge with Marquee */}
      <div 
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] orb bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-40 blur-[120px]"
      ></div>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto px-[4%] grid md:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10 pb-0">
        
        {/* Left Content */}
        <div className="space-y-6 md:space-y-8 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-white/60">
            <Sparkles size={14} className="text-primary" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-gunmetal/70">Iqra's portfolio 2026</span>
          </div>

          <h1 className="text-[50px] md:text-[50px] font-black text-gunmetal leading-[1.1] tracking-tight break-words max-w-full">
            Building Smarter <br />
            <span className="text-primary italic">Digital Systems.</span>
          </h1>

          <p className="text-base md:text-lg text-gunmetal/60 font-medium leading-relaxed max-w-xl">
            I don't just build websites; I engineer intelligent, agentic systems. A Full-Stack Developer & Digital Creator merging clean code with the future of automation.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
            <a href="#portfolio" className="px-8 py-4 rounded-[20px] bg-gunmetal text-white font-bold uppercase tracking-widest text-[11px] shadow-2xl shadow-gunmetal/20 hover:scale-105 transition-all flex items-center gap-2">
              View My Portfolio <ArrowRight size={16} />
            </a>
            <button 
              onClick={onExploreAI}
              className="px-8 py-4 rounded-[20px] glass text-gunmetal font-bold uppercase tracking-widest text-[11px] border border-white/40 hover:bg-white/60 transition-all"
            >
              Explore AI Solutions
            </button>
          </div>
        </div>

        {/* Right Content - 3D Composition */}
        <div className="relative flex items-center justify-center md:justify-end py-12 md:pb-0">
          <div 
            className="glass pt-10 pb-10 pl-10 pr-4 md:pr-4 rounded-[50px] w-full max-w-[400px] transition-transform duration-200 ease-out animate-float relative z-10"
            style={{ 
              transform: `perspective(1000px) rotateX(${-tilt.y * 0.8}deg) rotateY(${tilt.x * 0.8}deg)`,
              boxShadow: '0 40px 100px -20px rgba(0,0,0,0.08)'
            }}
          >
            <div className="mb-8 pl-1 text-left">
              <h2 className="text-[14px] font-bold text-gunmetal tracking-tight uppercase">CORE SKILLS</h2>
              <p className="text-[11px] text-gunmetal/40 font-medium mt-1">The technologies I use to build your solutions.</p>
            </div>

            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-6 group">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                    {skill.icon}
                  </div>
                  <div className="flex-1 min-w-0 pr-2 text-left">
                    <h3 className="text-[13px] font-bold text-gunmetal tracking-tight">
                      {skill.name}
                    </h3>
                    <p className="text-[10px] text-gunmetal/50 font-medium tracking-tight">
                      {skill.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute -top-4 -right-4 w-12 h-12 glass rounded-2xl border border-white flex items-center justify-center text-primary shadow-lg rotate-12">
               <Cpu size={24} />
            </div>
          </div>
          
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] glass rounded-[50px] -z-1 opacity-20"
            style={{ 
              transform: `perspective(1000px) rotateX(${-tilt.y * 0.4}deg) rotateY(${tilt.x * 0.4}deg) translateZ(-50px) translate(15px, 15px)`,
            }}
          ></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
