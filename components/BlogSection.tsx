
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, Clock, PlusCircle } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  desc: string;
  cat: string;
  img: string;
  date: string;
  tags: string[];
}

interface BlogSectionProps {
  blogs: Blog[];
  onReadMore: (blog: Blog) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ blogs, onReadMore }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const visibleBlogs = blogs.slice(0, visibleCount);

  return (
    <div className="w-full relative">
      <div className="mb-16 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
          <Sparkles className="text-primary" size={18} />
          <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-primary">The Insight Hub</span>
        </div>
        <h2 className="section-headline text-gunmetal leading-tight">
          Exploring the future of <br />
          <span className="italic text-primary drop-shadow-sm">Digital Intelligence.</span>
        </h2>
        <p className="text-sm md:text-base text-gunmetal/40 font-medium mt-4 max-w-xl">
          Deep dives into AI Agent architecture, SaaS scaling, and high-performance development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {visibleBlogs.map((blog, i) => (
            <motion.div
              layout
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                onReadMore(blog);
              }}
            >
              <div className="relative h-full glass rounded-[50px] overflow-hidden bg-white/40 border border-white/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_50px_100px_-20px_rgba(108,99,255,0.15)] hover:border-primary/20">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <img 
                    src={blog.img} 
                    alt={blog.title} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" 
                  />
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-5 py-2.5 rounded-full glass border-white text-[9px] font-black uppercase tracking-widest text-gunmetal z-20 shadow-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    {blog.cat}
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-gunmetal/30 mb-5">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest"><Calendar size={12} /> {blog.date}</div>
                    <div className="w-1 h-1 rounded-full bg-gunmetal/10"></div>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest"><Clock size={12} /> 6m read</div>
                  </div>
                  <h3 className="text-2xl font-black text-gunmetal mb-5 leading-[1.2] group-hover:text-primary transition-colors tracking-tight">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gunmetal/50 font-medium leading-relaxed line-clamp-2 mb-8">
                    {blog.desc}
                  </p>
                  <div className="mt-auto pt-8 border-t border-black/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] font-black text-primary/60 uppercase tracking-widest">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gunmetal text-white group-hover:bg-primary group-hover:scale-110 transition-all shadow-lg">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < blogs.length && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 flex justify-center"
        >
          <button 
            onClick={handleLoadMore}
            className="group flex items-center gap-3 px-10 py-5 rounded-full glass border-white/60 bg-white/40 text-[11px] font-black uppercase tracking-[0.3em] text-gunmetal hover:bg-white hover:text-primary transition-all duration-300 shadow-xl"
          >
            <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
            Load More Insights
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BlogSection;
