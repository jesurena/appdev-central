'use client';

import React from 'react';
import { Card, Skeleton, Empty, Button } from 'antd';
import { Users } from '@/interface/user';
import AssignedUserCard from '@/components/Users/AssignedUserCard';

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
                    <Empty
                        description={<span className="text-gray-400 font-medium">No users assigned to this person yet.</span>}
                    >
                        <Button type="primary" className="rounded-xl font-bold px-6">
                            Assign New User
                        </Button>
                    </Empty>
                </Card>
            </div>
        );
    }

    return (
        <div className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.assignedAccounts.map((account) => (
                    <AssignedUserCard key={account.AccountID} user={account} />
                ))}
            </div>
        </div>
    );
}
