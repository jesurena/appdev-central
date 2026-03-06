'use client';

import React from 'react';
import { Card, Divider, Button, Skeleton, Modal } from 'antd';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { Users } from '@/interface/user';
import StatusChip from '@/components/Table/StatusChip';
import { useToggleUserStatus } from '@/hooks/users/useUsers';
import { getRoleLabel } from '@/utils/roleUtils';

interface AccessRolesCardProps {
    user: Users | undefined;
    isLoading: boolean;
}

export default function AccessRolesCard({ user, isLoading }: AccessRolesCardProps) {
    const toggleStatus = useToggleUserStatus();

    const handleToggle = () => {
        if (!user) return;

        Modal.confirm({
            title: user.isActive ? 'Deactivate Account' : 'Activate Account',
            content: `Are you sure you want to ${user.isActive ? 'deactivate' : 'activate'} ${user.AccountName}'s account?`,
            okText: 'Yes, Proceed',
            cancelText: 'No, Cancel',
            okButtonProps: {
                danger: user.isActive,
                className: !user.isActive ? 'bg-primary' : ''
            },
            centered: true,
            onOk: () => {
                toggleStatus.mutate(user.AccountID);
            }
        });
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="rounded-3xl border-gray-100 shadow-sm overflow-hidden" styles={{ body: { padding: 0 } }}>
                <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                    <Shield size={18} className="text-gray-400" />
                    <h3 className="font-bold text-gray-900">Access & Roles</h3>
                </div>
                <div className="p-6 space-y-6">
                    <PermissionItem
                        title="TCD Access"
                        hasAccess={user?.AllowTCDAccess || false}
                        role={user?.TCDRole}
                        loading={isLoading}
                    />
                    <Divider className="my-0" />
                    <PermissionItem
                        title="Procurement Access"
                        hasAccess={user?.AllowProcurementAccess || false}
                        role={user?.ProcurementRole}
                        loading={isLoading}
                    />
                </div>
            </Card>

            <Card className="rounded-3xl bg-primary/5 border-primary/10 shadow-sm p-6">
                <h4 className="font-bold text-primary mb-2">Account Status: <span><StatusChip status={user?.isActive || false} /></span></h4>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    This account is currently {user?.isActive ? 'active' : 'inactive'}.
                    Verified information securely stored in our multi-database system.
                </p>
                <Button
                    danger={user?.isActive}
                    type={user?.isActive ? 'default' : 'primary'}
                    className={`w-full rounded-xl font-bold h-10 border-none shadow-sm ${!user?.isActive ? 'bg-primary' : 'bg-white'}`}
                    onClick={handleToggle}
                    loading={toggleStatus.isPending}
                    disabled={isLoading}
                >
                    {user?.isActive ? 'Deactivate Account' : 'Activate Account'}
                </Button>
            </Card>
        </div>
    );
}

function PermissionItem({ title, hasAccess, role, loading }: { title: string; hasAccess: boolean; role?: any; loading?: boolean }) {
    return (
        <div className="flex items-start gap-4">
            <div className={`mt-1 p-2 rounded-xl flex-shrink-0 ${hasAccess ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {hasAccess ? <CheckCircle size={20} /> : <XCircle size={20} />}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 leading-none mb-1">{title}</p>
                {loading ? (
                    <Skeleton.Input active size="small" />
                ) : (
                    <p className="text-xs text-gray-500 font-medium truncate">
                        {hasAccess ? `Assigned Role: ${getRoleLabel(role) || 'Default'}` : 'Access Restricted'}
                    </p>
                )}
            </div>
        </div>
    );
}
