
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import ClientReviews from './components/ClientReviews';
import BlogSection from './components/BlogSection';
import BlogDetail from './components/BlogDetail';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import AISolutions from './components/AISolutions';
import AdminDashboard from './components/AdminDashboard';
import { useDataEngine } from './src/hooks/useDataEngine';
import Login from './src/pages/Login';
import PrivateRoute from './src/components/PrivateRoute';
import { ensureAdminCredentials, logoutAdmin } from './src/utils/adminAuth';
import { usePathname } from './src/router/usePathname';
import { navigate } from './src/router/navigation';
import SEO from './src/components/SEO';

const App: React.FC = () => {
  const pathname = usePathname();
  const [view, setView] = useState<'home' | 'ai-solutions' | 'blog-detail'>('home');
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  
  const { agents, setAgents, projects, setProjects, blogs, setBlogs, reviews, setReviews } = useDataEngine();

  useEffect(() => {
    ensureAdminCredentials();
  }, []);

  // Load site-wide SEO settings from localStorage
  const getSiteSettings = () => {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem('siteSettings');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  };

  const siteSettings = getSiteSettings();

  const route: 'site' | 'login' | 'admin' =
    pathname.startsWith('/admin') ? 'admin' : pathname.startsWith('/login') ? 'login' : 'site';

  useEffect(() => {
    if (route !== 'site') return;
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        navigate('/admin');
        return;
      }
      if (hash === '#ai-solutions') setView('ai-solutions');
      else {
        if (!hash.startsWith('#blog') && view !== 'blog-detail' && view === 'ai-solutions') {
          setView('home');
        }
        if (view === 'home') {
          const id = hash.substring(1);
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [view, route]);

  const handleNavigate = (newView: 'home' | 'ai-solutions' | 'admin') => {
    if (newView === 'admin') {
      navigate('/admin');
      return;
    }
    window.location.hash = newView === 'home' ? '' : newView;
    setView(newView === 'admin' ? 'home' : newView);
    window.scrollTo(0, 0);
  };

  const openBlog = (blog: any) => {
    setSelectedBlog(blog);
    setView('blog-detail');
    window.scrollTo(0, 0);
  };

  // Default SEO values from site settings
  const defaultTitle = siteSettings?.siteName || 'Dev.IQRA | Digital Ecosystem Architect';
  const defaultDescription = siteSettings?.defaultMetaDescription || 'A high-end, minimalist agency landing page with sophisticated typography, soft gradients, and modern layout.';

  return (
    <>
      {/* Global SEO (uses site-wide defaults if no page-specific SEO) */}
      {route === 'site' && (
        <SEO 
          title={defaultTitle}
          description={defaultDescription}
          keywords="web development, digital agency, portfolio, AI solutions"
          url={typeof window !== 'undefined' ? window.location.origin : ''}
        />
      )}
      <AnimatePresence mode="wait">
        {route === 'login' && (
        <motion.div
          key="route-login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Login />
        </motion.div>
      )}

      {route === 'admin' && (
        <motion.div
          key="route-admin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <PrivateRoute>
            <AdminDashboard
              onLogout={() => {
                logoutAdmin();
                setSelectedBlog(null);
                setView('home');
                window.location.hash = '';
                navigate('/', { replace: true });
                window.scrollTo(0, 0);
              }}
            />
          </PrivateRoute>
        </motion.div>
      )}

      {route === 'site' && (
        <motion.div
          key="route-site"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative min-h-screen flex flex-col"
        >
          <Navbar onNavigate={handleNavigate} currentView={view} />

          <main className={`flex-grow relative ${view !== 'blog-detail' ? 'pt-20 md:pt-28' : ''}`}>
            <AnimatePresence mode="wait">
              {view === 'home' && (
                <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <section id="home" className="px-[5%]"><Hero onExploreAI={() => handleNavigate('ai-solutions')} /></section>
                  <TechMarquee />
                  <section id="about" className="px-[5%] py-20"><About /></section>
                  <section id="services" className="px-[5%] py-20"><Services /></section>
                  <section id="portfolio" className="px-[5%] py-20"><Portfolio projects={projects} /></section>
                  <section id="reviews" className="py-20"><ClientReviews reviews={reviews} /></section>
                  <section id="blog" className="px-[5%] py-20"><BlogSection blogs={blogs} onReadMore={openBlog} /></section>
                </motion.div>
              )}

              {view === 'blog-detail' && (
                <motion.div key="blog-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <BlogDetail blog={selectedBlog} blogs={blogs} onBack={() => handleNavigate('home')} onReadMore={openBlog} />
                </motion.div>
              )}

              {view === 'ai-solutions' && (
                <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AISolutions agents={agents} onBack={() => handleNavigate('home')} />
                </motion.div>
              )}
            </AnimatePresence>

            <section id="contact" className="px-[5%] py-20">
              <Contact />
            </section>
          </main>

          <WhatsAppButton />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default App;
