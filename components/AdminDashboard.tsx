import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  LogOut, 
  ShieldCheck, 
  BookOpen, 
  Edit3, 
  X,
  Upload,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutPanelLeft,
  BrainCircuit, 
  Zap, 
  DollarSign, 
  Star, 
  Link, 
  Tag, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3, 
  Search, 
  RefreshCw,
  ChevronDown,
  Settings,
  Globe,
  Twitter,
  Facebook,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAdminCredentials, setAdminCredentials } from '../src/utils/adminAuth';
import { db } from '../src/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useDataEngine } from '../src/hooks/useDataEngine';

// Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = 'dmdjur2bd';
const CLOUDINARY_UPLOAD_PRESET = 'vs7jyygc';
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// --- Interfaces ---

interface SEOData {
  title: string;
  description: string;
  focusKeyword: string;
  score: number;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  cat: string;
  img: string;
  tech: string[];
  link: string;
  seo?: SEOData;
}

interface Blog {
  id: string;
  title: string;
  desc: string;
  content: string;
  cat: string;
  img: string;
  date: string;
  tags: string[];
  seo: SEOData;
}

interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
}

interface Agent {
  id: string;
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

interface AdminDashboardProps {
  onLogout: () => void;
}

const AGENT_ICONS = ['Fingerprint', 'Workflow', 'BrainCircuit', 'Bot'];
const PROJECT_CATEGORIES = ['WordPress & E-Commerce', 'AI Agents & Automation', 'SaaS Products'];
const BLOG_CATEGORIES = ['AI Innovation', 'Web Dev', 'Digital Strategy', 'Business Growth'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  // ✅ Use centralized data engine for real-time Firestore sync
  const { agents, setAgents, projects, setProjects, blogs, setBlogs, reviews, setReviews } = useDataEngine();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'blogs' | 'projects' | 'reviews' | 'aiLabs' | 'security' | 'generalSettings'>('blogs');
  
  const fileRef = useRef<HTMLInputElement>(null);

  // General Editor State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initial State for Forms
  const emptySEO: SEOData = { title: '', description: '', focusKeyword: '', score: 0 };

  // Forms
  const [blogForm, setBlogForm] = useState<Partial<Blog>>({ 
    title: '', 
    desc: '', 
    content: '', 
    cat: 'AI Innovation', 
    tags: [], 
    seo: { ...emptySEO } 
  });
  const [projectForm, setProjectForm] = useState<Partial<Project>>({ title: '', subtitle: '', cat: 'WordPress & E-Commerce', tech: [], link: '' });
  const [reviewForm, setReviewForm] = useState<Partial<Review>>({ name: '', role: '', text: '', rating: 5, avatar: '' });
  const [agentForm, setAgentForm] = useState<Partial<Agent>>({ title: '', desc: '', longDesc: '', icon: 'Bot', type: 'free', price: '0', workflowNodes: [], benefits: [], tags: [], mockJson: '' });

  // Security tab state
  const [securityForm, setSecurityForm] = useState({ oldPassword: '', newPassword: '' });
  const [securityMessage, setSecurityMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // General Settings state
  const loadSiteSettings = () => {
    if (typeof window === 'undefined') return { siteName: '', defaultMetaDescription: '', socialLinks: { twitter: '', facebook: '', linkedin: '' } };
    const stored = window.localStorage.getItem('siteSettings');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { siteName: '', defaultMetaDescription: '', socialLinks: { twitter: '', facebook: '', linkedin: '' } };
      }
    }
    return { siteName: '', defaultMetaDescription: '', socialLinks: { twitter: '', facebook: '', linkedin: '' } };
  };

  const [siteSettings, setSiteSettings] = useState(loadSiteSettings);

  // ✅ Data is automatically synced via useDataEngine hook
  // onSnapshot listeners handle real-time updates from Firestore

