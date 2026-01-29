import React, { useState } from 'react';
import { ExternalLink, Code2, Cpu, LayoutPanelLeft, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ProjectCategory = 'All' | 'WordPress & E-Commerce' | 'AI Agents & Automation' | 'SaaS Products' ;

interface SEOData {
  title: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  subtitle: string;
  cat: string;
  img: string;
  tech: string[];
  link: string;
  seo?: SEOData;
}

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  // Set default filter to 'WordPress & E-Commerce' as requested
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | string>('WordPress & E-Commerce');

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.cat === activeFilter);

  const filterOptions = ['All', 'WordPress & E-Commerce', 'AI Agents & Automation', 'SaaS Products'];

  return (
    <div className="w-full relative p-0 m-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8 md:mb-10 text-center md:text-left"
      >
        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[11px] font-black tracking-[0.3em] text-primary uppercase">Portfolio Showcase</span>
        </div>
        <h2 className="section-headline text-gunmetal capitalize">
          Check Out The <span className="text-primary italic drop-shadow-[0_10px_20px_rgba(108,99,255,0.4)]">Portfolio</span>
        </h2>
        <p className="text-[10px] font-black text-gunmetal/30 uppercase tracking-[0.2em] mt-2">Displaying {filteredProjects.length} Selected Projects</p>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-10">
        {filterOptions.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === cat ? 'bg-gunmetal text-white' : 'glass border-white/60 text-gunmetal/60 hover:text-primary'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, index) => (
            <motion.div 
              layout
              key={p.id} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-full"
            >
              {/* ✅ REMOVED: shadow-lg, hover:shadow-2xl, hover:shadow-primary/10 */}
              <div className="glass rounded-[40px] overflow-hidden bg-transparent border border-transparent h-full flex flex-col transition-all duration-500 hover:-translate-y-2">
                {/* ✅ IMAGE: No grayscale, no black shadow, always original color */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                  />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gunmetal group-hover:text-primary transition-colors">{p.title}</h3>
                    <div className="p-2 bg-primary/5 rounded-lg text-primary opacity-0 group-hover:opacity-100 transition-all">
                      <ExternalLink size={14} />
                    </div>
                  </div>
                  <p className="text-sm text-gunmetal/50 font-medium leading-relaxed mb-6 line-clamp-3">{p.subtitle}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-6">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">{p.cat}</span>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-gunmetal hover:text-primary transition-all">
                      Visit Site
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Portfolio;