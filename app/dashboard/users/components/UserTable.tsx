'use client';

import React, { useState } from 'react';
import { Table, Avatar, Tag, Button, Input, Space, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Search, Filter, Plus, MoreHorizontal, ArrowDown, Edit3, Eye } from 'lucide-react';
import StatusChip from '@/components/Table/StatusChip';
import EditUserDialog from '@/components/Users/EditUserDialog';
import ViewUserDialog from '@/components/Users/ViewUserDialog';

import { UserData } from '@/types/user';

const mockUsers: UserData[] = Array.from({ length: 44 }).map((_, i) => ({
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

export default function UserTable() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [searchText, setSearchText] = useState('');

    // Modal states
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleAddUser = () => {
        setIsEditing(false);
        setSelectedUser(null);
        setIsEditModalVisible(true);
    };

    const handleEditUser = (user: UserData) => {
        setIsEditing(true);
        setSelectedUser(user);
        setIsEditModalVisible(true);
    };

    const handleViewUser = (user: UserData) => {
        setSelectedUser(user);
        setIsViewModalVisible(true);
    };

    const handleSaveUser = (values: any) => {
        console.log('Saving user:', values);
        setIsEditModalVisible(false);
        // Here you would typically refresh data or update state
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.accountId.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<UserData> = [
        {
            title: 'Account ID',
            dataIndex: 'accountId',
            key: 'accountId',
            sorter: (a: UserData, b: UserData) => a.accountId.localeCompare(b.accountId),
            render: (text: string) => <span className="text-gray-500 font-medium">{text}</span>
        },
        {
            title: 'User name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: UserData, b: UserData) => a.name.localeCompare(b.name),
            render: (text: string, record: UserData) => (
                <div className="flex items-center gap-3">
                    <Avatar src={record.avatar} size={40} className="flex-shrink-0" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 leading-none mb-1">{text}</span>
                        <span className="text-gray-500 text-xs">{record.email}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Account Group',
            dataIndex: 'accountGroup',
            key: 'accountGroup',
            sorter: (a: UserData, b: UserData) => a.accountGroup.localeCompare(b.accountGroup),
            render: (text: string) => <span className="text-gray-600 font-medium">{text}</span>
        },
        {
            title: 'Account Type',
            dataIndex: 'accountType',
            key: 'accountType',
            render: (type: string) => <span className="text-gray-600 font-medium">{type}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: boolean) => <StatusChip status={status} />
        },
        {
            title: '',
            key: 'action',
            width: 50,
            render: (_: any, record: UserData) => {
                const items: MenuProps['items'] = [
                    {
                        key: 'edit',
                        label: (
                            <div className="flex items-center gap-2 text-primary py-1 font-medium">
                                <Edit3 size={16} />
                                <span>Edit User</span>
                            </div>
                        ),
                        onClick: ({ domEvent }) => {
                            domEvent.stopPropagation();
                            handleEditUser(record);
                        }
                    }
                ];

                return (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                            <Button
                                type="text"
                                icon={<MoreHorizontal size={18} className="text-gray-400" />}
                                className="flex items-center justify-center p-0 w-8 h-8 rounded-full hover:bg-gray-100"
                            />
                        </Dropdown>
                    </div>
                );
            },
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900">All users</h2>
                    <span className="bg-accent-1 text-white px-2 py-0.5 rounded-full text-xs font-bold">{filteredUsers.length}</span>
                </div>

                <div className="flex items-center gap-3">
                    <Input
                        placeholder="Search"
                        prefix={<Search size={18} className="text-gray-400" />}
                        className="rounded-lg h-10 border-gray-200 w-full md:w-64"
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                    />
                    <Button
                        icon={<Filter size={18} />}
                        className="rounded-lg h-10 flex items-center gap-2 border-gray-200 font-medium text-gray-700 hover:text-primary hover:border-primary"
                    >
                        Filters
                    </Button>
                    <Button
                        type="primary"
                        icon={<Plus size={18} />}
                        className="rounded-lg h-10 flex items-center gap-2 bg-gray-900 border-none hover:!bg-gray-800 font-medium shadow-none"
                        onClick={handleAddUser}
                    >
                        Add user
                    </Button>
                </div>
            </div>

            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={filteredUsers}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: false,
                    className: 'p-6 !mb-0 border-t border-gray-100',
                }}
                className="user-management-table cursor-pointer"
                onRow={(record) => ({
                    onClick: () => handleViewUser(record),
                })}
            />

            <EditUserDialog
                visible={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                onSave={handleSaveUser}
                user={selectedUser}
                isEditing={isEditing}
            />

            <ViewUserDialog
                visible={isViewModalVisible}
                onClose={() => setIsViewModalVisible(false)}
                user={selectedUser}
            />

        </div>
    );
}
