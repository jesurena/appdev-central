'use client';

import React from 'react';
import { Card, Skeleton, Tag, Empty, Button } from 'antd';
import { Mail } from 'lucide-react';
import UserAvatar from '@/components/Avatar/UserAvatar';
import { Users } from '@/interface/user';

interface AssignedAccountsTabProps {
    user: Users | undefined;
    isLoading: boolean;
}

export default function AssignedAccountsTab({ user, isLoading }: AssignedAccountsTabProps) {
    if (isLoading) {
        return (
            <div className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <Card key={i} className="rounded-2xl border-gray-100 shadow-sm">
                            <Skeleton active avatar paragraph={{ rows: 1 }} />
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (!user?.assignedAccounts?.length) {
        return (
            <div className="pt-6">
                <Card className="rounded-3xl border-gray-100 border-dashed bg-gray-50/50 py-16 flex flex-col items-center justify-center">
                    <Empty description={<span className="text-gray-400 font-medium">No accounts assigned to this user yet.</span>} />
                    <Button type="primary" className="mt-4 rounded-xl font-bold px-6">
                        Assign New Account
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.assignedAccounts.map((account) => (
                    <Card
                        key={account.AccountID}
                        className="group rounded-2xl border-gray-100 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
                        styles={{ body: { padding: '16px' } }}
                    >
                        {/* Status bar */}
                        <div className={`absolute top-0 left-0 bottom-0 w-1 ${account.isActive !== false ? 'bg-green-500' : 'bg-volcano-400'}`} />

                        <div className="flex items-start gap-4">
                            <UserAvatar
                                src={account.GAvatar}
                                name={account.AccountName}
                                size={44}
                                className="ring-2 ring-gray-50 ring-offset-1"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 truncate mb-0.5 group-hover:text-primary transition-colors">
                                    {account.AccountName}
                                </h4>
                                <div className="flex items-center gap-2 mb-2">
                                    <Tag className="m-0 text-[10px] font-bold border-none bg-slate-100 text-slate-500 rounded">
                                        ID: {account.AccountIDNo}
                                    </Tag>
                                    <Tag color={account.Source === 'CustDB' ? 'cyan' : 'blue'} className="m-0 text-[10px] font-bold border-none rounded">
                                        {account.Source}
                                    </Tag>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                                        <Mail size={12} className="text-gray-300" />
                                        <span className="truncate">{account.Email || 'No email provided'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
