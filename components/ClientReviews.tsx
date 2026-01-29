
import React from 'react';
import { Quote, Sparkles, Star } from 'lucide-react';

interface Review {
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
}

interface ClientReviewsProps {
  reviews: Review[];
}

const ClientReviews: React.FC<ClientReviewsProps> = ({ reviews }) => {
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section id="reviews" className="relative p-0 m-0 overflow-hidden select-none">
      <div className="mb-8 text-center px-[4%]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-primary" size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Testimonials</span>
        </div>
        <h2 className="section-headline text-gunmetal">Voice of <span className="italic text-primary">Satisfaction.</span></h2>
      </div>

      <div className="flex w-fit gap-6 animate-infinite-scroll hover:pause pb-4">
        {duplicatedReviews.map((rev, idx) => (
          <div key={idx} className="w-[300px] md:w-[450px] flex-shrink-0 glass p-8 md:p-10 rounded-[40px] shadow-xl bg-white/40 border border-white/60">
            <div className="flex items-center justify-between mb-4">
              <Quote size={32} className="text-primary/10" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < rev.rating ? "currentColor" : "none"} 
                    className={i < rev.rating ? "text-orange-400" : "text-gray-200"} 
                  />
                ))}
              </div>
            </div>
            <p className="text-[14px] md:text-[14px] font-medium italic mb-6">"{rev.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-primary text-white flex items-center justify-center font-black text-xs">
                {rev.avatar}
              </div>
              <div>
                <h4 className="font-bold text-xs md:text-sm">{rev.name}</h4>
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-primary mt-1">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes infinite-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-infinite-scroll { animation: infinite-scroll 40s linear infinite; }
        .pause:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

export default ClientReviews;
