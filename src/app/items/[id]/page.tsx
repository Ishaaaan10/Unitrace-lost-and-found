'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Clock,
  Shield,
  ShieldCheck,
  Gift,
  User,
  ArrowLeft,
  Sparkles,
  Share2,
  Printer,
  HelpCircle,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { useItems } from '../../../context/ItemsContext';
import { useAuth } from '../../../context/AuthContext';
import { findMatchesForItem } from '../../../lib/matchEngine';
import { CAMPUS_ZONES } from '../../../lib/mockData';
import ClaimModal from '../../../components/ClaimModal';
import SmartMatchBanner from '../../../components/SmartMatchBanner';
import DigitalClaimPass from '../../../components/DigitalClaimPass';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;

  const { getItemById, items, claims } = useItems();
  const { currentUser, isSecurityOfficer } = useAuth();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const item = getItemById(itemId);

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <AlertTriangle className="w-8 h-8 text-amber-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Article Record Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested item ID &quot;{itemId}&quot; does not exist or may have been archived.
        </p>
        <Link
          href="/items"
          className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Registry
        </Link>
      </div>
    );
  }

  const zone = CAMPUS_ZONES.find((z) => z.id === item.campusZoneId);
  const matches = findMatchesForItem(item, items);
  const isReporter = currentUser.email.toLowerCase() === item.reporterEmail.toLowerCase();

  // Check if current user has an active claim on this item
  const userClaim = claims.find(
    (c) =>
      c.itemId === item.id &&
      (c.claimantEmail.toLowerCase() === currentUser.email.toLowerCase() ||
        c.claimantRollNo.toLowerCase() === currentUser.rollNo.toLowerCase())
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button & top controls */}
      <div className="flex items-center justify-between">
        <Link
          href="/items"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Registry
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copiedLink ? 'Link Copied!' : 'Share Article'}
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
        </div>
      </div>

      {/* Smart Match Banner if algorithm detected counterpart */}
      {matches.length > 0 && matches[0].confidenceScore >= 50 && (
        <SmartMatchBanner recommendation={matches[0]} currentType={item.type} />
      )}

      {/* Main Grid: Left Image & Details, Right Action Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Media, Overview, Verification, Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span
                  className={`px-3.5 py-1 rounded-full text-xs font-black tracking-wide shadow-md uppercase ${
                    item.type === 'LOST'
                      ? 'bg-rose-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {item.type === 'LOST' ? 'LOST ARTICLE' : 'FOUND ARTICLE'}
                </span>

                {item.reward && (
                  <span className="bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1.5 shadow-md">
                    <Gift className="w-3.5 h-3.5" /> Reward: {item.reward}
                  </span>
                )}
              </div>

              {/* Status pill */}
              <div className="absolute top-4 right-4 bg-slate-900/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                Status: {item.status.replace('_', ' ')}
              </div>
            </div>

            {/* Info Section */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-100 uppercase tracking-wider">
                  {item.category.replace('_', ' ')}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                  {item.title}
                </h1>
                <p className="text-xs text-slate-400 mt-1">Article Record #{item.id}</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Detailed Physical Description
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {item.description}
                </p>
              </div>

              {/* Specific Location & Campus Zone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-700">
                    <MapPin className="w-4 h-4 text-brand-600" /> Specific Location on Campus
                  </div>
                  <p className="text-xs font-bold text-slate-900">{item.location}</p>
                  {zone && (
                    <p className="text-[11px] text-slate-500">
                      Campus Zone: {zone.name} ({zone.building})
                    </p>
                  )}
                </div>

                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Calendar className="w-4 h-4 text-slate-500" /> Date & Time Reported
                  </div>
                  <p className="text-xs font-bold text-slate-900">{item.date}</p>
                  {item.time && (
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Recorded around {item.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Custody Information */}
              <div className="bg-indigo-50/60 border border-indigo-200/80 p-4 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                  <Building className="w-4 h-4 text-indigo-600" /> Current Physical Holding Facility
                </div>
                <p className="text-xs font-bold text-slate-900">
                  {item.lockerNumber
                    ? `${item.lockerNumber} (Campus Security Office)`
                    : item.currentCustody === 'CAMPUS_SECURITY_DESK'
                    ? 'Central Security Desk (Gate 1 Watchroom)'
                    : 'Currently with student finder pending security handover'}
                </p>
                <p className="text-[11px] text-slate-500">
                  Authorized custodians ensure strict custody chain until verified digital claim pass is scanned.
                </p>
              </div>

              {/* Verification Challenge Card */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    Anti-Theft Verification Challenge
                  </div>
                  <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                    Protected
                  </span>
                </div>

                <div className="text-xs text-amber-950 font-medium bg-white/80 p-3 rounded-xl border border-amber-200/60">
                  <span className="font-bold block text-[11px] text-amber-800 uppercase mb-0.5">
                    Ownership Challenge Question:
                  </span>
                  {item.secretVerificationQuestion ||
                    'Describe identifying stickers, engravings, serial number, or wallpapers.'}
                </div>

                {/* Secret Answer Reveal (Only visible to Campus Security or Reporter) */}
                {(isSecurityOfficer || isReporter) && item.secretVerificationAnswer && (
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900">
                    <span className="font-bold block text-[10px] uppercase text-emerald-700 mb-0.5 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Confidential Stored Answer (Visible to Security & Reporter):
                    </span>
                    <span className="font-mono">{item.secretVerificationAnswer}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chronological Event Timeline */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Audit Trail & Event History
            </h3>
            <div className="space-y-4 border-l-2 border-slate-200 pl-4 ml-2">
              {item.timeline.map((event, idx) => (
                <div key={event.id || idx} className="relative space-y-1">
                  <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-brand-600 ring-4 ring-white" />
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-700">{event.title}</span>
                    <span>{event.date}</span>
                  </div>
                  <p className="text-xs text-slate-600">{event.description}</p>
                  <span className="text-[10px] text-slate-400 block">By: {event.actor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Action Card, Digital Pass, Reporter Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900">Ownership & Recovery</h3>

            {/* If user already has an active claim on this item */}
            {userClaim ? (
              <div className="space-y-3">
                <div className="bg-brand-50 border border-brand-200 p-4 rounded-2xl text-xs space-y-2">
                  <span className="font-bold text-brand-900 block">Your Claim Status:</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                        userClaim.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : userClaim.status === 'HANDOVER_COMPLETED'
                          ? 'bg-slate-200 text-slate-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {userClaim.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    {userClaim.status === 'APPROVED'
                      ? 'Your claim was verified! Present your Digital Claim Pass below at Gate 1 Security Desk.'
                      : userClaim.status === 'HANDOVER_COMPLETED'
                      ? 'Item handover completed and confirmed.'
                      : 'Campus Security is comparing your answer with the secret challenge.'}
                  </p>
                </div>

                {userClaim.status === 'APPROVED' && (
                  <DigitalClaimPass claim={userClaim} />
                )}
              </div>
            ) : item.status === 'RETURNED' ? (
              <div className="bg-slate-100 p-4 rounded-2xl text-xs text-slate-600 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-slate-800">Case Resolved & Closed</p>
                <p className="text-[11px] text-slate-500">
                  This item has already been successfully handed over to its rightful owner.
                </p>
              </div>
            ) : item.type === 'FOUND' ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Is this your lost article? Click below to answer the ownership challenge and initiate retrieval.
                </p>
                <button
                  onClick={() => setIsClaimModalOpen(true)}
                  className="w-full bg-linear-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition shadow-md shadow-brand-500/20 cursor-pointer"
                >
                  Claim This Item Now
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Did you find this item or have information? Contact the reporter or deposit it at the Campus Security Desk.
                </p>
                <Link
                  href="/report/found"
                  className="block text-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition shadow-md shadow-emerald-600/20"
                >
                  I Found This Item
                </Link>
              </div>
            )}

            {/* Reporter Profile Box */}
            <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">
                Reported by University Member
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-brand-600 text-sm">
                  {item.reporterName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{item.reporterName}</p>
                  <p className="text-[11px] text-slate-500">
                    ID / Roll: <span className="font-mono">{item.reporterRollNo}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">{item.reporterEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Desk Quick Note */}
          <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Shield className="w-4 h-4" /> Campus Vigilance Note
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              All physical handovers occur under 24/7 CCTV surveillance at Gate 1 Central Security Desk. Bring your original University Smart ID card.
            </p>
          </div>
        </div>
      </div>

      {/* Claim Modal */}
      <ClaimModal
        item={item}
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
      />
    </div>
  );
}
