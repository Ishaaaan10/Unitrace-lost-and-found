'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Shield,
  Sparkles,
  ArrowRight,
  PlusCircle,
  MapPin,
  CheckCircle2,
  Clock,
  Layers,
  Award,
  HelpCircle,
  FileCheck,
  ChevronRight,
} from 'lucide-react';
import { useItems } from '../context/ItemsContext';
import ItemCard from '../components/ItemCard';
import CampusZoneMap from '../components/CampusZoneMap';

export default function HomePage() {
  const router = useRouter();
  const { items } = useItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'LOST' | 'FOUND'>('ALL');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/items?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/items');
    }
  };

  const activeItems = items.filter((i) => i.status !== 'RETURNED');
  const returnedCount = items.filter((i) => i.status === 'RETURNED').length;
  const totalCount = items.length;
  const recoveryRate = Math.round((returnedCount / (totalCount || 1)) * 100);

  const displayedItems = items
    .filter((i) => {
      if (filterType === 'ALL') return true;
      return i.type === filterType;
    })
    .slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-brand-950 via-slate-900 to-slate-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 px-3.5 py-1 rounded-full text-xs font-semibold text-brand-300 backdrop-blur-md transition">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Next-Gen Smart Campus Item Recovery Network</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Never Lose What&apos;s Yours on <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-brand-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
              Campus Ever Again.
            </span>
          </h1>

          {/* Subhead */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            UniTrace connects students, faculty, and campus security officers with AI-driven
            counterpart matching, cryptographic claim challenges, and verified OTP physical handover.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-2"
          >
            <div className="pl-3 text-slate-400">
              <Search className="w-5 h-5 text-brand-300" />
            </div>
            <input
              type="text"
              placeholder="Search lost laptop, student ID, keys, blue backpack, AirPods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-hidden px-2"
            />
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition shadow-lg shrink-0 cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/report/lost"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-rose-600/30"
            >
              <PlusCircle className="w-4 h-4" /> I Lost an Item
            </Link>
            <Link
              href="/report/found"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-emerald-600/30"
            >
              <PlusCircle className="w-4 h-4" /> I Found an Item
            </Link>
            <Link
              href="/campus-map"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition border border-white/10"
            >
              <MapPin className="w-4 h-4 text-brand-400" /> Campus Zones
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics & Impact Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{recoveryRate}%</p>
              <p className="text-xs text-slate-500 font-medium">Campus Recovery Rate</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{returnedCount}</p>
              <p className="text-xs text-slate-500 font-medium">Items Successfully Restored</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">&lt; 24 Hrs</p>
              <p className="text-xs text-slate-500 font-medium">Avg Handover Turnaround</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">100%</p>
              <p className="text-xs text-slate-500 font-medium">Verified Ownership Security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Recently Reported Articles
            </h2>
            <p className="text-xs text-slate-500">
              Live updates across all university departments, laboratories, and residence halls.
            </p>
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            {(['ALL', 'LOST', 'FOUND'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterType === t
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t === 'ALL' ? 'All Items' : t === 'LOST' ? 'Lost Items' : 'Found Items'}
              </button>
            ))}
          </div>
        </div>

        {/* Item Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center pt-4">
          <Link
            href="/items"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md"
          >
            Explore All Campus Records ({totalCount})
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* How UniTrace Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              The UniTrace Protocol
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              How We Safeguard Student Belongings
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Unlike public boards where anyone can falsely claim an item, UniTrace enforces a three-stage anti-theft verification protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Step 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h4 className="text-base font-bold text-white">Report & Set Secret Challenge</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When filing a lost or found report, reporters specify a confidential question (e.g., sticker details, wallpaper, lock screen initials).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h4 className="text-base font-bold text-white">Smart AI Auto-Matching</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our algorithm scores category, keywords, campus zone, and timestamps to automatically identify potential matches and notify the owner.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h4 className="text-base font-bold text-white">Digital Pass & OTP Handover</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Security reviews verification answers, issues a digital Claim Pass with QR & OTP, and prints a formal handover certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Campus Map Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CampusZoneMap />
      </section>

      {/* Fullstack Lab & Viva Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-700/40">
          <div className="space-y-1 max-w-2xl">
            <span className="text-[11px] font-bold bg-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Fullstack Engineering Lab Submission
            </span>
            <h3 className="text-xl font-black">
              Ready to Defend Your Project in Front of the Professor?
            </h3>
            <p className="text-xs text-emerald-100">
              Access the built-in Viva Defense Kit featuring architecture diagrams, REST API endpoints, state management breakdowns, and standard viva defense answers.
            </p>
          </div>
          <Link
            href="/viva-guide"
            className="inline-flex items-center gap-2 bg-white text-emerald-950 hover:bg-emerald-50 font-black text-xs px-5 py-3 rounded-xl transition shadow-lg shrink-0"
          >
            Open Viva Defense Kit
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
