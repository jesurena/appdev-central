'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function DashboardBanner() {
    return (
        <div className="relative overflow-hidden bg-accent-1 rounded-[24px] p-8 md:p-12 mb-10 shadow-lg">
            <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute right-[5%] top-[15%] w-24 h-24 text-white/30" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0Z" />
                </svg>
                <svg className="absolute right-[25%] bottom-[5%] w-32 h-32 text-white/20" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0Z" />
                </svg>
                <svg className="absolute left-[50%] bottom-[-15%] w-28 h-28 text-white/10" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0Z" />
                </svg>
            </div>

            <div className="relative z-10 w-full">
                <div className="text-white/80 text-[11px] font-bold tracking-[0.15em] mb-4 uppercase">
                    User Management & Access Control
                </div>
                <h1 className="text-white text-4xl md:text-[46px] leading-[1.15] tracking-tight font-medium max-w-[700px] mb-8">
                    Manage your users, assign roles, and control permissions.
                </h1>

                <Link href="/users" className="block w-max">
                    <button className="bg-white text-black p-1.5 pr-2 rounded-[32px] flex items-center gap-3 transition-all shadow-xl w-max group">
                        <span className="font-semibold text-[15px] pl-5">Manage Users & Permissions</span>
                        <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                            <ChevronRight strokeWidth={3} className="w-4 h-4" />
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    );
}
