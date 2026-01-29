import React, { useState } from 'react';
import { MessageCircle, X, Calendar, Wrench, Sparkles, MessageSquareText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "923343059802";

  const handleAction = (type: 'service' | 'consultation') => {
    const text = type === 'service' 
      ? "Hi Iqra! I'm interested in booking a service for my project. Can we discuss the details?"
      : "Hi Iqra! I'd like to schedule a digital ecosystem consultation with you. When are you available?";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[99999] flex flex-col items-end gap-3 md:gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[280px] md:w-[320px] rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/60 bg-white/70 backdrop-blur-2xl flex flex-col mb-2 md:mb-4 origin-bottom-right pointer-events-auto"
          >
            {/* Header Area - Compacted */}
            <div className="bg-primary/5 p-4 md:p-5 border-b border-black/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" 
                      alt="Iqra Saleem" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-gunmetal tracking-tight">Iqra Saleem</h4>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-gunmetal/60 font-medium leading-tight italic">
                "Hi there! 👋 How can I assist you today?"
              </p>
            </div>

            {/* Form Options Area - Compacted */}
            <div className="p-4 md:p-5 pt-3 md:pt-4 space-y-2 md:space-y-3">
              <p className="text-[9px] font-black text-gunmetal/30 uppercase tracking-[0.2em] mb-2 text-center">Select an option to chat</p>
              
              <button 
                onClick={() => handleAction('service')}
                className="group w-full py-3 px-4 rounded-xl bg-gunmetal text-white flex items-center justify-between hover:bg-black transition-all duration-300 shadow-lg shadow-gunmetal/10 hover:-translate-y-0.5"
              >
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-black uppercase tracking-widest">Book a Service</span>
                  <span className="text-[8px] font-medium opacity-50">Web, AI or Automation</span>
                </div>
                <Wrench size={16} className="opacity-40 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
              </button>
              
              <button 
                onClick={() => handleAction('consultation')}
                className="group w-full py-3 px-4 rounded-xl bg-white border border-black/5 text-gunmetal flex items-center justify-between hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 shadow-sm hover:-translate-y-0.5"
              >
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-black uppercase tracking-widest">Free Consultation</span>
                  <span className="text-[8px] font-medium text-gunmetal/40">15 min strategy call</span>
                </div>
                <Calendar size={16} className="text-primary opacity-40 group-hover:opacity-100 transition-all" />
              </button>
            </div>
            
            <div className="pb-4 pt-1 flex items-center justify-center gap-2 opacity-20">
              <Sparkles size={8} className="text-primary" />
              <span className="text-[7px] font-bold uppercase tracking-[0.2em]">Digital Architect</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative pointer-events-auto">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-xl pointer-events-none hidden md:block"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-gunmetal flex items-center gap-2">
                <MessageSquareText size={14} className="text-primary" />
                Let's chat!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 relative group overflow-hidden ${isOpen ? 'bg-gunmetal rotate-0' : 'bg-gradient-to-br from-primary via-primary to-secondary'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'open'}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={24} className="md:w-7 md:h-7" /> : <MessageCircle size={28} className="md:w-8 md:h-8" />}
            </motion.div>
          </AnimatePresence>
          
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default WhatsAppButton;