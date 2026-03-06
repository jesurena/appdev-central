'use client';

import React, { useState } from 'react';
import { Input, Button, Tag, Empty, Skeleton } from 'antd';
import { Search, RotateCcw, ChevronRight, Mail, Building2, Shield, UserPlus, Users } from 'lucide-react';
import UserAvatar from '@/components/Avatar/UserAvatar';
import { useManagers, Manager } from '@/hooks/user-assignments/useUserAssignments';

export default function UserAssignmentsPage() {
    const [searchValue, setSearchValue] = useState('');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const { data: managers = [], isLoading } = useManagers();

    const filtered = managers.filter((user) => {
        if (!searchValue) return true;
        const q = searchValue.toLowerCase();
        return (
            user.AccountName.toLowerCase().includes(q) ||
            user.Email.toLowerCase().includes(q) ||
            user.AccountGroup.toLowerCase().includes(q)
        );
    });

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <div className="mb-8">
                <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">User Assignments</h1>
                <p className="text-gray-500 mt-1 text-base">
                    Manage users access and their account permissions here.
                </p>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-900">All Assignments</h2>
                        <span className="bg-accent-1 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                            {isLoading ? '...' : filtered.length}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Input
                            placeholder="Search by name, email, or group..."
                            prefix={<Search size={18} className="text-gray-400" />}
                            className="w-full md:w-[320px] rounded-lg h-10 border-gray-200"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            allowClear
                        />
                        <Button
                            icon={<RotateCcw size={18} />}
                            className="rounded-lg h-10 flex items-center gap-2 border-gray-200 font-medium text-gray-500 hover:text-primary hover:border-primary"
                            onClick={() => setSearchValue('')}
                        >
                            Reset
                        </Button>
                        <Button
                            type="primary"
                            icon={<UserPlus size={18} />}
                            className="rounded-lg h-10 flex items-center gap-2 border-none font-medium shadow-none"
                        >
                            Assign User
                        </Button>
                    </div>
                </div>

                {/* List */}
                <div className="divide-y divide-gray-100 min-h-[300px]">
                    {isLoading ? (
                        <div className="p-6 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <Skeleton.Avatar active size={44} shape="circle" />
                                    <Skeleton active paragraph={{ rows: 1 }} />
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="py-20">
                            <Empty description="No assignments found" />
                        </div>
                    ) : (
                        filtered.map((manager) => (
                            <div key={manager.AccountID}>
                                {/* Manager Row */}
                                <div
                                    className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50/70 transition-colors group"
                                    onClick={() => toggleExpand(manager.AccountID)}
                                >
                                    {/* Expand Arrow */}
                                    <ChevronRight
                                        size={18}
                                        className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${expandedId === manager.AccountID ? 'rotate-90' : ''}`}
                                    />

                                    {/* Avatar */}
                                    <UserAvatar
                                        src={manager.GAvatar}
                                        name={manager.AccountName}
                                        domainAccount={null}
                                        size={44}
                                        className="flex-shrink-0"
                                    />

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-[15px] font-bold text-gray-900 truncate">{manager.AccountName}</span>
                                            <Tag color={manager.isActive ? 'green' : 'volcano'} className="rounded-md px-2 border-none font-semibold text-[11px]">
                                                {manager.isActive ? 'Active' : 'Inactive'}
                                            </Tag>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Mail size={12} />
                                                {manager.Email}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Building2 size={12} />
                                                {manager.AccountGroup}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Shield size={12} />
                                                {manager.AccountType}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Assigned Count Badge */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <div className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-bold">
                                            <span>{manager.assignedAccounts.length}</span>
                                            <span className="text-gray-400 font-medium">assigned</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded: Assigned Users */}
                                {expandedId === manager.AccountID && (
                                    <div className="bg-slate-50/70 border-t border-gray-100 p-6">
                                        {/* Header & Internal Actions */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                    <Users size={14} className="text-primary" />
                                                    Users Assigned to {manager.AccountName.split(' ')[0]}
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[12px] text-gray-500 font-medium">
                                                        Total: <span className="text-gray-900 font-bold">{manager.assignedAccounts.length}</span>
                                                    </span>
                                                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                                                    <span className="text-[12px] text-gray-500 font-medium">
                                                        Active: <span className="text-green-600 font-bold">
                                                            {manager.assignedAccounts.filter(u => u.isActive !== false).length}
                                                        </span>
                                                    </span>
                                                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                                                    <span className="text-[12px] text-gray-500 font-medium">
                                                        Source: <Tag className="m-0 py-0 px-1.5 text-[10px] bg-slate-200 border-none font-bold align-middle">MULTI-DB</Tag>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Input
                                                    size="small"
                                                    placeholder="Filter this list..."
                                                    prefix={<Search size={12} className="text-gray-400" />}
                                                    className="w-full sm:w-[200px] h-8 rounded-lg border-gray-200 text-xs"
                                                    allowClear
                                                />
                                                <Button size="small" type="text" className="text-primary text-xs font-semibold hover:bg-white">
                                                    Manage All
                                                </Button>
                                            </div>
                                        </div>

                                        {manager.assignedAccounts.length === 0 ? (
                                            <div className="bg-white/50 border border-dashed border-gray-200 rounded-2xl py-10 text-center">
                                                <p className="text-xs text-gray-400 font-medium italic">No users currently assigned to this personnel.</p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                                {manager.assignedAccounts.map((user) => (
                                                    <div
                                                        key={user.AccountID}
                                                        className="group flex items-start gap-3 p-3 bg-white hover:bg-primary/5 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden"
                                                    >
                                                        {/* Status Indicator (Vertical Stripe) */}
                                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${user.isActive !== false ? 'bg-green-500' : 'bg-volcano-500'}`} />

                                                        <UserAvatar
                                                            src={user.GAvatar}
                                                            name={user.AccountName}
                                                            domainAccount={null}
                                                            size={32}
                                                            className="flex-shrink-0 mt-0.5 shadow-sm ring-1 ring-gray-50 ring-offset-1"
                                                        />

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-1.5 mb-1 overflow-hidden">
                                                                <span className="text-[13px] font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                                                                    {user.AccountName}
                                                                </span>
                                                            </div>

                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                                                    <div className="flex items-center justify-center p-1 bg-gray-50 rounded group-hover:bg-white transition-colors">
                                                                        <Mail size={10} className="text-gray-400" />
                                                                    </div>
                                                                    <span className="truncate">{user.Email}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                                                    <div className="flex items-center justify-center p-1 bg-gray-50 rounded group-hover:bg-white transition-colors">
                                                                        <Building2 size={10} className="text-gray-400" />
                                                                    </div>
                                                                    <span className="font-semibold text-gray-400">{user.Source}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10 text-primary cursor-pointer">
                                                            <ChevronRight size={14} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
