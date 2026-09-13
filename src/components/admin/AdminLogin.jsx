import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertTriangle, ArrowLeft } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../services/supabaseClient';

export default function AdminLogin({ onLoginSuccess, onBackToPortfolio }) {
  const [email, setEmail] = useState('garglovish938@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Verify Supabase is connected
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      setErrorMessage('Supabase connection is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to environment variables.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) {
        throw error;
      }

      // Security: Authorize only official admin email
      if (data.user?.email?.toLowerCase() !== 'garglovish938@gmail.com') {
        await supabase.auth.signOut();
        throw new Error('Access denied. Only garglovish938@gmail.com is authorized to access the CRM.');
      }

      if (data.session) {
        onLoginSuccess(data.session);
      }
    } catch (err) {
      console.error('[AUTH ERROR]', err);
      setErrorMessage(err.message || 'Invalid admin credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#07090e] text-slate-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow bg-cyan-500/15 top-1/4 left-1/4 w-[500px] h-[500px]" />
      <div className="ambient-glow bg-blue-600/15 bottom-1/4 right-1/4 w-[500px] h-[500px]" />

      <div className="w-full max-w-md bg-[#0c1018] border border-cyan-500/30 rounded-2xl shadow-glow-cyan p-7 sm:p-9 text-left relative z-10 space-y-6">
        
        {/* Back link */}
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio Website</span>
        </button>

        {/* Header */}
        <div className="space-y-2 text-center pt-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] shadow-glow-cyan mx-auto">
            <div className="w-full h-full bg-[#07090e] rounded-[15px] flex items-center justify-center font-extrabold text-cyan-400 text-base font-display">
              LG
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Client CRM Admin Login
          </h2>
          <p className="text-xs text-slate-400">
            Secure administrative access for Lovish Garg
          </p>
        </div>

        {/* Status notice */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] font-medium text-slate-200">Protected by Supabase Auth</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
            RLS Active
          </span>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300" htmlFor="admin-email">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-email"
                type="email"
                required
                placeholder="garglovish938@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#121722] border border-slate-700/80 text-white placeholder:text-slate-500 text-xs focus:border-cyan-400 focus:bg-[#151c2a] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300" htmlFor="admin-pass">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-pass"
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#121722] border border-slate-700/80 text-white placeholder:text-slate-500 text-xs focus:border-cyan-400 focus:bg-[#151c2a] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs shadow-glow-cyan transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Log In to CRM Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-500">
          Protected by Supabase Row Level Security & JWT Authentication
        </div>

      </div>
    </div>
  );
}
