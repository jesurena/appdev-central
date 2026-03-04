'use client';

import React, { useState } from 'react';
import { Modal } from 'antd';
import {
    Settings,
    X,
    Palette,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
}

type Category = 'General' | 'Modules';

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
    const [activeCategory, setActiveCategory] = useState<Category>('General');
    const [activeSubItem, setActiveSubItem] = useState('General');

    const sidebarItems = [
        {
            id: 'General',
            icon: Settings,
            label: 'General',
        },
        { id: 'Modules', icon: Palette, label: 'Modules' },
    ];

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            closeIcon={null}
            width={{
                xs: '90%',
                sm: '80%',
                md: '70%',
                lg: '60%',
                xl: '50%',
                xxl: '40%',
            }}
            centered
            className="settings-modal"
        >
            <div className="flex h-[700px] bg-white rounded-2xl overflow-hidden">
                {/* Sidebar */}
                <aside className="w-[150px] md:w-[280px] border-r border-gray-100 p-2 flex flex-col justify-start gap-4 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-gray-900 px-2">Settings</h2>

                    <nav className="flex flex-col gap-1">
                        {sidebarItems.map((item) => {
                            const isExpanded = activeCategory === item.id;
                            const Icon = item.icon;

                            return (
                                <div key={item.id} className="flex flex-col">
                                    <button
                                        onClick={() => {
                                            setActiveCategory(item.id as Category);
                                            setActiveSubItem(item.label);
                                        }}
                                        className={cn(
                                            "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group w-full text-left",
                                            isExpanded ? "bg-accent-1/5 text-accent-1" : "text-gray-600 hover:bg-gray-100"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon size={18} className={cn("transition-colors", isExpanded ? "text-accent-1" : "text-gray-400 group-hover:text-gray-600")} />
                                            <span className="text-[15px] font-semibold">{item.label}</span>
                                        </div>
                                    </button>
                                </div>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 bg-white">
                    <header className="h-16 flex items-center justify-between pl-4 md:px-4 border-b border-gray-50">
                        <div className="flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900">{activeSubItem}</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                        >
                            <X size={20} />
                        </button>
                    </header>

                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        <div className="max-w-2xl mx-auto py-20 text-center">
                            <Settings size={48} className="mx-auto mb-4 text-gray-200" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{activeCategory} Settings</h4>
                            <p className="text-gray-500 font-medium">Coming soon...</p>
                        </div>
                    </div>
                </main>
            </div>
        </Modal>
    );
}
