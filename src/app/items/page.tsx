'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  MapPin,
  Tag,
  Layers,
  Sparkles,
  RotateCcw,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useItems } from '../../context/ItemsContext';
import ItemCard from '../../components/ItemCard';
import { CAMPUS_ZONES } from '../../lib/mockData';
import { ItemCategory, ItemStatus, ItemType } from '../../lib/types';
import { findMatchesForItem } from '../../lib/matchEngine';

const CATEGORIES: { key: ItemCategory; label: string }[] = [
  { key: 'ELECTRONICS', label: 'Electronics & Gadgets' },
  { key: 'WALLETS_IDS', label: 'Wallets & IDs' },
  { key: 'KEYS_CARDS', label: 'Keys & Cards' },
  { key: 'BOOKS_STATIONERY', label: 'Books & Stationery' },
  { key: 'BAGS_BACKPACKS', label: 'Bags & Backpacks' },
  { key: 'CLOTHING', label: 'Clothing & Apparel' },
  { key: 'ACCESSORIES', label: 'Accessories' },
  { key: 'OTHER', label: 'Other Items' },
];

function BrowseItemsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialZone = searchParams.get('zone') || 'ALL';
  const initialType = (searchParams.get('type') as ItemType) || 'ALL';

  const { items } = useItems();

  const [search, setSearch] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState<ItemType | 'ALL'>(initialType);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'ALL'>('ALL');
  const [selectedZone, setSelectedZone] = useState<string>(initialZone);
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | 'ALL'>('ALL');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search query filter
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesReporter = item.reporterName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesReporter) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== 'ALL' && item.type !== selectedType) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }

      // Campus zone filter
      if (selectedZone !== 'ALL' && item.campusZoneId !== selectedZone) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'ALL' && item.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [items, search, selectedType, selectedCategory, selectedZone, selectedStatus]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedType('ALL');
    setSelectedCategory('ALL');
    setSelectedZone('ALL');
    setSelectedStatus('ALL');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md mb-2">
            <Layers className="w-3.5 h-3.5" /> University Live Registry
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Browse Lost & Found Articles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search active university records, inspect item locations, or file a verified ownership claim.
          </p>
        </div>

        {/* Quick Report CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/report/lost"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 px-3.5 py-2 rounded-xl transition"
          >
            <PlusCircle className="w-4 h-4 text-rose-600" /> Report Lost
          </Link>
          <Link
            href="/report/found"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-linear-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 px-4 py-2 rounded-xl transition shadow-xs"
          >
            <PlusCircle className="w-4 h-4" /> Report Found
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        {/* Search input & Type pills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by keyword (e.g. MacBook, ID card, keys, room 302)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
            />
          </div>

          <div className="lg:col-span-4 flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['ALL', 'LOST', 'FOUND'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer text-center ${
                  selectedType === t
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t === 'ALL' ? 'All Types' : t === 'LOST' ? 'Lost Items' : 'Found Items'}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ItemCategory | 'ALL')}
              className="w-full text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            >
              <option value="ALL">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Campus Facility / Zone
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            >
              <option value="ALL">All Campus Zones</option>
              {CAMPUS_ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name} ({z.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Verification Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ItemStatus | 'ALL')}
              className="w-full text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open / Searching / In Holding</option>
              <option value="CLAIM_PENDING">Claim Under Review</option>
              <option value="VERIFIED">Claim Approved (Ready for Handover)</option>
              <option value="RETURNED">Returned & Handed Over</option>
            </select>
          </div>
        </div>

        {/* Results summary and Reset */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Showing <strong className="text-slate-900">{filteredItems.length}</strong> matching articles
          </span>
          {(search || selectedType !== 'ALL' || selectedCategory !== 'ALL' || selectedZone !== 'ALL' || selectedStatus !== 'ALL') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-800 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No articles found matching your criteria
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, campus facility filter, or submit a new report.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="text-xs bg-slate-900 text-white font-bold px-4 py-2 rounded-xl hover:bg-slate-800 transition cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const matches = findMatchesForItem(item, items);
            const hasMatch = matches.length > 0 && matches[0].confidenceScore >= 60;
            return <ItemCard key={item.id} item={item} hasMatch={hasMatch} />;
          })}
        </div>
      )}
    </div>
  );
}

export default function BrowseItemsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading university registry...</div>}>
      <BrowseItemsContent />
    </Suspense>
  );
}
