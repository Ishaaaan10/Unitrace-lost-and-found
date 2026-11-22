'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  Search,
  PlusCircle,
  MapPin,
  Bell,
  LayoutDashboard,
  ShieldAlert,
  UserCheck,
  ChevronDown,
  GraduationCap,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemsContext';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, switchPresetUser, allPresetUsers, isSecurityOfficer } = useAuth();
  const { notifications, markNotificationRead, claims } = useItems();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingClaimsCount = claims.filter((c) => c.status === 'PENDING_REVIEW').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top University Alert / Demo Ribbon */}
      <div className="bg-linear-to-r from-brand-900 via-indigo-900 to-slate-900 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-medium text-[11px] border border-amber-400/30">
            <Sparkles className="w-3 h-3" /> Official Campus Portal
          </span>
          <span className="hidden sm:inline text-slate-300">
            Central University Lost & Found Identification & Recovery System
          </span>
        </div>

        {/* Demo Role Switcher Badge */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-md text-xs font-medium transition cursor-pointer"
          >
            <span className="text-slate-300">Active Role:</span>
            <span className="text-amber-300 font-semibold">{currentUser.name}</span>
            <span className="text-[10px] bg-indigo-500/50 px-1.5 rounded uppercase">
              {currentUser.role.replace('_', ' ')}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-300" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-1.5 w-72 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Select Role (Demo & Viva Evaluator)
                </p>
              </div>
              <div className="space-y-1 mt-1">
                {allPresetUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      switchPresetUser(user.id);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition cursor-pointer ${
                      currentUser.id === user.id
                        ? 'bg-brand-50 border border-brand-200'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                        {user.name}
                        {currentUser.id === user.id && (
                          <UserCheck className="w-3.5 h-3.5 text-brand-600" />
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {user.role === 'CAMPUS_SECURITY'
                          ? 'Security Desk Officer'
                          : `${user.department} (${user.rollNo})`}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        user.role === 'CAMPUS_SECURITY'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user.role === 'CAMPUS_SECURITY' ? 'SECURITY' : 'STUDENT'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900">
                Uni<span className="text-brand-600">Trace</span>
              </span>
              <span className="text-[10px] font-extrabold bg-brand-100 text-brand-700 px-1.5 py-0.2 rounded">
                v2.0
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 -mt-0.5">
              Campus Lost & Found System
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link
            href="/items"
            className={`px-3 py-2 rounded-lg transition ${
              pathname === '/items'
                ? 'bg-brand-50 text-brand-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Browse Items
          </Link>
          <Link
            href="/campus-map"
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
              pathname === '/campus-map'
                ? 'bg-brand-50 text-brand-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4 text-brand-600" /> Campus Map
          </Link>
          <Link
            href="/dashboard"
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
              pathname === '/dashboard'
                ? 'bg-brand-50 text-brand-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-500" /> Student Desk
          </Link>

          {/* Security Desk Tab */}
          <Link
            href="/security-desk"
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
              pathname === '/security-desk'
                ? 'bg-amber-50 text-amber-800 font-semibold border border-amber-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Security Desk
            {pendingClaimsCount > 0 && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {pendingClaimsCount}
              </span>
            )}
          </Link>

          {/* Lab Presentation Viva Guide */}
          <Link
            href="/viva-guide"
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
              pathname === '/viva-guide'
                ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" /> Viva Defense
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Notifications & Match Alerts
                  </span>
                  <span className="text-xs text-brand-600 font-medium">
                    {unreadCount} unread
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 mt-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">
                      No notifications at this time
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-lg transition cursor-pointer ${
                          !n.read ? 'bg-brand-50/60' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {new Date(n.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                        {n.link && (
                          <Link
                            href={n.link}
                            onClick={() => setShowNotifDropdown(false)}
                            className="inline-block mt-1 text-[11px] font-semibold text-brand-600 hover:underline"
                          >
                            View Details →
                          </Link>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Report Buttons */}
          <Link
            href="/report/lost"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition shadow-2xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-rose-600" /> Report Lost
          </Link>
          <Link
            href="/report/found"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-linear-to-r from-brand-600 to-indigo-600 rounded-lg hover:from-brand-700 hover:to-indigo-700 transition shadow-xs shadow-brand-500/30"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Report Found
          </Link>
        </div>
      </div>
    </header>
  );
}
