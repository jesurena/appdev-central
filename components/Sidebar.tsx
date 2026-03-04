'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Settings, MoreVertical, Menu, X, LogOut } from 'lucide-react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import SettingsModal from './Settings/SettingsModal';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'settings',
            label: (
                <div className="flex items-center gap-2 py-1">
                    <Settings size={16} />
                    <span>Settings</span>
                </div>
            ),
            onClick: () => setIsSettingsOpen(true)
        },
        {
            key: 'logout',
            label: (
                <Link href="/login" className="flex items-center gap-2 py-1 text-red-500">
                    <LogOut size={16} />
                    <span>Logout</span>
                </Link>
            ),
        },
    ];

    const menuGroups = [
        {
            title: 'DASHBOARD',
            items: [
                { name: 'Overview', href: '/dashboard', icon: Home }
            ]
        },
        {
            title: 'QUICK ACCESS',
            items: []
        },
        {
            title: 'MODULES',
            items: [
                { name: 'User Management', href: '/users', icon: Users }
            ]
        }
    ];

    const sidebarContent = (
        <div className="flex flex-col h-full bg-white">
            {/* Logo */}
            <div className="p-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group w-max">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-xs">AC</span>
                    </div>
                    <span className="text-[19px] font-bold text-gray-900 tracking-tight">
                        AppDev Central
                    </span>
                </Link>
                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-6">
                {menuGroups.map((group, index) => (
                    <div key={index}>
                        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 px-3">
                            {group.title}
                        </h3>
                        {group.items.length > 0 && (
                            <div className="flex flex-col gap-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-colors",
                                                isActive
                                                    ? "bg-gray-50 text-gray-900"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            )}
                                        >
                                            <Icon className={cn("w-[18px] h-[18px]", isActive ? "text-gray-900" : "text-gray-500")} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-5">
                <Dropdown menu={{ items: userMenuItems }} placement="topRight" trigger={['click']}>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-accent-1 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                                A
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[14px] font-semibold text-gray-900 leading-none mb-1">Admin User</span>
                                <span className="text-[12px] text-gray-500 whitespace-nowrap">admin@appdev.com</span>
                            </div>
                        </div>
                        <MoreVertical className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors flex-shrink-0" />
                    </div>
                </Dropdown>
            </div>
        </div>
    );

    return (
        <>
            <header className="lg:hidden sticky top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-xs">AC</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900 tracking-tight">AppDev Central</span>
                    </Link>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[60] transform transition-transform duration-300 ease-in-out lg:hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                ></div>
                <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-2xl overflow-hidden">
                    {sidebarContent}
                </div>
            </div>


            <aside className="hidden lg:flex w-64 flex-col h-screen border-r border-gray-200 sticky top-0 bg-white">
                {sidebarContent}
            </aside>

            <SettingsModal
                visible={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </>
    );
}
