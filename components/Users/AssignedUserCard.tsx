'use client';

import React, { useState } from 'react';
import { Card, Tag } from 'antd';
import { Mail, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UserAvatar from '@/components/Avatar/UserAvatar';
import ViewUserDialog from './ViewUserDialog';
import StatusChip from '@/components/Table/StatusChip';
import { Users } from '@/interface/user';

interface AssignedUserCardProps {
    user: Users;
}

export default function AssignedUserCard({ user }: AssignedUserCardProps) {
    const [isViewOpen, setIsViewOpen] = useState(false);

    const handleCardClick = () => {
        setIsViewOpen(true);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Card
                    onClick={handleCardClick}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border-gray-100/80 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                    styles={{ body: { padding: '16px' } }}
                >
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/15" />
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${user.isActive ? 'bg-gradient-to-b from-green-400 to-green-600' : 'bg-gradient-to-b from-rose-400 to-rose-600'}`} />

                    <div className="flex items-start gap-4">
                        <div className="relative">
                            <UserAvatar
                                src={user.GAvatar}
                                name={user.AccountName}
                                size={52}
                                className="ring-2 ring-white ring-offset-2 ring-offset-gray-50/50 shadow-md group-hover:shadow-primary/20 transition-all duration-300"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-bold text-gray-900 truncate pr-2 group-hover:text-primary transition-colors duration-300">
                                    {user.AccountName}
                                </h4>
                                <StatusChip status={user.isActive} />
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 mb-3">
                                <Tag className="m-0 text-[10px] font-bold border-none bg-slate-100 text-slate-500 rounded-md px-2 py-0.5">
                                    ID: {user.AccountIDNo}
                                </Tag>
                                <Tag
                                    className={`m-0 text-[10px] font-bold border-none rounded-md px-2 py-0.5 ${user.Source === 'CustDB' ? 'bg-cyan-50 text-cyan-600' : 'bg-indigo-50 text-indigo-600'
                                        }`}
                                >
                                    {user.Source}
                                </Tag>
                                <Tag className="m-0 text-[10px] font-bold border-none bg-orange-50 text-orange-600 rounded-md px-2 py-0.5">
                                    {user.AccountType}
                                </Tag>
                                <Tag className="m-0 text-[10px] font-bold border-none bg-emerald-50 text-emerald-600 rounded-md px-2 py-0.5">
                                    {user.AccountGroup}
                                </Tag>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50/50 rounded-lg py-1 px-2 border border-gray-100 group-hover:border-primary/10 transition-colors">
                                    <Mail size={12} className="text-gray-700" />
                                    <span className="truncate">{user.Email || 'No email provided'}</span>
                                </div>
                                {user.DomainAccount && (
                                    <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50/50 rounded-lg py-1 px-2 border border-gray-100 group-hover:border-primary/10 transition-colors">
                                        <UserCircle size={12} className="text-gray-700" />
                                        <span className="truncate font-medium">{user.DomainAccount}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>

            <AnimatePresence>
                {isViewOpen && (
                    <ViewUserDialog
                        visible={isViewOpen}
                        onClose={() => setIsViewOpen(false)}
                        user={user}
                        showProfileButton={true}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
