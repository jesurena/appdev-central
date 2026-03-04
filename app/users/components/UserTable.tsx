'use client';

import React, { useState } from 'react';
import { Table, Avatar, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Search, Plus, RotateCcw, CheckCircle, XCircle, MoreHorizontal, Edit3 } from 'lucide-react';
import StatusChip from '@/components/Table/StatusChip';
import EditUserDialog from '@/components/Users/EditUserDialog';
import ViewUserDialog from '@/components/Users/ViewUserDialog';
import { Users } from '@/interface/user';
import UserFilterPopover, { FilterValues } from '@/components/Users/UserFilterPopover';

const initialMockUsers: Users[] = Array.from({ length: 44 }).map((_, i) => ({
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
    const [users, setUsers] = useState<Users[]>(initialMockUsers);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // Filter states
    const [activeFilters, setActiveFilters] = useState<FilterValues>({
        accountGroup: null,
        accountType: null,
        status: null,
    });

    // Modal states
    const [selectedUser, setSelectedUser] = useState<Users | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleAddUser = () => {
        setIsEditing(false);
        setSelectedUser(null);
        setIsEditModalVisible(true);
    };

    const handleEditUser = (user: Users) => {
        setIsEditing(true);
        setSelectedUser(user);
        setIsEditModalVisible(true);
    };

    const handleViewUser = (user: Users) => {
        setSelectedUser(user);
        setIsViewModalVisible(true);
    };

    const handleSaveUser = (values: any) => {
        if (isEditing && selectedUser) {
            setUsers(prev => prev.map(u => u.key === selectedUser.key ? { ...u, ...values } : u));
        } else {
            const newUser: Users = {
                ...values,
                key: (users.length + 1).toString(),
                accountId: `ACC-0${(users.length + 1).toString().padStart(2, '0')}`,
                avatar: `https://i.pravatar.cc/150?u=${users.length}`,
            };
            setUsers(prev => [newUser, ...prev]);
        }
        setIsEditModalVisible(false);
    };

    const handleBulkStatusUpdate = (status: boolean) => {
        setUsers(prev => prev.map(user =>
            selectedRowKeys.includes(user.key) ? { ...user, status } : user
        ));
        setSelectedRowKeys([]);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const filteredUsers = users.filter(user => {
        const matchesStatus = activeFilters.status === null || user.status === activeFilters.status;
        const matchesGroup = !activeFilters.accountGroup || user.accountGroup === activeFilters.accountGroup;
        const matchesType = !activeFilters.accountType || user.accountType === activeFilters.accountType;

        return matchesStatus && matchesGroup && matchesType;
    });

    const columns: ColumnsType<Users> = [
        {
            title: 'Account ID',
            dataIndex: 'accountId',
            key: 'accountId',
            sorter: (a: Users, b: Users) => a.accountId.localeCompare(b.accountId),
            render: (text: string) => <span className="text-gray-500 font-medium">{text}</span>
        },
        {
            title: 'User name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: Users, b: Users) => a.name.localeCompare(b.name),
            render: (text: string, record: Users) => (
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
            sorter: (a: Users, b: Users) => a.accountGroup.localeCompare(b.accountGroup),
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
            render: (_: any, record: Users) => {
                const items: MenuProps['items'] = [
                    {
                        key: 'edit',
                        label: (
                            <div className="flex items-center gap-2 text-primary py-1 font-medium">
                                <Edit3 size={16} />
                                <span>Edit User</span>
                            </div>
                        ),
                        onClick: ({ domEvent }: any) => {
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

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: filteredUsers.length,
    });

    const handleTableChange = (newPagination: any) => {
        setPagination({
            ...newPagination,
            total: filteredUsers.length,
        });
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div className="relative">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xl overflow-x-auto">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-900">All users</h2>
                        <span className="bg-accent-1 text-white px-2 py-0.5 rounded-full text-xs font-bold">{filteredUsers.length}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            icon={<RotateCcw size={18} />}
                            className="rounded-lg h-10 flex items-center gap-2 border-gray-200 font-medium text-gray-500 hover:text-primary hover:border-primary"
                            onClick={() => setActiveFilters({ accountGroup: null, accountType: null, status: null })}
                        >
                            Reset
                        </Button>
                        <UserFilterPopover
                            onApply={(values) => setActiveFilters(values)}
                            onReset={() => setActiveFilters({ accountGroup: null, accountType: null, status: null })}
                        />
                        <Button
                            type="primary"
                            icon={<Plus size={18} />}
                            className="rounded-lg h-10 flex items-center gap-2 border-none font-medium shadow-none"
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
                        ...pagination,
                        total: filteredUsers.length,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30', '50'],
                        className: 'p-6 !mb-0 border-t border-gray-100',
                    }}
                    onChange={handleTableChange}
                    className="user-management-table cursor-pointer"
                    onRow={(record: Users) => ({
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

            {/* Floating Bulk Action Bar */}
            {selectedRowKeys.length > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-xl px-6 py-3 flex items-center gap-4">
                        <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
                            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                {selectedRowKeys.length}
                            </span>
                            <span className="text-gray-600 font-medium text-sm whitespace-nowrap">selected</span>
                        </div>

                        <button
                            onClick={() => handleBulkStatusUpdate(true)}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-green-50 text-green-600 transition-colors font-semibold text-sm group"
                        >
                            <CheckCircle size={18} className="transition-transform group-hover:scale-110" />
                            <span>Bulk Active</span>
                        </button>

                        <button
                            onClick={() => handleBulkStatusUpdate(false)}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-red-50 text-red-600 transition-colors font-semibold text-sm group"
                        >
                            <XCircle size={18} className="transition-transform group-hover:scale-110" />
                            <span>Bulk Inactive</span>
                        </button>

                        <button
                            onClick={() => setSelectedRowKeys([])}
                            className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                        >
                            <XCircle size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
