import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Cpu, 
  Zap, 
  Bot, 
  ArrowLeft, 
  Sparkles, 
  Terminal, 
  Search, 
  Code2, 
  Fingerprint,
  Workflow,
  X,
  Download,
  CheckCircle2,
  Settings2,
  ChevronRight,
  Database,
  Activity,
  Layers,
  Network,
  Lock,
  Unlock,
  Send,
  ArrowRight,
  ShieldCheck,
  MousePointer2,
  Target
} from 'lucide-react';

interface Agent {
  id: number;
  title: string;
  desc: string;
  icon: string;
  img: string;
  type: 'free' | 'premium';
  price: string;
  tags: string[];
  longDesc: string;
  howItWorks: string;
  benefits: string[];
  workflowNodes: string[];
  mockJson: string;
}

interface AISolutionsProps {
  agents: Agent[];
  onBack: () => void;
}

const AISolutions: React.FC<AISolutionsProps> = ({ agents, onBack }) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '' });

  // Filter agents
  const freeAgents = agents.filter(a => a.type === 'free');
  const premiumAgents = agents.filter(a => a.type === 'premium');

  useEffect(() => {
    let interval: any;
    if (selectedAgent) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % selectedAgent.workflowNodes.length);
      }, 3000);
    } else {
      setActiveStep(0);
    }
    return () => clearInterval(interval);
  }, [selectedAgent]);

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Fingerprint': return <Fingerprint size={28} />;
      case 'Workflow': return <Workflow size={28} />;
      case 'BrainCircuit': return <BrainCircuit size={28} />;
      default: return <Bot size={28} />;
    }
  };

  const handleDownloadAction = (agent: Agent) => {
    if (agent.type === 'premium') {
      const phoneNumber = "923343059802";
      const text = `Hi Iqra! I'm interested in the Premium AI Agent: "${agent.title}" (Price: $${agent.price}). Can you help me set this up?`;
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      setShowLeadForm(true);
    }
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead Collected:", leadData);
    alert("Thank you! Your free workflow download link has been sent to your email.");
    setShowLeadForm(false);
    if (selectedAgent) {
      downloadJson(selectedAgent);
    }
  };

  const downloadJson = (agent: Agent) => {
    const blob = new Blob([agent.mockJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${agent.title.toLowerCase().replace(/\s+/g, '_')}_workflow.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const terminalLines = [
    { text: "> initializing agentic_core.py", color: "text-primary" },
    { text: "> loading vector_database... [SUCCESS]", color: "text-gunmetal/60" },
    { text: "> scanning business_workflow.json", color: "text-gunmetal/60" },
    { text: "> logic_gate: automated lead_scoring activated", color: "text-secondary font-bold" },
    { text: "> deployment complete. monitoring live metrics...", color: "text-primary" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-[150px] -z-10"></div>

      {/* Header */}
      <div className="pt-10 mb-16 md:mb-24 flex flex-col items-center text-center">
        <motion.button 
          onClick={onBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full glass border-white/60 text-[10px] font-black uppercase tracking-widest text-gunmetal/60 hover:text-primary transition-all self-center md:self-start"
        >
          <ArrowLeft size={14} /> Back to Home
        </motion.button>

        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles size={14} className="text-primary" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-primary">AI Innovation Lab</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-gunmetal tracking-tight leading-[1.05]">
            Solve Business Bottlenecks with <span className="text-primary italic">Autonomous Intelligence.</span>
          </h1>

          <p className="text-lg md:text-xl text-gunmetal/60 font-medium leading-relaxed">
            I don't just build code; I engineer problem-solving agents. Deploy intelligent ecosystems that automate workflows, drive sales, and scale your business 24/7.
          </p>
        </div>
      </div>

      {/* Premium Section */}
      <div className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gunmetal text-white flex items-center justify-center shadow-lg"><Lock size={20} /></div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gunmetal tracking-tight">Premium Agentic Ecosystems</h2>
            <p className="text-sm text-gunmetal/40 font-bold uppercase tracking-widest">High-Impact Business Solutions</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumAgents.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} onClick={() => setSelectedAgent(agent)} i={i} getIcon={getIcon} />
          ))}
        </div>
      </div>

      {/* Free Section */}
      <div className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20"><Unlock size={20} /></div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gunmetal tracking-tight">Free Community Workflows</h2>
            <p className="text-sm text-gunmetal/40 font-bold uppercase tracking-widest">Open Source Automation Modules</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freeAgents.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} onClick={() => setSelectedAgent(agent)} i={i} getIcon={getIcon} />
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedAgent && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedAgent(null)}
              className="absolute inset-0 bg-gunmetal/40 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[40px] md:rounded-[60px] glass bg-white/95 border border-white/80 shadow-2xl flex flex-col md:flex-row"
            >
              {/* Workflow Graph Visualization (Left) */}
              <div className="w-full md:w-[45%] p-8 md:p-12 bg-gunmetal relative overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary"><Network size={20} /></div>
                    <span className="text-[12px] font-bold text-white uppercase tracking-widest">Runtime Lifecycle</span>
                  </div>
                  <button onClick={() => setSelectedAgent(null)} className="md:hidden text-white/40"><X size={20} /></button>
                </div>
                <div className="space-y-10">
                  {selectedAgent.workflowNodes.map((node, idx) => (
                    <WorkflowNode key={idx} node={node} idx={idx} isActive={activeStep === idx} total={selectedAgent.workflowNodes.length} />
                  ))}
                </div>
              </div>

              {/* Content Panel (Right) */}
              <div className="flex-1 p-8 md:p-16 flex flex-col overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black text-gunmetal tracking-tight mb-4">{selectedAgent.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${selectedAgent.type === 'premium' ? 'bg-gunmetal text-white' : 'bg-primary/10 text-primary'}`}>
                        {selectedAgent.type === 'premium' ? `Premium · $${selectedAgent.price}` : 'Free Workflow'}
                      </span>
                      {selectedAgent.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 rounded-full bg-black/5 text-gunmetal/40 text-[9px] font-black uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setSelectedAgent(null)} className="hidden md:block p-3 hover:bg-black/5 rounded-full"><X size={24} /></button>
                </div>

                <div className="space-y-12 flex-grow">
                  {/* The Solution Text */}
                  <section>
                    <h4 className="text-[11px] font-black text-gunmetal/30 uppercase tracking-[0.3em] mb-4">The Solution</h4>
                    <p className="text-lg text-gunmetal/70 font-medium leading-relaxed">{selectedAgent.longDesc}</p>
                  </section>

                  {/* Architectural Flow Visualization */}
                  <section className="p-8 md:p-10 rounded-[40px] bg-gray-50/80 border border-black/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Cpu size={120} />
                    </div>
                    <h4 className="text-[11px] font-black text-gunmetal/30 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                       <Zap size={14} className="text-primary" /> System Architecture
                    </h4>
                    
                    <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-4">
                      {/* Step 1: Input */}
                      <div className="flex-1 w-full text-center md:text-left">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary mb-4 mx-auto md:mx-0">
                          <Database size={24} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Retrieval</p>
                        <p className="text-xs font-bold text-gunmetal/60">Data Injection & Context</p>
                      </div>

                      <div className="hidden md:block text-black/10"><ArrowRight size={20} /></div>

                      {/* Step 2: Intelligence */}
                      <div className="flex-1 w-full text-center md:text-left">
                        <div className="w-14 h-14 rounded-2xl bg-gunmetal shadow-lg flex items-center justify-center text-white mb-4 mx-auto md:mx-0">
                          <BrainCircuit size={24} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">Intelligence</p>
                        <p className="text-xs font-bold text-gunmetal/60">LLM Processing & Logic</p>
                      </div>

                      <div className="hidden md:block text-black/10"><ArrowRight size={20} /></div>

                      {/* Step 3: Action */}
                      <div className="flex-1 w-full text-center md:text-left">
                        <div className="w-14 h-14 rounded-2xl bg-primary shadow-lg flex items-center justify-center text-white mb-4 mx-auto md:mx-0">
                          <Zap size={24} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Execution</p>
                        <p className="text-xs font-bold text-gunmetal/60">API Trigger & Response</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-black/5">
                      <p className="text-sm font-medium text-gunmetal/50 leading-relaxed italic">
                        "{selectedAgent.howItWorks}"
                      </p>
                    </div>
                  </section>

                  {/* Benefits Section - Dynamically listing core advantages with checkmarks */}
                  {selectedAgent.benefits && selectedAgent.benefits.length > 0 && (
                    <section className="p-8 md:p-10 rounded-[40px] bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Target size={20} />
                        </div>
                        <h4 className="text-[11px] font-black text-gunmetal uppercase tracking-[0.3em]">Core Benefits & Strategic Impact</h4>
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {selectedAgent.benefits.map((benefit, i) => (
                          <motion.li 
                            key={i} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="flex gap-4 text-sm font-bold text-gunmetal/70 leading-snug group"
                          >
                            <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                              <CheckCircle2 size={16} />
                            </div> 
                            {benefit}
                          </motion.li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-16 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gunmetal mb-1">Deployment Ready</p>
                    <p className="text-xs text-gunmetal/40 font-medium">
                      {selectedAgent.type === 'premium' ? 'Get custom setup and support via WhatsApp.' : 'Unlock the free JSON by providing contact info.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDownloadAction(selectedAgent)}
                    className={`w-full md:w-auto px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-xl transition-all flex items-center justify-center gap-3 ${selectedAgent.type === 'premium' ? 'bg-gunmetal text-white hover:bg-black' : 'bg-primary text-white hover:scale-105'}`}
                  >
                    <Download size={18} /> {selectedAgent.type === 'premium' ? `Buy System $${selectedAgent.price}` : 'Get Free JSON'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lead Collection Form */}
      <AnimatePresence>
        {showLeadForm && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLeadForm(false)} className="absolute inset-0 bg-gunmetal/60 backdrop-blur-md"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="relative w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl border border-white/40">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4"><Unlock size={32} /></div>
                <h3 className="text-2xl font-black text-gunmetal">Unlock Your Free Workflow</h3>
                <p className="text-sm text-gunmetal/40 mt-2">Provide your details to receive the JSON package.</p>
              </div>
              <form onSubmit={submitLead} className="space-y-4">
                <input placeholder="Full Name" required className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 font-bold" value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})} />
                <input type="email" placeholder="Email Address" required className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 font-bold" value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} />
                <input type="tel" placeholder="Phone / WhatsApp" required className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 font-bold" value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} />
                <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  Send Download Link <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Visual Terminal */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-gunmetal tracking-tight">Real Intelligence, <br /><span className="text-secondary">Not Just Code.</span></h2>
          <p className="text-base md:text-lg text-gunmetal/50 font-medium leading-relaxed">Integration of advanced LLMs with proprietary business data to create scalable brains for your enterprise.</p>
          <div className="flex gap-4 p-6 rounded-3xl glass border-white/60 group hover:bg-white/80 transition-all cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0"><Search size={24} /></div>
            <div>
              <h4 className="font-extrabold text-gunmetal text-sm uppercase">Dynamic Context Retrieval</h4>
              <p className="text-xs text-gunmetal/50 mt-1">Agents scan knowledge bases in milliseconds for hyper-accurate solutions.</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-[40px] border border-white/80 bg-white/60 overflow-hidden shadow-2xl p-8 md:p-10 font-mono text-[11px] md:text-[13px] space-y-3">
          {terminalLines.map((line, idx) => (
            <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + (idx * 0.4) }} className={line.color}>{line.text}</motion.div>
          ))}
          <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-primary align-middle ml-1"></motion.div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(108,99,255,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};

const AgentCard = ({ agent, onClick, i, getIcon }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
    onClick={onClick}
    className="group relative glass-ai-card overflow-hidden rounded-[50px] border border-white/60 bg-white/40 backdrop-blur-2xl hover:bg-white/60 transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-primary/5 cursor-pointer flex flex-col"
  >
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      <img src={agent.img} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
      <div className="absolute top-4 right-4 z-20">
        <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${agent.type === 'premium' ? 'bg-gunmetal text-white' : 'bg-primary text-white shadow-lg'}`}>
          {agent.type === 'premium' ? `PREMIUM · $${agent.price}` : 'FREE'}
        </span>
      </div>
      <div className="absolute bottom-4 left-6 z-20">
        <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-sm">{getIcon(agent.icon)}</div>
      </div>
    </div>
    <div className="p-10 pt-8 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold text-gunmetal mb-4 tracking-tight group-hover:text-primary transition-colors">{agent.title}</h3>
      <p className="text-gunmetal/60 text-sm font-medium mb-8 line-clamp-2">{agent.desc}</p>
      <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all">View Solution <ChevronRight size={14} /></div>
    </div>
  </motion.div>
);

