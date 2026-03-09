'use client';

import React from 'react';
import { Card, Skeleton, Tooltip } from 'antd';
import { IdCard, Mail, Building2, Calendar, User, Copy, Check } from 'lucide-react';
import { Users } from '@/interface/user';
import dayjs from 'dayjs';
import { copyToClipboard } from '@/utils/clipboard';

interface PersonalInfoCardProps {
    user: Users | undefined;
    isLoading: boolean;
}

export default function PersonalInfoCard({ user, isLoading }: PersonalInfoCardProps) {
    return (
        <Card className="lg:col-span-2 rounded-3xl border-gray-100 shadow-sm overflow-hidden" styles={{ body: { padding: 0 } }}>
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <IdCard size={18} className="text-gray-400" />
                <h3 className="font-bold text-gray-900">Personal Information</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <InfoSection
                    label="Full Name"
                    value={user?.AccountName}
                    loading={isLoading}
                    icon={<User size={16} />}
                    copyValue={user?.AccountName}
                />
                <InfoSection
                    label="Email Address"
                    value={user?.Email}
                    loading={isLoading}
                    icon={<Mail size={16} />}
                    copyValue={user?.Email}
                />
                <InfoSection
                    label="Account ID"
                    value={user?.AccountID}
                    loading={isLoading}
                    icon={<IdCard size={16} />}
                    copyValue={user?.AccountID ? String(user.AccountID) : undefined}
                />
                <InfoSection label="AO Number" value={user?.AONumber} loading={isLoading} icon={<IdCard size={16} />} />
                <InfoSection label="Valid Until" value={user?.ValidTo ? dayjs(user.ValidTo).format('MMMM D, YYYY') : 'Lifetime'} loading={isLoading} icon={<Calendar size={16} />} />
                <InfoSection label="Account Group" value={user?.AccountGroup} loading={isLoading} icon={<Building2 size={16} />} />
            </div>
        </Card>
    );
}

function InfoSection({ label, value, loading, icon, copyValue }: { label: string; value?: React.ReactNode; loading?: boolean; icon?: any; copyValue?: string }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        if (!copyValue) return;
        const success = await copyToClipboard(copyValue, label);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-1.5 min-h-[46px] group">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                {icon}
                {label}
            </span>
            {loading ? (
                <Skeleton.Input active size="small" block />
            ) : (
                <div className="flex items-center gap-2">
                    <p className="text-[15px] font-semibold text-gray-900 truncate">{value || 'N/A'}</p>
                    {copyValue && value && (
                        <Tooltip title={copied ? 'Copied!' : `Copy ${label}`}>
                            <button
                                onClick={handleCopy}
                                className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-primary transition-colors"
                            >
                                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                        </Tooltip>
                    )}
                </div>
            )}
        </div>
    );
}
