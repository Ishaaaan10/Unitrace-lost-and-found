'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Sparkles,
  FileText,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  ArrowRight,
  Printer,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useItems } from '../../context/ItemsContext';
import DigitalClaimPass from '../../components/DigitalClaimPass';
import { Claim } from '../../lib/types';

export default function StudentDashboardPage() {
  const { currentUser, switchPresetUser, allPresetUsers } = useAuth();
  const { getUserClaims, getUserReportedItems, notifications } = useItems();

  const [activeTab, setActiveTab] = useState<'CLAIMS' | 'REPORTS' | 'NOTIFS'>('CLAIMS');
  const [selectedPassClaim, setSelectedPassClaim] = useState<Claim | null>(null);

  const myClaims = getUserClaims(currentUser.email);
  const myReports = getUserReportedItems(currentUser.email);
  const myNotifs = notifications;

  const approvedClaimsCount = myClaims.filter((c) => c.status === 'APPROVED').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">{currentUser.name}</h1>
                <span className="bg-brand-50 text-brand-700 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border border-brand-200 uppercase">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {currentUser.department} • Roll No: <span className="font-mono font-bold text-slate-700">{currentUser.rollNo}</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentUser.email} • {currentUser.phone} • {currentUser.dormsOrHostel}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">My Claims</span>
              <span className="text-xl font-black text-slate-900">{myClaims.length}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Reported Items</span>
              <span className="text-xl font-black text-slate-900">{myReports.length}</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Approved Passes</span>
              <span className="text-xl font-black text-emerald-900">{approvedClaimsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('CLAIMS')}
          className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'CLAIMS'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4" /> My Ownership Claims ({myClaims.length})
        </button>
        <button
          onClick={() => setActiveTab('REPORTS')}
          className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'REPORTS'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" /> My Filed Reports ({myReports.length})
        </button>
        <button
          onClick={() => setActiveTab('NOTIFS')}
          className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'NOTIFS'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" /> Notifications & Matches ({myNotifs.length})
        </button>
      </div>

      {/* Tab 1: Claims List */}
      {activeTab === 'CLAIMS' && (
        <div className="space-y-6">
          {myClaims.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <Shield className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No active ownership claims filed</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                If you spot your misplaced item in the university directory, click &quot;Claim Item&quot; to initiate verification.
              </p>
              <Link
                href="/items"
                className="inline-block text-xs bg-brand-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-brand-700 transition"
              >
                Browse Articles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {myClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-brand-300 transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-slate-900">{claim.itemTitle}</h3>
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                            claim.status === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : claim.status === 'HANDOVER_COMPLETED'
                              ? 'bg-slate-100 text-slate-700'
                              : claim.status === 'REJECTED'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {claim.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Claim Reference: #{claim.id} • Submitted {new Date(claim.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Action */}
                    {claim.status === 'APPROVED' && (
                      <button
                        onClick={() => setSelectedPassClaim(claim)}
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
                      >
                        <QrCode className="w-4 h-4" /> View Digital Claim Pass
                      </button>
                    )}
                  </div>

                  {/* Proof and Remarks Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Your Verification Answer
                      </span>
                      <p className="text-slate-800 font-medium">{claim.verificationAnswerAttempt}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Security Officer Remarks
                      </span>
                      <p className="text-slate-800">
                        {claim.securityOfficerRemarks || 'Under examination by vigilance officer.'}
                      </p>
                    </div>
                  </div>

                  {claim.status === 'APPROVED' && (
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Present OTP <strong>#{claim.otp}</strong> or QR Code at Gate 1 Central Security Desk.</span>
                      </div>
                      <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-800">
                        OTP: {claim.otp}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Reports */}
      {activeTab === 'REPORTS' && (
        <div className="space-y-4">
          {myReports.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <Layers className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No reports filed under your profile</h3>
              <div className="flex justify-center gap-3 pt-2">
                <Link
                  href="/report/lost"
                  className="text-xs bg-rose-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-rose-700 transition"
                >
                  Report Lost Article
                </Link>
                <Link
                  href="/report/found"
                  className="text-xs bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-emerald-700 transition"
                >
                  Report Found Article
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myReports.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                        item.type === 'LOST'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      Status: {item.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>

                  <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </span>
                    <Link
                      href={`/items/${item.id}`}
                      className="font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                    >
                      Inspect <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Notifications Feed */}
      {activeTab === 'NOTIFS' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Notifications & Match History</h3>
          <div className="divide-y divide-slate-100">
            {myNotifs.map((n) => (
              <div key={n.id} className="py-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{n.title}</span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(n.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{n.message}</p>
                {n.link && (
                  <Link
                    href={n.link}
                    className="inline-block text-xs font-bold text-brand-600 hover:underline pt-1"
                  >
                    Open Details →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Digital Claim Pass Modal */}
      {selectedPassClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <DigitalClaimPass claim={selectedPassClaim} />
            <button
              onClick={() => setSelectedPassClaim(null)}
              className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-slate-800 transition cursor-pointer"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