  const saveSiteSettings = (settings: typeof siteSettings) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('siteSettings', JSON.stringify(settings));
    setSiteSettings(settings);
  };

  // CLOUDINARY UPLOAD HELPER FUNCTION - WITH DETAILED DEBUGGING
  const uploadToCloudinary = async (base64Image: string): Promise<string> => {
    try {
      // ============================================================================
      // STEP 1: VERIFY CONFIGURATION
      // ============================================================================
      console.log('%c=== CLOUDINARY UPLOAD DEBUG START ===', 'color: blue; font-size: 14px; font-weight: bold;');
      console.log('%cCLOUDINARY_CLOUD_NAME:', 'color: green; font-weight: bold;', CLOUDINARY_CLOUD_NAME);
      console.log('%cCLOUDINARY_UPLOAD_PRESET:', 'color: green; font-weight: bold;', CLOUDINARY_UPLOAD_PRESET);
      console.log('%cCLOUDINARY_API_URL:', 'color: green; font-weight: bold;', CLOUDINARY_API_URL);
      
      // Verify URL doesn't have extra spaces or typos
      if (!CLOUDINARY_API_URL.includes('dmdjur2bd')) {
        throw new Error('❌ CLOUD NAME NOT FOUND IN URL - Check configuration!');
      }
      if (!CLOUDINARY_API_URL.includes('image/upload')) {
        throw new Error('❌ INVALID API URL - Should end with "image/upload"');
      }
      console.log('%c✅ Configuration verified', 'color: green; font-weight: bold;');

      // ============================================================================
      // STEP 2: CONVERT BASE64 TO BLOB
      // ============================================================================
      console.log('%n📸 Converting base64 to blob...', 'color: orange;');
      const response = await fetch(base64Image);
      console.log('%cBase64 fetch response status:', 'color: blue;', response.status);
      
      const blob = await response.blob();
      console.log('%c📊 BLOB SIZE:', 'color: purple; font-weight: bold;', `${blob.size} bytes (${(blob.size / 1024 / 1024).toFixed(2)} MB)`);
      console.log('%cBLOB TYPE:', 'color: purple; font-weight: bold;', blob.type);
      
      // Check file size (Cloudinary has limits)
      if (blob.size > 100 * 1024 * 1024) {
        throw new Error(`❌ FILE TOO LARGE: ${(blob.size / 1024 / 1024).toFixed(2)} MB (Max: 100MB)`);
      }
      console.log('%c✅ Blob created successfully', 'color: green; font-weight: bold;');

      // ============================================================================
      // STEP 3: PREPARE FORMDATA
      // ============================================================================
      console.log('%n📝 Preparing FormData...', 'color: orange;');
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      console.log('%c✅ FormData prepared with:', 'color: green; font-weight: bold;');
      console.log('   - file:', blob.type, `(${blob.size} bytes)`);
      console.log('   - upload_preset:', CLOUDINARY_UPLOAD_PRESET);

      // ============================================================================
      // STEP 4: SEND FETCH REQUEST
      // ============================================================================
      console.log('%n🚀 SENDING FETCH REQUEST...', 'color: red; font-weight: bold;');
      console.log('%cMethod:', 'color: blue;', 'POST');
      console.log('%cURL:', 'color: blue;', CLOUDINARY_API_URL);
      console.log('%cContent-Type:', 'color: blue;', 'multipart/form-data (auto-set by browser)');

      const startTime = performance.now();
      
      const cloudinaryResponse = await fetch(CLOUDINARY_API_URL, {
        method: 'POST',
        body: formData,
        // ✅ NO custom headers - browser auto-sets Content-Type with boundary
      });
      
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);
      
      console.log('%c📨 RESPONSE RECEIVED', 'color: teal; font-weight: bold;');
      console.log('%cStatus Code:', 'color: blue;', cloudinaryResponse.status);
      console.log('%cStatus Text:', 'color: blue;', cloudinaryResponse.statusText);
      console.log('%cResponse Time:', 'color: blue;', `${duration}ms`);
      console.log('%cHeaders:', 'color: blue;', Array.from(cloudinaryResponse.headers.entries()));

      // ============================================================================
      // STEP 5: PARSE RESPONSE
      // ============================================================================
      console.log('%n📊 Parsing Cloudinary response...', 'color: orange;');
      
      let cloudinaryData;
      try {
        cloudinaryData = await cloudinaryResponse.json();
        console.log('%c✅ JSON parsed successfully', 'color: green; font-weight: bold;');
        console.log('%cResponse data:', 'color: blue;', cloudinaryData);
      } catch (parseError) {
        console.error('%c❌ FAILED TO PARSE JSON:', 'color: red; font-weight: bold;', parseError);
        throw new Error('Failed to parse Cloudinary response as JSON');
      }

      // ============================================================================
      // STEP 6: CHECK FOR ERRORS IN RESPONSE
      // ============================================================================
      if (cloudinaryData.error) {
        console.error('%c❌ CLOUDINARY ERROR:', 'color: red; font-weight: bold;', cloudinaryData.error);
        throw new Error(`Cloudinary Error: ${cloudinaryData.error.message}`);
      }

      if (!cloudinaryResponse.ok) {
        console.error('%c❌ RESPONSE NOT OK:', 'color: red; font-weight: bold;', cloudinaryResponse.status);
        throw new Error(`Upload failed with status ${cloudinaryResponse.status}: ${JSON.stringify(cloudinaryData)}`);
      }

      // ============================================================================
      // STEP 7: EXTRACT AND RETURN SECURE URL
      // ============================================================================
      const secureUrl = cloudinaryData.secure_url;
      if (!secureUrl) {
        throw new Error('No secure_url in Cloudinary response');
      }
      
      console.log('%c✅ UPLOAD SUCCESSFUL!', 'color: green; font-weight: bold;');
      console.log('%cSecure URL:', 'color: green;', secureUrl);
      console.log('%c=== CLOUDINARY UPLOAD DEBUG END ===', 'color: blue; font-size: 14px; font-weight: bold;');
      
      return secureUrl;
      
    } catch (error) {
      console.error('%c❌ UPLOAD FAILED - FULL ERROR:', 'color: red; font-size: 14px; font-weight: bold;', error);
      
      if (error instanceof Error) {
        console.error('%cError Name:', 'color: red;', error.name);
        console.error('%cError Message:', 'color: red;', error.message);
        console.error('%cError Stack:', 'color: red;', error.stack);
      } else if (error instanceof TypeError) {
        console.error('%c⚠️ NETWORK/FETCH ERROR:', 'color: orange; font-weight: bold;');
        console.error('This could be:', error);
        console.error('- CORS policy violation');
        console.error('- Network connectivity issue');
        console.error('- Invalid URL');
        console.error('- Firewall/Proxy blocking');
      }
      
      console.log('%c=== CLOUDINARY UPLOAD DEBUG END (WITH ERRORS) ===', 'color: blue; font-size: 14px; font-weight: bold;');
      throw error;
    }
  };

  // Live SEO Score calculation
  const calculateSEOScore = (): number => {
    let score = 0;
    const title = blogForm.seo?.title || blogForm.title || '';
    const description = blogForm.seo?.description || blogForm.desc || '';
    const focusKeyword = blogForm.seo?.focusKeyword || '';
    const content = blogForm.content || '';

    if (focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase())) score += 20;
    if (focusKeyword && description.toLowerCase().includes(focusKeyword.toLowerCase())) score += 20;
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 300) score += 20;
    if (title.length >= 40 && title.length <= 60) score += 20;

    return score;
  };

  const seoScore = calculateSEOScore();
  const getScoreColorClass = (score: number) => {
    if (score < 50) return 'text-red-500 bg-red-50 border-red-200';
    if (score < 80) return 'text-orange-500 bg-orange-50 border-orange-200';
    return 'text-green-500 bg-green-50 border-green-200';
  };

  const resetForms = () => {
    setEditingId(null);
    setIsLoading(false);
    setBlogForm({ 
      title: '', 
      desc: '', 
      content: '', 
      cat: 'AI Innovation', 
      tags: [], 
      seo: { ...emptySEO } 
    });
    setProjectForm({ title: '', subtitle: '', cat: 'WordPress & E-Commerce', tech: [], link: '' });
    setReviewForm({ name: '', role: '', text: '', rating: 5, avatar: '' });
    setAgentForm({ title: '', desc: '', longDesc: '', howItWorks: '', icon: 'Bot', type: 'free', price: '0', workflowNodes: [], benefits: [], tags: [], mockJson: '' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'blog' | 'project' | 'review' | 'agent') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'blog') setBlogForm(f => ({ ...f, img: result }));
        if (type === 'project') setProjectForm(f => ({ ...f, img: result }));
        if (type === 'agent') setAgentForm(f => ({ ...f, img: result }));
        if (type === 'review') setReviewForm(f => ({ ...f, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- BLOG SAVE (CLOUDINARY UPLOAD) ---
  const saveBlog = async () => {
    // ✅ GUARD: Prevent double submission
    if (!blogForm.title || isLoading) return;
    setIsLoading(true);

    try {
      let imgUrl = (blogForm.img as string) || '';
      
      // Upload to Cloudinary if it's a data URL
      if (imgUrl && typeof imgUrl === 'string' && imgUrl.startsWith('data:')) {
        imgUrl = await uploadToCloudinary(imgUrl);
      }

      const calculatedScore = calculateSEOScore();
      const base: Omit<Blog, 'id'> = {
        ...(blogForm as Blog),
        img: imgUrl,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        seo: { ...(blogForm.seo || emptySEO), score: calculatedScore },
      };

      if (editingId && typeof editingId === 'string') {
        try {
          const ref = doc(db, 'blogs', editingId);
          await updateDoc(ref, base);
          const updated: Blog = { ...base, id: editingId };
          setBlogs(prev => prev.map(b => (b.id === editingId ? updated : b)));
        } catch (updateError: any) {
          if (updateError.code === 'not-found') {
            const ref = await addDoc(collection(db, 'blogs'), base);
            const created: Blog = { ...base, id: ref.id };
            setBlogs(prev => [created, ...prev]);
          } else {
            throw updateError;
          }
        }
      } else {
        const ref = await addDoc(collection(db, 'blogs'), base);
        const created: Blog = { ...base, id: ref.id };
        setBlogs(prev => [created, ...prev]);
      }

      resetForms();
      alert('Blog published successfully!');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog. Please check your image and try again.');
    } finally {
      // ✅ ALWAYS reset loading state, even on error
      setIsLoading(false);
    }
  };

  // --- PROJECT SAVE (CLOUDINARY UPLOAD) ---
  const saveProject = async () => {
    // ✅ GUARD: Prevent double submission
    if (!projectForm.title || isLoading) return;
    setIsLoading(true);

    try {
      let imgUrl = (projectForm.img as string) || '';
      
      if (imgUrl && typeof imgUrl === 'string' && imgUrl.startsWith('data:')) {
        imgUrl = await uploadToCloudinary(imgUrl);
      }

      const base: Omit<Project, 'id'> = {
        ...(projectForm as Project),
        img: imgUrl,
      };

      if (editingId && typeof editingId === 'string') {
        try {
          const ref = doc(db, 'projects', editingId);
          await updateDoc(ref, base);
          const updated: Project = { ...base, id: editingId };
          setProjects(prev => prev.map(p => (p.id === editingId ? updated : p)));
        } catch (updateError: any) {
          if (updateError.code === 'not-found') {
            const ref = await addDoc(collection(db, 'projects'), base);
            const created: Project = { ...base, id: ref.id };
            setProjects(prev => [created, ...prev]);
          } else {
            throw updateError;
          }
        }
      } else {
        const ref = await addDoc(collection(db, 'projects'), base);
        const created: Project = { ...base, id: ref.id };
        setProjects(prev => [created, ...prev]);
      }
      
      resetForms();
      alert('Project added to portfolio!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please check your image and try again.');
    } finally {
      // ✅ ALWAYS reset loading state, even on error
      setIsLoading(false);
    }
  };

  // --- REVIEW SAVE (CLOUDINARY UPLOAD) ---
  const saveReview = async () => {
    // ✅ GUARD: Prevent double submission
    if (!reviewForm.name || isLoading) return;
    setIsLoading(true);

    try {
      let avatarUrl = (reviewForm.avatar as string) || '';
      
      if (avatarUrl && typeof avatarUrl === 'string' && avatarUrl.startsWith('data:')) {
        avatarUrl = await uploadToCloudinary(avatarUrl);
      }

      const base: Omit<Review, 'id'> = {
        ...(reviewForm as Review),
        avatar: avatarUrl || reviewForm.name?.substring(0, 2).toUpperCase() || '',
      };

      if (editingId && typeof editingId === 'string') {
        try {
          const ref = doc(db, 'reviews', editingId);
          await updateDoc(ref, base);
          const updated: Review = { ...base, id: editingId };
          setReviews(prev => prev.map(r => (r.id === editingId ? updated : r)));
        } catch (updateError: any) {
          if (updateError.code === 'not-found') {
            const ref = await addDoc(collection(db, 'reviews'), base);
            const created: Review = { ...base, id: ref.id };
            setReviews(prev => [created, ...prev]);
          } else {
            throw updateError;
          }
        }
      } else {
        const ref = await addDoc(collection(db, 'reviews'), base);
        const created: Review = { ...base, id: ref.id };
        setReviews(prev => [created, ...prev]);
      }
      
      resetForms();
      alert('Review added successfully!');
    } catch (error) {
      console.error('Error saving review:', error);
      alert('Error saving review. Please check your image and try again.');
    } finally {
      // ✅ ALWAYS reset loading state, even on error
      setIsLoading(false);
    }
  };

  // --- AGENT SAVE (CLOUDINARY UPLOAD) ---
  const saveAgent = async () => {
    // ✅ GUARD: Prevent double submission
    if (!agentForm.title || isLoading) return;
    setIsLoading(true);

    try {
      let imgUrl = (agentForm.img as string) || '';
      
      if (imgUrl && typeof imgUrl === 'string' && imgUrl.startsWith('data:')) {
        imgUrl = await uploadToCloudinary(imgUrl);
      }

      const base: Omit<Agent, 'id'> = {
        ...(agentForm as Agent),
        img: imgUrl,
      };

      if (editingId && typeof editingId === 'string') {
        try {
          const ref = doc(db, 'agents', editingId);
          await updateDoc(ref, base);
          const updated: Agent = { ...base, id: editingId };
          setAgents(prev => prev.map(a => (a.id === editingId ? updated : a)));
        } catch (updateError: any) {
          if (updateError.code === 'not-found') {
            const ref = await addDoc(collection(db, 'agents'), base);
            const created: Agent = { ...base, id: ref.id };
            setAgents(prev => [created, ...prev]);
          } else {
            throw updateError;
          }
        }
      } else {
        const ref = await addDoc(collection(db, 'agents'), base);
        const created: Agent = { ...base, id: ref.id };
        setAgents(prev => [created, ...prev]);
      }
      
      resetForms();
      alert('AI Agent deployed successfully!');
    } catch (error) {
      console.error('Error saving agent:', error);
      alert('Error saving agent. Please check your image and try again.');
    } finally {
      // ✅ ALWAYS reset loading state, even on error
      setIsLoading(false);
    }
  };

  // --- Clean Delete Handler ---
  const createHandleDelete = <T extends { id: string | number }>(
    collectionName: 'blogs' | 'projects' | 'reviews' | 'agents',
    setItems: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    return async (id: string | number) => {
      if (!window.confirm('Are you sure you want to delete this item?')) return;

      const safeId = String(id);

      try {
        await deleteDoc(doc(db, collectionName, safeId));
        setItems(prev => prev.filter(item => String(item.id) !== safeId));

        if (editingId === safeId) {
          resetForms();
        }
      } catch (error) {
        console.error(`Error deleting from collection ${collectionName}:`, error);
        alert('Could not delete item.');
      }
    };
  };

  // Delete handlers
  const deleteBlog = createHandleDelete<Blog>('blogs', setBlogs);
  const deleteProject = createHandleDelete<Project>('projects', setProjects);
  const deleteReview = createHandleDelete<Review>('reviews', setReviews);
  const deleteAgent = createHandleDelete<Agent>('agents', setAgents);

  // Helper for SEO score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500 bg-green-50';
    if (score >= 50) return 'text-orange-500 bg-orange-50';
    return 'text-red-500 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex overflow-hidden font-sans">
      <motion.aside animate={{ width: isSidebarCollapsed ? 80 : 280 }} className="bg-gunmetal flex flex-col h-screen fixed left-0 top-0 z-50 overflow-hidden shadow-2xl transition-all">
        <div className="p-8 flex items-center justify-between">
          {!isSidebarCollapsed && <h2 className="text-white font-black text-xl">Dev.<span className="text-primary">IQRA</span></h2>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-white/40 hover:text-white transition-colors">
            {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>
        <nav className="flex-grow px-4 mt-8 space-y-2">
          {[
            { id: 'blogs', icon: <BookOpen size={20} />, label: 'Articles' },
            { id: 'projects', icon: <LayoutPanelLeft size={20} />, label: 'Portfolio' },
            { id: 'reviews', icon: <Star size={20} />, label: 'Reviews' },
            { id: 'aiLabs', icon: <BrainCircuit size={20} />, label: 'AI Labs' },
            { id: 'generalSettings', icon: <Settings size={20} />, label: 'General Settings' },
            { id: 'security', icon: <ShieldCheck size={20} />, label: 'Security' },
          ].map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id as any); resetForms(); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === item.id ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
              {item.icon}
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 mt-auto">
          <button onClick={onLogout} className="w-full flex items-center gap-4 p-4 text-white/40 hover:text-red-400 font-bold text-sm transition-all">
            <LogOut size={20} />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      <motion.main animate={{ marginLeft: isSidebarCollapsed ? 80 : 280 }} className="flex-grow p-10 min-h-screen overflow-y-auto bg-gray-50/30">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-gunmetal tracking-tight capitalize">
              {activeTab === 'generalSettings' ? 'General Settings' : activeTab === 'aiLabs' ? 'AI Labs' : activeTab === 'security' ? 'Security' : `${activeTab} Manager`}
            </h1>
            <p className="text-xs text-gunmetal/30 font-bold uppercase tracking-widest mt-1">Professional Content Control</p>
          </div>
          <button onClick={resetForms} className="flex items-center gap-2 px-6 py-3 bg-white border border-black/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gunmetal/40 hover:text-primary transition-all">
            <RefreshCw size={14} className="mr-2 inline" /> Clear Form
          </button>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'blogs' && (
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 bg-white p-10 rounded-[40px] shadow-xl border border-black/5">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3"><FileText className="text-primary" /> {editingId ? 'Edit Article' : 'Draft New Article'}</h3>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Title</label>
                    <input value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} placeholder="Title of the article" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Category</label>
                    <select value={blogForm.cat} onChange={e => setBlogForm({...blogForm, cat: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all">
                      {BLOG_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Short Excerpt</label>
                    <textarea value={blogForm.desc} onChange={e => setBlogForm({...blogForm, desc: e.target.value})} placeholder="A brief description for the listing" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 h-24 outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Full Content</label>
                    <textarea value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} placeholder="Article body... Use ### for headings." className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 h-64 font-mono text-sm outline-none transition-all" />
                  </div>
                  
                  {/* SEO Optimization Section */}
                  <div className="pt-8 mt-8 border-t border-black/5 space-y-6">
                    <div className="flex items-center gap-3 ml-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Search size={16} />
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-gunmetal">Search Engine Optimization (SEO)</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">SEO Title</label>
                        <input 
                          value={blogForm.seo?.title || ''} 
                          onChange={e => setBlogForm({...blogForm, seo: {...(blogForm.seo || emptySEO), title: e.target.value}})} 
                          placeholder="Public title for Search Engines" 
                          className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Focus Keyword</label>
                        <input 
                          value={blogForm.seo?.focusKeyword || ''} 
                          onChange={e => setBlogForm({...blogForm, seo: {...(blogForm.seo || emptySEO), focusKeyword: e.target.value}})} 
                          placeholder="Primary keyword for ranking" 
                          className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Meta Description</label>
                      <textarea 
                        value={blogForm.seo?.description || ''} 
                        onChange={e => setBlogForm({...blogForm, seo: {...(blogForm.seo || emptySEO), description: e.target.value}})} 
                        placeholder="Snippet appearing in search results (160 characters recommended)" 
                        className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 h-24 outline-none transition-all" 
                      />
                    </div>

                    {/* Live SEO Score Widget */}
                    <div className="p-6 rounded-2xl border-2 bg-white/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <BarChart3 size={20} />
                          </div>
                          <div>
                            <h5 className="text-sm font-black text-gunmetal">Live SEO Score</h5>
                            <p className="text-[9px] font-bold text-gunmetal/40 uppercase tracking-widest">Real-time Analysis</p>
                          </div>
                        </div>
                        <div className={`px-5 py-3 rounded-xl border-2 font-black text-lg ${getScoreColorClass(seoScore)}`}>
                          {seoScore}/100
                        </div>
                      </div>
                      <div className="space-y-2 text-[10px] font-bold text-gunmetal/60">
                        <div className="flex items-center justify-between">
                          <span>Focus Keyword in Title</span>
                          <span className={blogForm.seo?.focusKeyword && (blogForm.seo?.title || blogForm.title || '').toLowerCase().includes((blogForm.seo.focusKeyword || '').toLowerCase()) ? 'text-green-500' : 'text-gray-300'}>
                            {blogForm.seo?.focusKeyword && (blogForm.seo?.title || blogForm.title || '').toLowerCase().includes((blogForm.seo.focusKeyword || '').toLowerCase()) ? '+20' : '+0'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Focus Keyword in Description</span>
                          <span className={blogForm.seo?.focusKeyword && (blogForm.seo?.description || blogForm.desc || '').toLowerCase().includes((blogForm.seo.focusKeyword || '').toLowerCase()) ? 'text-green-500' : 'text-gray-300'}>
                            {blogForm.seo?.focusKeyword && (blogForm.seo?.description || blogForm.desc || '').toLowerCase().includes((blogForm.seo.focusKeyword || '').toLowerCase()) ? '+20' : '+0'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Content Length {'>'} 300 words</span>
                          <span className={(blogForm.content || '').trim().split(/\s+/).filter(Boolean).length > 300 ? 'text-green-500' : 'text-gray-300'}>
                            {(blogForm.content || '').trim().split(/\s+/).filter(Boolean).length > 300 ? '+20' : '+0'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Title Length (40-60 chars)</span>
                          <span className={(() => { const t = blogForm.seo?.title || blogForm.title || ''; return t.length >= 40 && t.length <= 60; })() ? 'text-green-500' : 'text-gray-300'}>
                            {(() => { const t = blogForm.seo?.title || blogForm.title || ''; return t.length >= 40 && t.length <= 60; })() ? '+20' : '+0'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">SEO Health Score (0-100)</label>
                      <div className="relative flex items-center">
                        <input 
                          type="number" 
                          min="0" 
                          max="100" 
                          value={blogForm.seo?.score || seoScore} 
                          onChange={e => setBlogForm({...blogForm, seo: {...(blogForm.seo || emptySEO), score: parseInt(e.target.value) || 0}})} 
                          className={`w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-black outline-none transition-all pr-16 ${blogForm.seo?.score ? getScoreColor(blogForm.seo.score) : ''}`} 
                        />
                        <div className="absolute right-4 text-xs font-black opacity-20">%</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Featured Image</label>
                    <div className="p-8 border-2 border-dashed border-primary/10 rounded-2xl text-center cursor-pointer hover:bg-primary/5 transition-all" onClick={() => fileRef.current?.click()}>
                      <input type="file" ref={fileRef} className="hidden" onChange={e => handleFileUpload(e, 'blog')} />
                      {blogForm.img ? <img src={blogForm.img} className="max-h-48 mx-auto rounded-xl shadow-lg" /> : <div className="flex flex-col items-center gap-3 text-primary/30"><Upload size={32} /> <span className="text-[10px] font-black uppercase tracking-widest">Upload Landscape Banner</span></div>}
                    </div>
                  </div>

                  <button 
                    onClick={saveBlog} 
                    disabled={isLoading}
                    className={`w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? '⏳ Uploading to Cloudinary...' : (editingId ? 'Update & Save' : 'Publish Article')}
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gunmetal/40 px-4">Article History</h4>
                {blogs.map((b, idx) => (
                  <div key={`${b.id}-${idx}`} className="bg-white p-6 rounded-[30px] border border-black/5 flex items-center justify-between group hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden shadow-sm relative">
                        <img src={b.img} className="w-full h-full object-cover" alt={b.title} />
                        {b.seo?.score > 0 && (
                          <div className={`absolute bottom-0 right-0 px-1.5 py-0.5 rounded-tl-lg text-[7px] font-black uppercase ${getScoreColor(b.seo.score)}`}>
                            {b.seo.score}%
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-bold text-sm truncate w-40">{b.title}</h5>
                        <p className="text-[8px] font-black text-primary/60 uppercase tracking-widest mt-1">{b.cat}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setEditingId(b.id); setBlogForm({...b, seo: b.seo || { ...emptySEO }}); }} className="p-2 text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-all"><Edit3 size={16} /></button>
                      <button onClick={() => deleteBlog(b.id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 bg-white p-10 rounded-[40px] shadow-xl border border-black/5">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3"><LayoutPanelLeft className="text-primary" /> {editingId ? 'Edit Project' : 'New Portfolio Project'}</h3>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Project Title</label>
                    <input value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} placeholder="e.g. Avanti Wines" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Description</label>
                    <input value={projectForm.subtitle} onChange={e => setProjectForm({...projectForm, subtitle: e.target.value})} placeholder="Short tagline for the project" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Category</label>
                    <select value={projectForm.cat} onChange={e => setProjectForm({...projectForm, cat: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all">
                      {PROJECT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Live Link</label>
                    <input value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})} placeholder="https://..." className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Tech Stack (comma separated)</label>
                    <input value={projectForm.tech?.join(', ')} onChange={e => setProjectForm({...projectForm, tech: e.target.value.split(',').map(s => s.trim())})} placeholder="React, Python, Tailwind" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Preview Image</label>
                    <div className="p-8 border-2 border-dashed border-primary/10 rounded-2xl text-center cursor-pointer hover:bg-primary/5 transition-all" onClick={() => fileRef.current?.click()}>
                      <input type="file" ref={fileRef} className="hidden" onChange={e => handleFileUpload(e, 'project')} />
                      {projectForm.img ? <img src={projectForm.img} className="max-h-48 mx-auto rounded-xl shadow-lg" alt="project" /> : <div className="flex flex-col items-center gap-3 text-primary/30"><ImageIcon size={32} /> <span className="text-[10px] font-black uppercase tracking-widest">Upload Preview Shot</span></div>}
                    </div>
                  </div>
                  <button 
                    onClick={saveProject} 
                    disabled={isLoading}
                    className={`w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? '⏳ Uploading to Cloudinary...' : (editingId ? 'Update Project' : 'Add to Portfolio')}
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gunmetal/40 px-4">Portfolio Gallery</h4>
                {projects.map(p => (
                  <div key={p.id} className="bg-white p-6 rounded-[30px] border border-black/5 flex items-center justify-between group hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden shadow-sm">
                        <img src={p.img} className="w-full h-full object-cover" alt={p.title} />
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-bold text-sm truncate w-40">{p.title}</h5>
                        <p className="text-[8px] font-black text-primary/60 uppercase tracking-widest mt-1">{p.cat}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setEditingId(p.id); setProjectForm(p); }} className="p-2 text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-all"><Edit3 size={16} /></button>
                      <button onClick={() => deleteProject(p.id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 bg-white p-10 rounded-[40px] shadow-xl border border-black/5">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3"><Star className="text-primary" /> {editingId ? 'Edit Review' : 'Add Client Review'}</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Client Name</label>
                      <input value={reviewForm.name} onChange={e => setReviewForm({...reviewForm, name: e.target.value})} placeholder="Muhammad Furqan" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Role / Title</label>
                      <input value={reviewForm.role} onChange={e => setReviewForm({...reviewForm, role: e.target.value})} placeholder="CEO at Novik Edge" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gunmetal/30 ml-4">Client Rating</label>
                    <div className="flex gap-2 bg-gray-50 p-4 rounded-2xl border border-black/5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} onClick={() => setReviewForm({...reviewForm, rating: star})} className={`p-2 transition-all ${reviewForm.rating! >= star ? 'text-orange-400 scale-110' : 'text-gray-300'}`}>
                          <Star size={24} fill={reviewForm.rating! >= star ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Review Text</label>
                    <textarea value={reviewForm.text} onChange={e => setReviewForm({...reviewForm, text: e.target.value})} placeholder="What the client said..." className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 h-32 outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Client Photo (Optional)</label>
                    <div className="p-6 border-2 border-dashed border-primary/10 rounded-2xl text-center cursor-pointer hover:bg-primary/5 transition-all" onClick={() => fileRef.current?.click()}>
                      <input type="file" ref={fileRef} className="hidden" onChange={e => handleFileUpload(e, 'review')} />
                      {reviewForm.avatar?.startsWith('data:') ? <img src={reviewForm.avatar} className="w-20 h-20 mx-auto rounded-full object-cover shadow-md" alt="avatar" /> : <div className="flex flex-col items-center gap-2 text-primary/40"><Upload size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Select Portrait</span></div>}
                    </div>
                  </div>
                  <button 
                    onClick={saveReview} 
                    disabled={isLoading}
                    className={`w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? '⏳ Uploading to Cloudinary...' : (editingId ? 'Update Review' : 'Add Testimonial')}
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gunmetal/40 px-4">Review Carousel History</h4>
                {reviews.map((r, idx) => (
                  <div key={`review-${String(r.id)}-${idx}`} className="bg-white p-6 rounded-[30px] border border-black/5 flex items-center justify-between group hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                      {r.avatar?.startsWith('data:') || r.avatar?.startsWith('http') ? (
                        <img src={r.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm" alt={r.name} />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs">{r.name.substring(0, 2).toUpperCase()}</div>
                      )}
                      <div className="min-w-0">
                        <h5 className="font-bold text-sm truncate">{r.name}</h5>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(r.rating)].map((_, i) => <Star key={i} size={8} fill="currentColor" className="text-orange-400" />)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setEditingId(r.id); setReviewForm(r); }} className="p-2 text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-all"><Edit3 size={16} /></button>
                      <button onClick={() => deleteReview(r.id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'aiLabs' && (
            <div className="grid lg:grid-cols-12 gap-10 pb-20">
              <div className="lg:col-span-7 bg-white p-10 rounded-[40px] shadow-xl border border-black/5">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3"><BrainCircuit className="text-primary" /> {editingId ? 'Edit AI System' : 'Deploy AI Agent'}</h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Agent Title</label>
                      <input value={agentForm.title} onChange={e => setAgentForm({...agentForm, title: e.target.value})} placeholder="Agent Name" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Icon Type</label>
                      <select value={agentForm.icon} onChange={e => setAgentForm({...agentForm, icon: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all">
                        {AGENT_ICONS.map(i => <option key={i}>{i}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Short Description</label>
                    <input value={agentForm.desc} onChange={e => setAgentForm({...agentForm, desc: e.target.value})} placeholder="Brief hook line for the card" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Tier</label>
                      <div className="flex bg-gray-50 p-2 rounded-2xl border border-black/5">
                        <button onClick={() => setAgentForm({...agentForm, type: 'free'})} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${agentForm.type === 'free' ? 'bg-primary text-white shadow-md' : 'text-gunmetal/40 hover:bg-black/5'}`}>Free</button>
                        <button onClick={() => setAgentForm({...agentForm, type: 'premium'})} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${agentForm.type === 'premium' ? 'bg-gunmetal text-white shadow-md' : 'text-gunmetal/40 hover:bg-black/5'}`}>Premium</button>
                      </div>
                    </div>
                    {agentForm.type === 'premium' && (
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Price ($)</label>
                        <input value={agentForm.price} onChange={e => setAgentForm({...agentForm, price: e.target.value})} placeholder="e.g. 149" className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Long Description</label>
                    <textarea value={agentForm.longDesc} onChange={e => setAgentForm({...agentForm, longDesc: e.target.value})} placeholder="Full solution details..." className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 h-32 outline-none transition-all" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">How it Works logic</label>
                    <textarea value={agentForm.howItWorks} onChange={e => setAgentForm({...agentForm, howItWorks: e.target.value})} placeholder="Explain architectural steps..." className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 h-24 outline-none transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Workflow Steps (Visualized in Modal)</label>
                    <div className="space-y-3">
                      {agentForm.workflowNodes?.map((node, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input 
                            value={node} 
                            onChange={e => {
                              const newNodes = [...(agentForm.workflowNodes || [])];
                              newNodes[idx] = e.target.value;
                              setAgentForm({...agentForm, workflowNodes: newNodes});
                            }}
                            placeholder={`Step ${idx + 1}: e.g. Trigger: Lead Captured`}
                            className="flex-grow p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all" 
                          />
                          <button 
                            onClick={() => setAgentForm({...agentForm, workflowNodes: agentForm.workflowNodes?.filter((_, i) => i !== idx)})}
                            className="p-4 text-red-500 bg-red-50 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => setAgentForm({...agentForm, workflowNodes: [...(agentForm.workflowNodes || []), '']})}
                        className="w-full py-3 border-2 border-dashed border-primary/20 text-primary rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-primary/5 transition-all"
                      >
                        <Plus size={16} /> Add Workflow Step
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Agent Banner Image</label>
                    <div className="p-8 border-2 border-dashed border-primary/10 rounded-2xl text-center cursor-pointer hover:bg-primary/5 transition-all" onClick={() => fileRef.current?.click()}>
                      <input type="file" ref={fileRef} className="hidden" onChange={e => handleFileUpload(e, 'agent')} />
                      {agentForm.img ? <img src={agentForm.img} className="max-h-48 mx-auto rounded-xl shadow-lg" alt="agent" /> : <div className="flex flex-col items-center gap-3 text-primary/30"><Upload size={32} /> <span className="text-[10px] font-black uppercase tracking-widest">Select Agent Visualization</span></div>}
                    </div>
                  </div>
                  <button 
                    onClick={saveAgent} 
                    disabled={isLoading}
                    className={`w-full py-6 bg-primary text-white rounded-[32px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? '⏳ Uploading to Cloudinary...' : (editingId ? 'Update Deployment' : 'Deploy to AI Lab')}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gunmetal/40 px-4">Active Lab Swarms</h4>
                {agents.map(a => (
                  <div key={a.id} className="bg-white p-6 rounded-[30px] border border-black/5 flex items-center justify-between group hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${a.type === 'premium' ? 'bg-gunmetal text-white' : 'bg-primary/5 text-primary'}`}><Zap size={20} /></div>
                      <div>
                        <h5 className="font-bold text-sm truncate w-40">{a.title}</h5>
                        <p className="text-[8px] font-black opacity-40 uppercase tracking-widest mt-1">{a.type} {a.type === 'premium' && `· $${a.price}`}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setEditingId(a.id); setAgentForm(a); }} className="p-2 text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-all"><Edit3 size={16} /></button>
                      <button onClick={() => deleteAgent(a.id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'generalSettings' && (
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 bg-white p-10 rounded-[40px] shadow-xl border border-black/5">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3"><Settings className="text-primary" /> General Settings</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveSiteSettings(siteSettings);
                    alert('Site settings saved successfully!');
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Site Name</label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                      placeholder="e.g. Iqra Agency"
                      className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Default Meta Description</label>
                    <textarea
                      value={siteSettings.defaultMetaDescription}
                      onChange={(e) => setSiteSettings({ ...siteSettings, defaultMetaDescription: e.target.value })}
                      placeholder="Default description for pages without specific SEO settings"
                      className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 h-24 outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="pt-6 border-t border-black/5">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gunmetal mb-4 flex items-center gap-2">
                      <Globe size={16} className="text-primary" />
                      Social Media Links
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4 flex items-center gap-2">
                          <Twitter size={14} className="text-primary" />
                          Twitter URL
                        </label>
                        <input
                          type="url"
                          value={siteSettings.socialLinks?.twitter || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, socialLinks: { ...siteSettings.socialLinks, twitter: e.target.value } })}
                          placeholder="https://twitter.com/yourhandle"
                          className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4 flex items-center gap-2">
                          <Facebook size={14} className="text-primary" />
                          Facebook URL
                        </label>
                        <input
                          type="url"
                          value={siteSettings.socialLinks?.facebook || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, socialLinks: { ...siteSettings.socialLinks, facebook: e.target.value } })}
                          placeholder="https://facebook.com/yourpage"
                          className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4 flex items-center gap-2">
                          <Linkedin size={14} className="text-primary" />
                          LinkedIn URL
                        </label>
                        <input
                          type="url"
                          value={siteSettings.socialLinks?.linkedin || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, socialLinks: { ...siteSettings.socialLinks, linkedin: e.target.value } })}
                          placeholder="https://linkedin.com/company/yourcompany"
                          className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
                  >
                    Save Settings
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 bg-white p-10 rounded-[40px] shadow-xl border border-black/5">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3"><ShieldCheck className="text-primary" /> Security</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSecurityMessage(null);

                    const creds = getAdminCredentials();
                    if (securityForm.oldPassword !== creds.password) {
                      setSecurityMessage({ type: 'error', text: 'Old password is incorrect.' });
                      return;
                    }
                    if (!securityForm.newPassword || securityForm.newPassword.trim().length < 6) {
                      setSecurityMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
                      return;
                    }

                    setAdminCredentials({ ...creds, password: securityForm.newPassword });
                    setSecurityForm({ oldPassword: '', newPassword: '' });
                    setSecurityMessage({ type: 'success', text: 'Password updated successfully.' });
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">Old Password</label>
                    <input
                      type="password"
                      value={securityForm.oldPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, oldPassword: e.target.value })}
                      placeholder="Enter your current password"
                      className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gunmetal/30 ml-4">New Password</label>
                    <input
                      type="password"
                      value={securityForm.newPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                      placeholder="Choose a new password"
                      className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 font-bold outline-none transition-all"
                      required
                    />
                  </div>

                  {securityMessage && (
                    <div
                      className={`px-5 py-4 rounded-2xl border text-[11px] font-black uppercase tracking-widest ${
                        securityMessage.type === 'success'
                          ? 'bg-green-50 text-green-600 border-green-100'
                          : 'bg-red-50 text-red-600 border-red-100'
                      }`}
                    >
                      {securityMessage.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default AdminDashboard;