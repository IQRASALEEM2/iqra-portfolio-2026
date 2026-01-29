
import React from 'react';
import { 
  Globe, 
  Cpu, 
  Atom, 
  Terminal, 
  Database, 
  Zap, 
  Code, 
  Palette, 
  Grid, 
  Heart, 
  Bot 
} from 'lucide-react';

const skills = [
  { name: 'HTML5', icon: <Code size={18} /> },
  { name: 'CSS3', icon: <Palette size={18} /> },
  { name: 'JavaScript', icon: <Zap size={18} /> },
  { name: 'React', icon: <Atom size={18} /> },
  { name: 'Python', icon: <Terminal size={18} /> },
  { name: 'PHP', icon: <Database size={18} /> },
  { name: 'WordPress', icon: <Globe size={18} /> },
  { name: 'Bootstrap', icon: <Grid size={18} /> },
  { name: 'Loveable.dev', icon: <Heart size={18} /> },
  { name: 'AI Agents', icon: <Bot size={18} />, special: true },
];

const TechMarquee: React.FC = () => {
  // Triple the items for extra smooth long duration loop
  const marqueeItems = [...skills, ...skills, ...skills];

  return (
    <div className="w-full bg-transparent overflow-hidden relative select-none">
      <div className="flex animate-marquee gap-6 md:gap-10 whitespace-nowrap py-4 md:py-8">
        {marqueeItems.map((skill, idx) => (
          <div 
            key={idx}
            className={`
              relative flex items-center gap-4 md:gap-5 px-6 md:px-10 py-4 md:py-6 rounded-[24px] md:rounded-[32px] glass 
              border-white/40 transition-all duration-700 hover:scale-105 min-w-fit
              ${skill.special 
                ? 'bg-primary/5 border-primary/20 shadow-[0_40px_100px_-15px_rgba(108,99,255,0.18),0_20px_40px_-20px_rgba(108,99,255,0.05)]' 
                : 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.04),0_15px_40px_-20px_rgba(0,0,0,0.02)] hover:shadow-[0_45px_90px_-20px_rgba(0,0,0,0.08)]'
              }
            `}
          >
            {/* AI Agent Status Indicator */}
            <div className="absolute top-3 right-5 flex items-center gap-1.5">
               <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${skill.special ? 'bg-primary shadow-[0_0_12px_rgba(108,99,255,0.6)]' : 'bg-gunmetal/10'}`}></div>
               <span className="text-[6px] font-black uppercase tracking-widest opacity-20">v2.0</span>
            </div>

            {/* Icon Wrapper */}
            <div className={`
              w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500
              ${skill.special 
                ? 'bg-primary text-white scale-110 shadow-[0_10px_20px_rgba(108,99,255,0.2)]' 
                : 'bg-white/60 text-primary shadow-sm'
              }
            `}>
              {skill.icon}
            </div>

            {/* Text Content */}
            <div className="flex flex-col">
              <span className={`
                text-[9px] md:text-[11px] font-black tracking-widest uppercase
                ${skill.special ? 'text-primary' : 'text-gunmetal/70'}
              `}>
                {skill.name}
              </span>
              <span className="text-[6px] md:text-[7px] font-bold opacity-30 uppercase tracking-[0.2em] -mt-0.5">
                {skill.special ? 'Autonomous' : 'Module Active'}
              </span>
            </div>

            {/* Subtle Inner Glow */}
            <div className={`absolute inset-0 rounded-[32px] pointer-events-none opacity-[0.02] bg-gradient-to-br ${skill.special ? 'from-primary via-transparent to-transparent' : 'from-white to-transparent'}`}></div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .glass {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
};

export default TechMarquee;
