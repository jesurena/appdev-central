'use client';

import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import StatusChip from '@/components/Table/StatusChip';
import UserAvatar from '@/components/Avatar/UserAvatar';

import { Users } from '@/interface/user';

interface ViewUserDialogProps {
    visible: boolean;
    onClose: () => void;
    user: Users | null;
}

export default function ViewUserDialog({ visible, onClose, user }: ViewUserDialogProps) {
    if (!user) return null;

    const getRoleLabel = (role: number | string | null) => {
        if (!role) return '';
        const roles: Record<number | string, string> = {
            1: 'Super Admin',
            2: 'Admin',
            3: 'Buyer',
            4: 'Requestor'
        };
        return roles[role] || role.toString();
    };

    return (
        <Modal
            title="User Details"
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={{
                xs: '90%',
                sm: '80%',
                md: '70%',
                lg: '60%',
                xl: '50%',
                xxl: '40%',
            }}
            styles={{ body: { paddingTop: '20px' } }}
        >
            <div className="flex flex-col items-center mb-8">
                <UserAvatar
                    src={user.GAvatar}
                    domainAccount={user.DomainAccount}
                    name={user.AccountName}
                    size={84}
                    className="shadow-sm border-2 border-white"
                />
                <h2 className="text-xl mt-2 font-bold text-gray-900">{user.AccountName}</h2>
                <div className="flex items-center gap-2 text-gray-500">
                    <span>{user.Email}</span>
                    {user.DomainAccount && (
                        <>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="font-medium">{user.DomainAccount}</span>
                        </>
                    )}
                </div>
            </div>

            <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Account ID">
                    <span className="font-medium text-gray-700">{user.AccountID}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Nickname">
                    <span className="font-medium text-gray-700">{user.Nickname || 'N/A'}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Account Group">
                    <span className="font-medium text-gray-700">{user.AccountGroup}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Account Type">
                    <Tag color="blue" className="rounded-full px-3">{user.AccountType}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Valid To">
                    <span className="font-medium text-gray-700">
                        {user.ValidTo || 'N/A'}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="TCD Access">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <StatusChip status={!!user.AllowTCDAccess} />
                            <span className="text-xs text-gray-400 font-medium">{user.AllowTCDAccess ? 'AUTHORIZED' : 'RESTRICTED'}</span>
                        </div>
                        {user.AllowTCDAccess && user.TCDRole && (
                            <Tag color="orange" className="rounded-full px-3 text-[10px] font-bold border-none m-0">
                                {getRoleLabel(user.TCDRole)}
                            </Tag>
                        )}
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Procurement Access">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <StatusChip status={!!user.AllowProcurementAccess} />
                            <span className="text-xs text-gray-400 font-medium">{user.AllowProcurementAccess ? 'AUTHORIZED' : 'RESTRICTED'}</span>
                        </div>
                        {user.AllowProcurementAccess && user.ProcurementRole && (
                            <Tag color="purple" className="rounded-full px-3 text-[10px] font-bold border-none m-0">
                                {getRoleLabel(user.ProcurementRole)}
                            </Tag>
                        )}
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Account Status">
                    <StatusChip status={user.isActive} />
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    );
}
