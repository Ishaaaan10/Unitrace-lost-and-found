'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  QrCode,
  Printer,
  Lock,
  Building,
  AlertTriangle,
  FileCheck,
  Search,
  KeyRound,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useItems } from '../../context/ItemsContext';
import HandoverReceipt from '../../components/HandoverReceipt';
import { Claim, Item } from '../../lib/types';

export default function SecurityDeskPage() {
  const { currentUser, switchPresetUser, isSecurityOfficer } = useAuth();
  const { claims, items, resolveClaim, verifyHandoverOtp, updateItemStatus } = useItems();

  const [otpInput, setOtpInput] = useState('');
  const [officerNotes, setOfficerNotes] = useState('');
  const [handoverResult, setHandoverResult] = useState<{
    success: boolean;
    message: string;
    claim?: Claim;
    item?: Item;
  } | null>(null);

  const [selectedReceiptData, setSelectedReceiptData] = useState<{
    claim: Claim;
    item: Item;
  } | null>(null);

  const [reviewRemarks, setReviewRemarks] = useState<Record<string, string>>({});

  const pendingClaims = claims.filter((c) => c.status === 'PENDING_REVIEW');
  const itemsInCustody = items.filter(
    (i) => i.currentCustody === 'CAMPUS_SECURITY_DESK' && i.status !== 'RETURNED'
  );
  const returnedItems = items.filter((i) => i.status === 'RETURNED');

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput.trim()) return;

    const res = verifyHandoverOtp(otpInput.trim(), officerNotes.trim());
    setHandoverResult(res);

    if (res.success && res.claim && res.item) {
      setSelectedReceiptData({ claim: res.claim, item: res.item });
      setOtpInput('');
      setOfficerNotes('');
    }
  };

  const handleApproveClaim = (claimId: string) => {
    const remarks = reviewRemarks[claimId] || 'Verification proof accepted. Claim pass issued.';
    resolveClaim(claimId, 'APPROVED', remarks);
  };

  const handleRejectClaim = (claimId: string) => {
    const remarks = reviewRemarks[claimId] || 'Verification details did not match recorded item characteristics.';
    resolveClaim(claimId, 'REJECTED', remarks);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Gate 1 Central Security Depot
            </span>
            <span className="text-xs text-slate-400">Campus Vigilance & Proctorial Office</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Campus Security & Holding Locker Directorate
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Centralized terminal to examine ownership challenges, issue verified Digital Claim Passes, and disburse recovered property via 6-digit cryptographic OTP.
          </p>
        </div>

        {/* Role Switcher if not currently logged in as Security Officer */}
        {!isSecurityOfficer && (
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2 shrink-0">
            <p className="text-xs text-amber-300 font-bold">
              Currently viewing as Student ({currentUser.name})
            </p>
            <button
              onClick={() => switchPresetUser('usr-security-officer')}
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" /> Switch to Officer Rajesh Kumar
            </button>
          </div>
        )}
      </div>

      {/* Handover OTP Verification Terminal */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md">
            <KeyRound className="w-3.5 h-3.5" /> Physical Handover Verification Scanner
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Scan QR / Verify Student Claim OTP
          </h2>
          <p className="text-xs text-slate-500">
            When a student presents their Digital Claim Pass at Gate 1, enter their 6-digit OTP code below to disburse the item and generate the official custody restitution receipt.
          </p>
        </div>

        {handoverResult && (
          <div
            className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
              handoverResult.success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {handoverResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{handoverResult.message}</span>
            </div>

            {handoverResult.success && handoverResult.claim && handoverResult.item && (
              <button
                onClick={() =>
                  setSelectedReceiptData({
                    claim: handoverResult.claim!,
                    item: handoverResult.item!,
                  })
                }
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-xl transition shadow-xs text-xs cursor-pointer shrink-0"
              >
                Print Official Receipt
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleVerifyOtp} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-4 space-y-1">
            <label className="block text-xs font-bold text-slate-700">
              6-Digit Security Handover Code (OTP) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={6}
              placeholder="e.g. 482915"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="w-full text-base font-mono font-bold tracking-widest px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500 bg-slate-50 uppercase"
            />
          </div>

          <div className="sm:col-span-6 space-y-1">
            <label className="block text-xs font-bold text-slate-700">
              Security Officer Custody Remarks / Verification Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Student ID verified in person; student unlocked device screen."
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Verify & Disburse
            </button>
          </div>
        </form>
      </div>

      {/* Pending Claims Review Queue */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Ownership Verification Review Queue
            </h2>
            <p className="text-xs text-slate-500">
              Evaluate claimant answers against confidential stored item traits before authorizing handover.
            </p>
          </div>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
            {pendingClaims.length} Pending Examination
          </span>
        </div>

        {pendingClaims.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100 p-6 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="text-xs font-bold text-slate-800">Review queue is clear</p>
            <p className="text-[11px] text-slate-400">
              All submitted claims have been evaluated or resolved.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingClaims.map((claim) => {
              const item = items.find((i) => i.id === claim.itemId);
              return (
                <div
                  key={claim.id}
                  className="border-2 border-amber-200 rounded-2xl p-5 bg-amber-50/20 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        Claim #{claim.id}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 mt-1">
                        {claim.itemTitle}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Claimant: <strong className="text-slate-800">{claim.claimantName}</strong> ({claim.claimantRollNo}) • {claim.claimantDepartment}
                      </p>
                    </div>

                    <div className="text-right text-xs">
                      <span className="text-slate-400 block text-[10px]">Submitted:</span>
                      <span className="font-semibold text-slate-700">
                        {new Date(claim.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Side-by-side challenge & claimant answer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Reporter's Stored Challenge & Answer */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-brand-700 text-xs">
                        <Lock className="w-3.5 h-3.5 text-brand-600" /> Reporter&apos;s Challenge & Secret Stored Answer
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Challenge Question:</span>
                        <p className="text-slate-700 italic">
                          {item?.secretVerificationQuestion || 'Describe unique identifying markings.'}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Secret Expected Answer:</span>
                        <p className="text-emerald-800 font-mono font-semibold bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                          {item?.secretVerificationAnswer || 'No specific secret provided.'}
                        </p>
                      </div>
                    </div>

                    {/* Claimant's Answer & Proof */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-amber-800 text-xs">
                        <KeyRound className="w-3.5 h-3.5 text-amber-600" /> Claimant&apos;s Submitted Answer
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Their Response:</span>
                        <p className="text-slate-900 font-medium bg-amber-50/60 p-2 rounded-lg border border-amber-200/60">
                          {claim.verificationAnswerAttempt}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Circumstances / Proof:</span>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {claim.claimantProofDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Officer Decision Bar */}
                  <div className="pt-3 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <input
                      type="text"
                      placeholder="Add official officer remarks (e.g. Serial verified, stickers match)..."
                      value={reviewRemarks[claim.id] || ''}
                      onChange={(e) =>
                        setReviewRemarks({ ...reviewRemarks, [claim.id]: e.target.value })
                      }
                      className="w-full sm:w-80 text-xs px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    />

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleRejectClaim(claim.id)}
                        className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition cursor-pointer"
                      >
                        Decline Claim
                      </button>
                      <button
                        onClick={() => handleApproveClaim(claim.id)}
                        className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Approve & Issue Pass
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Custody Inventory & Locker Management */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Physical Holding Locker & Custody Inventory
            </h2>
            <p className="text-xs text-slate-500">
              Articles stored physically inside Gate 1 Main Security Office vaults and storage bins.
            </p>
          </div>
          <span className="text-xs text-slate-600 font-semibold bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
            {itemsInCustody.length} Articles in Custody
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Locker / Bin #</th>
                <th className="py-3 px-4">Article</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Campus Location Found</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {itemsInCustody.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 font-mono font-bold text-brand-700">
                    {item.lockerNumber || 'Unassigned'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-400">ID: {item.id}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.category}</td>
                  <td className="py-3 px-4 text-slate-600">{item.location}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.status === 'VERIFIED'
                          ? 'bg-blue-100 text-blue-800'
                          : item.status === 'CLAIM_PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/items/${item.id}`}
                      className="text-brand-600 font-bold hover:underline"
                    >
                      Inspect →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Handover Receipt Modal */}
      {selectedReceiptData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="my-8 max-w-2xl w-full">
            <HandoverReceipt
              claim={selectedReceiptData.claim}
              item={selectedReceiptData.item}
              onClose={() => setSelectedReceiptData(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
