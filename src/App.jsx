import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import WorkSection from './components/WorkSection';
import CaseStudyModal from './components/CaseStudyModal';
import DifferenceSection from './components/DifferenceSection';
import BeforeAfterSection from './components/BeforeAfterSection';
import ProcessSection from './components/ProcessSection';
import ServicesSection from './components/ServicesSection';
import ValuePropSection from './components/ValuePropSection';
import AboutSection from './components/AboutSection';
import SalesCtaSection from './components/SalesCtaSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import QuickLeadModal from './components/QuickLeadModal';
import AdminCRM from './components/admin/AdminCRM';
import AdminLogin from './components/admin/AdminLogin';
import FloatingCta from './components/FloatingCta';
import InteractiveExtras from './components/InteractiveExtras';
import { supabase, isSupabaseConfigured } from './services/supabaseClient';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [quickLeadOpen, setQuickLeadOpen] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(
    window.location.pathname.startsWith('/admin')
  );
  const [adminSession, setAdminSession] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Monitor Supabase Auth Session
  useEffect(() => {
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setAdminSession(session);
        setCheckingAuth(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setAdminSession(session);
        setCheckingAuth(false);
      });

      return () => subscription.unsubscribe();
    } else {
      setCheckingAuth(false);
    }
  }, []);

  // Listen to browser history navigation for /admin
  useEffect(() => {
    const handlePopState = () => {
      setIsAdminRoute(window.location.pathname.startsWith('/admin'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminRoute(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPortfolio = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    setAdminSession(null);
  };

  // If visiting /admin
  if (isAdminRoute) {
    if (checkingAuth) {
      return (
        <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-slate-400 text-xs">
          Checking Supabase credentials...
        </div>
      );
    }

    if (adminSession) {
      return (
        <AdminCRM
          user={adminSession.user}
          onLogout={handleLogout}
          onBackToPortfolio={navigateToPortfolio}
        />
      );
    }

    return (
      <AdminLogin
        onLoginSuccess={(session) => setAdminSession(session)}
        onBackToPortfolio={navigateToPortfolio}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Scroll Progress & Back to Top */}
      <InteractiveExtras />

      {/* Global Navigation */}
      <Navbar onOpenQuickLead={() => setQuickLeadOpen(true)} />

      {/* Main Content Layout */}
      <main>
        {/* Section 1: Hero */}
        <Hero 
          onOpenQuickLead={() => setQuickLeadOpen(true)} 
          onSelectProject={(proj) => setSelectedProject(proj)} 
        />

        {/* Section 2: The Problem */}
        <ProblemSection onOpenQuickLead={() => setQuickLeadOpen(true)} />

        {/* Section 3: My Work & Portfolio Grid */}
        <WorkSection onSelectProject={(proj) => setSelectedProject(proj)} />

        {/* Section 4: Why These Websites Are Different */}
        <DifferenceSection />

        {/* Section 5: Before → After Transformation */}
        <BeforeAfterSection onOpenQuickLead={() => setQuickLeadOpen(true)} />

        {/* Section 6: How I Work (4-Step Timeline) */}
        <ProcessSection onOpenQuickLead={() => setQuickLeadOpen(true)} />

        {/* Section 7: What I Can Build (Services) */}
        <ServicesSection onOpenQuickLead={() => setQuickLeadOpen(true)} />

        {/* Section 8: The Value Proposition (Work While You Sleep) */}
        <ValuePropSection onOpenQuickLead={() => setQuickLeadOpen(true)} />

        {/* Section 9: About Me (Lovish Garg) */}
        <AboutSection />

        {/* Section 10: Sales CTA */}
        <SalesCtaSection onOpenQuickLead={() => setQuickLeadOpen(true)} />

        {/* Contact & Quote Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenQuickLead={() => setQuickLeadOpen(true)} 
        onOpenAdminLeads={navigateToAdmin}
      />

      {/* Interactive Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenQuickLead={() => {
            setSelectedProject(null);
            setQuickLeadOpen(true);
          }}
        />
      )}

      {/* Quick Lead Modal */}
      <QuickLeadModal
        isOpen={quickLeadOpen}
        onClose={() => setQuickLeadOpen(false)}
      />

      {/* Floating CTA & Mobile Sticky Bar */}
      <FloatingCta onOpenQuickLead={() => setQuickLeadOpen(true)} />

    </div>
  );
}
