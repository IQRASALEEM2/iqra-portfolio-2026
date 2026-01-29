import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  SendHorizontal, 
  Sparkles,
  MessageSquare,
  ChevronDown,
  Linkedin,
  Github,
  Youtube,
  Instagram,
  Facebook,
  Share2
} from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const socials = [
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/iqra-saleem60", label: "LinkedIn" },
    { icon: <Github size={18} />, href: "https://github.com/IQRASALEEM2", label: "GitHub" },
    { icon: <Youtube size={18} />, href: "https://www.youtube.com/@Iqrasaleem_00", label: "YouTube" },
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/dev.iqra?igsh=ajczZjZ1cmluYmp2", label: "Instagram" },
    { icon: <Facebook size={18} />, href: "https://www.facebook.com/share/1FfrZ67p4e/", label: "Facebook" }
  ];

  return (
    <div className="relative overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10"></div>
      
      {/* Centered Headline */}
      <div className="max-w-7xl mx-auto px-[4%] mb-12 md:mb-16 space-y-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2"
        >
          <Sparkles className="text-primary" size={16} />
          <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-primary">Get In Touch</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-headline text-gunmetal"
        >
          Let's Build Something <span className="text-primary italic">Amazing.</span>
        </motion.h2>
      </div>

      {/* Grid: Form and Info */}
      <div className="max-w-7xl mx-auto px-[4%] grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch w-full">
        
        {/* Left Column: Form Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-[48px] border border-white/60 bg-white/60 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.05)] backdrop-blur-md flex flex-col justify-between"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gunmetal/40 ml-1">Name</label>
                <input type="text" placeholder="Your Name" className="w-full bg-white/50 border border-white/80 px-5 py-4 rounded-2xl outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:bg-white placeholder:text-gunmetal/20 font-bold text-gunmetal text-sm shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gunmetal/40 ml-1">Email</label>
                <input type="email" placeholder="Email Address" className="w-full bg-white/50 border border-white/80 px-5 py-4 rounded-2xl outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:bg-white placeholder:text-gunmetal/20 font-bold text-gunmetal text-sm shadow-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gunmetal/40 ml-1">Service Required</label>
              <div className="relative">
                <select className="w-full bg-white/50 border border-white/80 px-5 py-4 rounded-2xl outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:bg-white appearance-none font-bold text-gunmetal text-sm shadow-sm">
                  <option value="">Select a Service</option>
                  <option value="wordpress">WordPress & E-Commerce</option>
                  <option value="react">React / SaaS Development</option>
                  <option value="ai">AI Agents & Automation</option>
                  <option value="python">Python Backend Systems</option>
                  <option value="other">Other Inquiry</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gunmetal/30 pointer-events-none" size={16} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gunmetal/40 ml-1">Message</label>
              <textarea rows={4} placeholder="Tell me about your project..." className="w-full bg-white/50 border border-white/80 px-5 py-5 rounded-2xl outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:bg-white placeholder:text-gunmetal/20 resize-none font-bold text-gunmetal text-sm shadow-sm" />
            </div>

            <button className="w-full py-5 rounded-2xl bg-gunmetal text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_15px_35px_-5px_rgba(26,26,26,0.2)] hover:shadow-[0_25px_50px_-10px_rgba(26,26,26,0.3)] hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group">
              Send Message <SendHorizontal size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>

        {/* Right Column: Info Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col h-full"
        >
          <div className="flex-grow p-8 md:p-10 rounded-[48px] border border-white/60 bg-white/60 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.05)] backdrop-blur-md relative overflow-hidden group flex flex-col justify-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
              <MessageSquare size={28} strokeWidth={1.5} />
            </div>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0 border border-white/80"><Mail size={20} /></div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">Email</p>
                  <a href="mailto:contact.iqrasaleem.dev@gmail.com" className="text-base font-bold text-gunmetal hover:text-primary transition-colors block break-words">
                    contact.iqrasaleem.dev@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0 border border-white/80"><Phone size={20} /></div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">WhatsApp & Call</p>
                  <a href="tel:+923343059802" className="text-base font-bold text-gunmetal hover:text-primary transition-colors block">
                    +92 334 305 9802
                  </a>
                </div>
              </div>


              {/* Social Media Grid */}
              <div className="pt-8 border-t border-white/60">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0 border border-white/80"><Share2 size={20} /></div>
                  <div>
                    <p className="text-[11px] font-black text-gunmetal uppercase tracking-[0.2em]">Digital Presence</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {socials.map((social, idx) => (
                    <a 
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center text-gunmetal/40 hover:text-primary hover:scale-110 hover:bg-white transition-all shadow-[0_10px_20px_-5px_rgba(0,0,0,0.05)] border border-white/80"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;