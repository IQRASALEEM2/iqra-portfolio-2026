
import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Share2, 
  Twitter, 
  Linkedin, 
  Bookmark,
  Copy,
  ChevronLeft,
  ChevronRight,
  Quote,
  Eye,
  Sparkles,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import BlogSection from './BlogSection';
import SEO from '../src/components/SEO';

interface BlogDetailProps {
  blog: any;
  blogs: any[];
  onBack: () => void;
  onReadMore: (blog: any) => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog, blogs, onBack, onReadMore }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  // Find index for next/previous navigation
  const currentIndex = useMemo(() => blogs.findIndex(b => b.id === blog.id), [blog.id, blogs]);
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  // Filter out current blog for recent blogs section
  const otherBlogs = useMemo(() => blogs.filter(b => b.id !== blog.id), [blog.id, blogs]);

  const seoTitle = blog?.seo?.title || blog?.title || '';
  const seoDescription = blog?.seo?.description || blog?.desc || '';
  const seoKeywords = [
    blog?.seo?.focusKeyword,
    ...(Array.isArray(blog?.tags) ? blog.tags : []),
  ].filter(Boolean).join(', ');
  const seoUrl = typeof window !== 'undefined' ? window.location.href : '';

  const renderContent = (text: string) => {
    return text.split('\n').map((para, i) => {
      const trimmed = para.trim();
      if (!trimmed) return <div key={i} className="h-4 md:h-6" />;
      
      // H3 Headings
      if (para.startsWith('###')) {
        return (
          <h3 key={i} className="text-[20px] sm:text-2xl md:text-3xl font-black text-gunmetal mt-10 md:mt-14 mb-6 tracking-tighter leading-tight flex items-center justify-start gap-4">
            <span className="w-1.5 h-6 sm:h-8 bg-primary rounded-full shrink-0"></span>
            {para.replace('###', '')}
          </h3>
        );
      }
      
      // Numbered Lists (Key Takeaways) - Vertical stack on mobile for better readability
      if (para.match(/^\d\./)) {
        const parts = para.split('.');
        const number = parts[0];
        const content = parts.slice(1).join('.');
        return (
          <div key={i} className="flex flex-col gap-2 mb-8 pl-4 border-l-2 border-primary/10">
            <span className="text-primary font-black text-[18px] sm:text-2xl leading-none">0{number}</span>
            <p className="text-[16px] sm:text-[17px] text-gunmetal/80 font-medium leading-[1.7] font-poppins">{content.trim()}</p>
          </div>
        );
      }

      // Bullet points
      if (para.startsWith('* ')) {
        return (
          <li key={i} className="flex items-start justify-start gap-3 mb-4 text-[16px] sm:text-[17px] text-gunmetal/80 font-medium list-none font-poppins">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
            {para.replace('* ', '')}
          </li>
        );
      }
      
      const formatted = para
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-gunmetal">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-primary/80">$1</em>');

      return <p key={i} className="text-[16px] sm:text-[17px] text-gunmetal/70 font-medium leading-[1.8] mb-8 font-poppins text-left" dangerouslySetInnerHTML={{ __html: formatted }}></p>;
    });
  };

  return (
    <div className="min-h-screen selection:bg-primary/20 pb-20 relative overflow-hidden m-0 p-0 bg-lavender/10">
      <SEO title={seoTitle} description={seoDescription} keywords={seoKeywords} url={seoUrl} />
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] orb bg-gradient-to-b from-primary/30 via-secondary/20 to-transparent opacity-40 -z-10"></div>
      
      {/* Blog Hero Section */}
      <div className="w-full h-[55vh] md:h-[75vh] min-h-[450px] relative overflow-hidden mt-0 pt-0 pb-[4%] flex items-center">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          src={blog.img} 
          alt={blog.title} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gunmetal/95 via-gunmetal/60 to-gunmetal/30"></div>
        
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col items-start text-left space-y-4 md:space-y-8"
          >
            <div className="flex flex-wrap items-center justify-start gap-3 md:gap-4">
              <span className="px-4 py-1.5 md:px-5 md:py-2 rounded-full glass border-white/20 text-[9px] md:text-[12px] font-black uppercase tracking-[0.3em] text-white backdrop-blur-xl">
                {blog.cat}
              </span>
              <div className="hidden sm:block h-px w-20 bg-white/20"></div>
              <div className="flex items-center gap-2 text-[9px] md:text-[11px] font-black uppercase tracking-widest text-primary shadow-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                PUBLISHED
              </div>
            </div>
            
            <h1 className="text-[25px] sm:text-[32px] md:text-[45px] lg:text-[56px] font-black text-white tracking-tighter leading-[1.1] drop-shadow-2xl max-w-4xl">
              {blog.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-12 pt-6 md:pt-8 border-t border-white/10 w-full sm:max-w-3xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/40 overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Iqra Saleem" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[12px] md:text-[14px] font-black uppercase tracking-widest text-white">Iqra Saleem</span>
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/40">Digital Architect</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-start gap-4 md:gap-10 text-white/80">
                 <div className="flex items-center gap-2 text-[10px] md:text-[13px] font-bold uppercase tracking-[0.2em]">
                    <Calendar size={14} className="text-primary" /> {blog.date}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] md:text-[13px] font-bold uppercase tracking-[0.2em]">
                    <Clock size={14} className="text-primary" /> 6 MIN READ
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Reading Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 -translate-y-12 md:-translate-y-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="bg-white p-6 md:p-16 lg:p-24 rounded-[32px] md:rounded-[60px] lg:rounded-[80px] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.08)] border border-black/5"
        >
          {/* Navigation Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-black/5 pb-10">
            <button onClick={onBack} className="flex items-center gap-2 text-gunmetal/60 hover:text-primary transition-all font-bold uppercase tracking-widest text-[11px]">
              <ArrowLeft size={16} /> Back to Insights
            </button>
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-gunmetal/30 mr-2">Share:</span>
              <button className="p-2.5 rounded-full hover:bg-black/5 transition-all text-gunmetal/40 hover:text-primary"><Twitter size={18} /></button>
              <button className="p-2.5 rounded-full hover:bg-black/5 transition-all text-gunmetal/40 hover:text-primary"><Linkedin size={18} /></button>
              <button className="p-2.5 rounded-full hover:bg-black/5 transition-all text-gunmetal/40 hover:text-primary"><Copy size={18} /></button>
            </div>
          </div>

          {/* Subtitle Section - 18px thin-bold on mobile, 24px bold on desktop */}
          <div className="mb-12 md:mb-16 relative max-w-5xl text-left">
            <Quote size={80} className="absolute -top-16 -left-12 text-primary/5 -z-10 hidden md:block" />
            <h2 className="text-[18px] sm:text-[24px] font-medium sm:font-bold text-gunmetal leading-[1.6] tracking-tight font-montserrat border-l-4 border-primary/20 pl-6 sm:pl-10">
              {blog.desc}
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            {renderContent(blog.content)}
          </div>

          {/* Next/Prev Navigation - Responsive: Only labels "Previous Blog" / "Next Blog" on mobile */}
          <div className="mt-16 md:mt-24 pt-12 border-t border-black/5 flex flex-col md:flex-row gap-4 md:gap-8">
            {prevBlog && (
              <button 
                onClick={() => onReadMore(prevBlog)} 
                className="flex-1 group flex flex-col items-start gap-3 p-6 sm:p-10 rounded-[24px] sm:rounded-[48px] bg-gunmetal/5 hover:bg-gunmetal/10 transition-all text-left"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 group-hover:-translate-x-1 transition-transform">
                  <ArrowLeft size={14}/> 
                  <span className="block sm:hidden">Previous Blog</span>
                  <span className="hidden sm:block">Previous Article</span>
                </span>
                <span className="hidden sm:block text-lg md:text-xl font-black text-gunmetal leading-tight line-clamp-2">
                  {prevBlog.title}
                </span>
              </button>
            )}
            {nextBlog && (
              <button 
                onClick={() => onReadMore(nextBlog)} 
                className="flex-1 group flex flex-col items-end gap-3 p-6 sm:p-10 rounded-[24px] sm:rounded-[48px] bg-primary/5 hover:bg-primary/10 transition-all text-right"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                  <span className="block sm:hidden">Next Blog</span>
                  <span className="hidden sm:block">Next Article</span>
                  <ArrowRight size={14}/>
                </span>
                <span className="hidden sm:block text-lg md:text-xl font-black text-gunmetal leading-tight line-clamp-2">
                  {nextBlog.title}
                </span>
              </button>
            )}
          </div>

          {/* Tags & Topics - Professional clean layout */}
          <div className="mt-16 md:mt-24 pt-12 border-t border-black/5 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12 rounded-[40px] bg-white border border-black/5 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 group-hover:rotate-12 transition-transform">
                <Sparkles size={60} className="text-primary" />
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-8 flex items-center gap-2">
                <span className="w-4 h-px bg-primary/30"></span>
                Topics & Tags
              </h4>
              <div className="flex flex-wrap items-center justify-start gap-2.5">
                {blog.tags.map((t: string) => (
                  <span key={t} className="px-5 py-2.5 rounded-xl bg-lavender/10 border border-primary/5 text-gunmetal/60 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-12 rounded-[40px] bg-gunmetal text-white shadow-2xl flex flex-col items-start justify-center space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/60">Contribute</h4>
              <p className="text-sm font-medium opacity-60 leading-relaxed">Loved this insight? Join the conversation or share it with your network to help grow our digital ecosystem.</p>
              <div className="flex items-center gap-4">
                <button className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><Twitter size={18} /></button>
                <button className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><Linkedin size={18} /></button>
                <button className="px-6 py-3.5 rounded-2xl bg-primary text-white text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all">Copy Link</button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Blogs */}
        <div className="mt-32">
          <BlogSection blogs={otherBlogs.slice(0, 3)} onReadMore={onReadMore} />
        </div>
      </div>

      <style>{`
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default BlogDetail;
