'use client';

import React, { useState } from 'react';
import { Table, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import StatusChip from '@/components/Table/StatusChip';
import { Users } from '@/interface/user';
import ViewUserDialog from '@/components/Users/ViewUserDialog';

import { useLatestUsers } from '@/hooks/dashboard/useDashboardData';
import UserAvatar from '@/components/Avatar/UserAvatar';

export default function NewestUsersTable() {
    const { data: latestUsers = [] } = useLatestUsers();
    const [selectedUser, setSelectedUser] = useState<Users | null>(null);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);

    const handleViewUser = (user: Users) => {
        setSelectedUser(user);
        setIsViewModalVisible(true);
    };

    const columns: ColumnsType<Users> = [
        {
            title: 'Account ID',
            dataIndex: 'AccountID',
            key: 'AccountID',
            render: (text) => <span className="text-gray-500 font-medium">{text}</span>
        },
        {
            title: 'User',
            dataIndex: 'AccountName',
            key: 'AccountName',
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <UserAvatar
                        src={record.GAvatar}
                        domainAccount={record.DomainAccount}
                        size={40}
                        className="flex-shrink-0"
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 whitespace-nowrap">{text}</span>
                        <span className="text-xs text-gray-500">{record.Email}</span>
                    </div>
                </div>
            )
        },
        {
            title: 'Account Group',
            dataIndex: 'AccountGroup',
            key: 'AccountGroup',
            render: (text) => <span className="text-gray-600 font-medium">{text}</span>
        },
        {
            title: 'Account Type',
            dataIndex: 'AccountType',
            key: 'AccountType',
            render: (type) => <span className="text-gray-600 font-medium">{type}</span>
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (status) => <StatusChip status={status} />
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden overflow-x-auto">
            <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">Newest Users</h3>
                <p className="text-sm text-gray-500 mt-1">Overview of the last 10 users joined</p>
            </div>
            <Table
                columns={columns}
                dataSource={latestUsers}
                rowKey="AccountID"
                pagination={false}
                className="w-full cursor-pointer"
                rowClassName="hover:bg-gray-50 transition-colors"
                onRow={(record) => ({
                    onClick: () => handleViewUser(record),
                })}
            />

            <ViewUserDialog
                visible={isViewModalVisible}
                onClose={() => setIsViewModalVisible(false)}
                user={selectedUser}
                showProfileButton
            />
        </div>
    );
}