const WorkflowNode = ({ node, idx, isActive, total }: any) => {
  const nodeParts = node.split(':');
  const label = nodeParts.length > 1 ? nodeParts[0] : 'Action';
  const title = nodeParts.length > 1 ? nodeParts[1] : nodeParts[0];
  return (
    <div className="relative">
      {idx < total - 1 && <div className="absolute left-[23px] top-[48px] h-[40px] w-[2px] bg-gradient-to-b from-primary/60 to-transparent"></div>}
      <div className="flex items-center gap-6 group">
        <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center z-20 transition-all ${isActive ? 'bg-primary text-white shadow-[0_0_25px_rgba(108,99,255,0.5)] scale-110' : 'bg-white/5 text-white/20 border border-white/10'}`}>
          {idx === 0 ? <Zap size={20} /> : idx === total - 1 ? <Activity size={20} /> : <Layers size={20} />}
          {isActive && <motion.div animate={{ scale: [1, 1.5], opacity: [0.3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 rounded-2xl bg-primary" />}
        </div>
        <div className={`flex-1 px-6 py-4 rounded-3xl border transition-all ${isActive ? 'bg-white/10 border-white/20 translate-x-2' : 'bg-white/5 border-white/5'}`}>
          <p className="text-[9px] font-black uppercase text-primary mb-1">{label}</p>
          <p className={`text-sm font-bold ${isActive ? 'text-white' : 'text-white/60'}`}>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default AISolutions;