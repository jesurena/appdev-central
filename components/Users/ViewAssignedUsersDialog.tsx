'use client';

import React from 'react';
import { Modal, Empty, Skeleton } from 'antd';
import { Users } from 'lucide-react';
import { useAssignedAccounts, Manager } from '@/hooks/user-assignments/useUserAssignments';
import AssignedUserCard from './AssignedUserCard';

interface ViewAssignedUsersDialogProps {
    manager: Manager | null;
    open: boolean;
    onClose: () => void;
}

export default function ViewAssignedUsersDialog({ manager, open, onClose }: ViewAssignedUsersDialogProps) {
    const { data: accounts = [], isLoading } = useAssignedAccounts(manager?.AccountID || null);

    return (
        <Modal
            title={
                <div className="flex flex-col gap-4 py-2 mr-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/5">
                            <Users size={18} className="text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 leading-tight">Assigned Users</h3>
                            <p className="text-xs text-gray-500 font-medium italic">Managed by {manager?.AccountName}</p>
                        </div>
                    </div>
                </div>
            }
            open={open}
            onCancel={onClose}
            footer={null}
            width={1000}
            centered
            className="assigned-users-modal no-title-divider"
            styles={{
                body: {
                    padding: '24px',
                    backgroundColor: '#f9fafb',
                    maxHeight: '75vh',
                    overflowY: 'auto'
                }
            }}
        >
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-3 shadow-sm">
                            <Skeleton.Avatar active size={52} />
                            <div className="flex-1">
                                <Skeleton active paragraph={{ rows: 2 }} title={{ width: '60%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : accounts.length === 0 ? (
                <div className="py-16 bg-white rounded-2xl border border-dashed border-gray-200 text-center shadow-sm">
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                            <span className="text-gray-400 font-medium italic">No users currently assigned to this personnel.</span>
                        }
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                    {accounts.map((user) => (
                        <AssignedUserCard key={user.AccountID} user={user} />
                    ))}
                </div>
            )}
        </Modal>
    );
}
