import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { ensureAdminCredentials, setAdminLoggedIn, verifyAdminCredentials } from '../utils/adminAuth';
import { navigate } from '../router/navigation';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    ensureAdminCredentials();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const ok = verifyAdminCredentials(form.username.trim(), form.password);
    if (!ok) {
      setAdminLoggedIn(false);
      setError('Invalid credentials. Please try again.');
      return;
    }

    setAdminLoggedIn(true);
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6FF] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md glass p-12 rounded-[50px] border border-white shadow-2xl bg-white/70 text-center"
      >
        <div className="w-20 h-20 bg-gunmetal rounded-[32px] flex items-center justify-center text-white mx-auto mb-6">
          <ShieldCheck size={40} />
        </div>

        <h1 className="text-2xl font-black text-gunmetal tracking-tighter uppercase mb-2">Admin Dashboard</h1>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gunmetal/30 mb-8">Authorization Required</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 rounded-2xl bg-white border border-black/5 font-bold text-gunmetal placeholder:text-gunmetal/30 outline-none transition-all"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-2xl bg-white border border-black/5 font-bold text-gunmetal placeholder:text-gunmetal/30 outline-none transition-all"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="current-password"
            required
          />

          {error ? (
            <div className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            Enter Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate('/', { replace: true })}
            className="w-full py-4 bg-white text-gunmetal/60 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-black/5 hover:text-primary transition-all"
          >
            Back to Website
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

