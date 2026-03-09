import React from 'react';
import { Shield, Globe, Trash2, Info, Lock, ChevronRight, Settings } from 'lucide-react';

export default function PrivacyPolicyContent() {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm font-sans text-slate-800">
      
      {/* Title Section */}
      <div className="text-center mb-16 border-b border-slate-100 pb-10">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-full mb-4">
          <Lock size={32} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Privacy & Cookie Policy</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Comprehensive guide to understanding and managing your website data across Google Chrome, Apple Safari, and Mozilla Firefox.
        </p>
      </div>

      {/* Global Understanding */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4 text-slate-900">
          <Info className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold">Understanding Cookies</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="font-bold mb-1 text-blue-700">First-party Cookies</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Created by the site you visit. Used to remember your login and site preferences.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="font-bold mb-1 text-purple-700">Third-party Cookies</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Created by other sites to embed content (ads/videos) and track activity across the web.</p>
          </div>
        </div>
      </section>

      {/* 1. Google Chrome */}
      <section className="mb-12 p-6 bg-blue-50/30 border border-blue-100 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-900">Google Chrome</h2>
        </div>
        
        <div className="space-y-6 text-sm">
          <div>
            <h3 className="font-bold flex items-center gap-2 mb-2 text-blue-800 uppercase tracking-wide">
              <Trash2 size={16} /> Delete Data
            </h3>
            <p className="mb-2">Click <strong>More (⋮)</strong> &gt; <strong>Settings</strong> &gt; <strong>Privacy and security</strong> &gt; <strong>Delete browsing data</strong>. Select a time range and check &quot;Cookies and other site data&quot;.</p>
          </div>
          
          <div>
            <h3 className="font-bold flex items-center gap-2 mb-2 text-blue-800 uppercase tracking-wide">
              <Shield size={16} /> Manage Exceptions
            </h3>
            <p>Go to <strong>Settings</strong> &gt; <strong>Privacy and security</strong> &gt; <strong>Third-party cookies</strong>. Here you can add specific sites to your &quot;Allowed&quot; or &quot;Blocked&quot; lists using patterns like <code>[*.]example.com</code>.</p>
          </div>
        </div>
      </section>

      {/* 2. Apple Safari */}
      <section className="mb-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="text-slate-700" size={24} />
          <h2 className="text-2xl font-bold text-slate-900">Apple Safari (Mac)</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1"><ChevronRight size={16} className="text-slate-400" /></div>
            <p className="text-sm">Go to <strong>Safari</strong> in your top menu bar and select <strong>Settings...</strong> (or Preferences).</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1"><ChevronRight size={16} className="text-slate-400" /></div>
            <p className="text-sm">Click the <strong>Privacy</strong> tab in the icon row.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1"><ChevronRight size={16} className="text-slate-400" /></div>
            <p className="text-sm">To remove all data, click <strong>Remove All Website Data</strong>. To see specific sites, click <strong>Manage Website Data</strong>.</p>
          </div>
          <div className="bg-white border-l-4 border-slate-800 p-4 mt-4 shadow-sm">
            <p className="text-xs italic text-slate-500 font-medium">
              &quot;Prevent cross-site tracking&quot; is enabled by default in Safari to limit third-party cookie sharing.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Mozilla Firefox */}
      <section className="p-6 bg-orange-50/40 border border-orange-100 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-orange-600" size={24} />
          <h2 className="text-2xl font-bold text-slate-900">Mozilla Firefox</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-black text-orange-800 uppercase mb-3">Protection Levels</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <strong>Standard:</strong> Balanced protection (Default).
              </li>
              <li className="flex gap-2">
                <strong>Strict:</strong> Blocks all trackers; may break some sites.
              </li>
              <li className="flex gap-2">
                <strong>Custom:</strong> Choose which cookies to block.
              </li>
            </ul>
          </div>
          
          <div className="text-sm space-y-4">
            <h3 className="text-sm font-black text-orange-800 uppercase mb-3">Clear On Exit</h3>
            <p>Click the <strong>Menu (≡)</strong> &gt; <strong>Settings</strong> &gt; <strong>Privacy & Security</strong>.</p>
            <p>Scroll to <strong>Cookies and Site Data</strong>. You can check the box <strong>&quot;Delete cookies and site data when Firefox is closed&quot;</strong> for automatic privacy.</p>
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <div className="mt-16 pt-8 border-t border-slate-100 text-[11px] text-slate-400 text-center uppercase tracking-widest">
        End of Privacy and Cookie Management Documentation
      </div>
    </div>
  );
}