'use client';

import React, { useState } from 'react';
import { Table, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import StatusChip from '@/components/Table/StatusChip';
import { Users } from '@/interface/user';
import ViewUserDialog from '@/components/Users/ViewUserDialog';

const mockNewUsers: Users[] = Array.from({ length: 10 }).map((_, i) => ({
    key: (i + 1).toString(),
    accountId: `ACC-0${(i + 1).toString().padStart(2, '0')}`,
    name: ['Florence Shaw', 'Amélie Laurent', 'Ammar Foley', 'Caitlyn King', 'Sienna Hewitt', 'Olly Shroeder'][i % 6],
    nickname: ['Florence', 'Amélie', 'Ammar', 'Caitlyn', 'Sienna', 'Olly'][i % 6],
    email: ['florence@untitledui.com', 'amelie@untitledui.com', 'ammar@untitledui.com', 'caitlyn@untitledui.com', 'sienna@untitledui.com', 'olly@untitledui.com'][i % 6],
    avatar: `https://i.pravatar.cc/150?u=${i}`,
    accountGroup: ['Management', 'Operations', 'Finance', 'Marketing', 'Engineering', 'IT Support'][i % 6],
    accountType: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Standard' : 'Editor',
    status: i % 10 !== 8 && i % 10 !== 9, // Mix of Active/Inactive
}));

export default function NewestUsersTable() {
    const [selectedUser, setSelectedUser] = useState<Users | null>(null);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);

    const handleViewUser = (user: Users) => {
        setSelectedUser(user);
        setIsViewModalVisible(true);
    };

    const columns: ColumnsType<Users> = [
        {
            title: 'Account ID',
            dataIndex: 'accountId',
            key: 'accountId',
            render: (text) => <span className="text-gray-500 font-medium">{text}</span>
        },
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <Avatar src={record.avatar} size={40} className="flex-shrink-0" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 whitespace-nowrap">{text}</span>
                        <span className="text-xs text-gray-500">{record.email}</span>
                    </div>
                </div>
            )
        },
        {
            title: 'Account Group',
            dataIndex: 'accountGroup',
            key: 'accountGroup',
            render: (text) => <span className="text-gray-600 font-medium">{text}</span>
        },
        {
            title: 'Account Type',
            dataIndex: 'accountType',
            key: 'accountType',
            render: (type) => <span className="text-gray-600 font-medium">{type}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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
                dataSource={mockNewUsers}
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
            />
        </div>
    );
}
