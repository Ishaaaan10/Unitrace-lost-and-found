'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  Lock,
  CheckCircle2,
  HelpCircle,
  QrCode,
  FileText,
} from 'lucide-react';
import { Item, Claim } from '../lib/types';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemsContext';

interface ClaimModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onClaimSubmitted?: (claim: Claim) => void;
}

export default function ClaimModal({
  item,
  isOpen,
  onClose,
  onClaimSubmitted,
}: ClaimModalProps) {
  const { currentUser } = useAuth();
  const { submitClaim } = useItems();

  const [verificationAnswer, setVerificationAnswer] = useState('');
  const [proofDescription, setProofDescription] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [submittedClaim, setSubmittedClaim] = useState<Claim | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!verificationAnswer.trim()) {
      setError('Please provide your answer to the ownership verification challenge.');
      return;
    }

    if (!proofDescription.trim() || proofDescription.length < 15) {
      setError('Please provide sufficient description of ownership proof (at least 15 characters).');
      return;
    }

    if (!agreeTerms) {
      setError('Please confirm that you are the rightful owner under university honor code.');
      return;
    }

    const claim = submitClaim(item.id, proofDescription, verificationAnswer);
    if (claim) {
      setSubmittedClaim(claim);
      if (onClaimSubmitted) onClaimSubmitted(claim);
    } else {
      setError('Failed to record claim. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedClaim ? (
          // Success & Digital Pass preview
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Claim Submitted for Verification!
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              Your claim for <span className="font-semibold text-slate-800">&quot;{item.title}&quot;</span> has been sent to Campus Security.
            </p>

            {/* Generated OTP Badge */}
            <div className="bg-brand-50 border-2 border-dashed border-brand-300 rounded-2xl p-5 my-4">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider block mb-1">
                Your Handover Security OTP
              </span>
              <span className="text-3xl font-black font-mono tracking-widest text-brand-900">
                {submittedClaim.otp}
              </span>
              <p className="text-[11px] text-slate-500 mt-2">
                Present this 6-digit code or your Digital Claim Pass at the Main Gate Security Desk.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 bg-slate-900 text-white font-bold py-2.5 rounded-xl hover:bg-slate-800 text-xs transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          // Claim Form
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5" /> University Ownership Verification
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Claim Item: {item.title}
              </h3>
              <p className="text-xs text-slate-500">
                To prevent theft and unauthorized collection, answer the confidential verification challenge.
              </p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-xl text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Claimant Info Badge */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Claimant</span>
                <span className="font-bold text-slate-900">{currentUser.name}</span> ({currentUser.rollNo})
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Department</span>
                <span className="font-medium text-slate-700">{currentUser.department}</span>
              </div>
            </div>

            {/* Verification Challenge */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                Verification Challenge Question:
              </div>
              <p className="text-xs font-medium text-amber-950 bg-white/70 p-2.5 rounded-lg border border-amber-200/60">
                {item.secretVerificationQuestion ||
                  'Describe identifying marks, engravings, or wallpaper/stickers on this item.'}
              </p>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Your Answer to the Question <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sticker details, serial number, background wallpaper..."
                  value={verificationAnswer}
                  onChange={(e) => setVerificationAnswer(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500 bg-white"
                />
              </div>
            </div>

            {/* Detailed Proof Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Additional Proof & Circumstances of Misplacement <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe where and when you remember leaving it, contents inside, purchase bills if any, or matching accessories..."
                value={proofDescription}
                onChange={(e) => setProofDescription(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* University Honor Code Checkbox */}
            <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                id="honorCode"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded text-brand-600 focus:ring-brand-500 cursor-pointer"
              />
              <label htmlFor="honorCode" className="cursor-pointer text-[11px] leading-relaxed">
                I solemnly certify under the <strong className="text-slate-800">University Student Honor Code</strong> that I am the genuine owner of this property. I understand that fraudulent claims are logged with campus security and subject to academic disciplinary actions.
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold text-white bg-linear-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl shadow-md transition cursor-pointer"
              >
                Submit Ownership Claim
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
