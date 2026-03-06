'use client';

import React, { useState, useEffect } from 'react';
import { Dropdown, Table, Button, Input, Tag } from 'antd';
import type { MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Search, RotateCcw, UserPlus, Users, MoreHorizontal, User, Edit3 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import UserAvatar from '@/components/Avatar/UserAvatar';
import StatusChip from '@/components/Table/StatusChip';
import UserFilterPopover, { FilterValues } from '@/components/Users/UserFilterPopover';
import { useTableUrlSync } from '@/hooks/useTableUrlSync';
import { useManagers, Manager } from '@/hooks/user-assignments/useUserAssignments';
import ViewAssignedUsersDialog from '@/components/Users/ViewAssignedUsersDialog';

export default function UserAssignmentTable() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Filter states initialized from URL params
    const [activeFilters, setActiveFilters] = useState<FilterValues>(() => {
        const statusVal = searchParams.get('status');
        return {
            accountGroup: searchParams.get('group'),
            accountType: searchParams.get('type'),
            status: statusVal === 'true' ? true : statusVal === 'false' ? false : null,
        };
    });

    const [pagination, setPagination] = useState(() => ({
        current: Number(searchParams.get('page')) || 1,
        pageSize: Number(searchParams.get('pageSize')) || 10,
    }));

    const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
    const [appliedSearch, setAppliedSearch] = useState(searchParams.get('search') || '');

    // Sync state with URL
    useTableUrlSync(activeFilters, appliedSearch, pagination);

    // Fetch managers using the hook with server-side params
    const { data: managersData, isLoading } = useManagers(pagination.current, pagination.pageSize, {
        AccountGroup: activeFilters.accountGroup,
        AccountType: activeFilters.accountType,
        isActive: activeFilters.status,
        search: appliedSearch,
    });

    // Modal state for viewing assignments
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedManager, setSelectedManager] = useState<Manager | null>(null);

    const handleRowClick = (record: Manager) => {
        setSelectedManager(record);
        setViewDialogOpen(true);
    };

    const handleReset = () => {
        setActiveFilters({ accountGroup: null, accountType: null, status: null });
        setSearchValue('');
        setAppliedSearch('');
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    const columns: ColumnsType<Manager> = [
        {
            title: 'Account ID',
            dataIndex: 'AccountID',
            key: 'AccountID',
            sorter: (a: Manager, b: Manager) => a.AccountID - b.AccountID,
            render: (text: number) => <span className="text-gray-500 font-medium">{text}</span>
        },
        {
            title: 'User name',
            dataIndex: 'AccountName',
            key: 'AccountName',
            sorter: (a: Manager, b: Manager) => a.AccountName.localeCompare(b.AccountName),
            render: (text: string, record: Manager) => (
                <div className="flex items-center gap-3">
                    <UserAvatar
                        src={record.GAvatar}
                        name={record.AccountName}
                        domainAccount={null}
                        size={40}
                        className="flex-shrink-0"
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 leading-none mb-1">{text}</span>
                        <span className="text-gray-500 text-xs">{record.Email}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Account Group',
            dataIndex: 'AccountGroup',
            key: 'AccountGroup',
            sorter: (a: Manager, b: Manager) => a.AccountGroup.localeCompare(b.AccountGroup),
            render: (text: string) => <span className="text-gray-600 font-medium">{text}</span>
        },
        {
            title: 'Account Type',
            dataIndex: 'AccountType',
            key: 'AccountType',
            render: (type: string) => <span className="text-gray-600 font-medium">{type}</span>
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (status: boolean) => <StatusChip status={status} />
        },
        {
            title: 'Assigned',
            dataIndex: 'Assigned',
            key: 'Assigned',
            align: 'center',
            sorter: (a: Manager, b: Manager) => a.Assigned - b.Assigned,
            render: (count: number) => (
                <Tag className="rounded-full px-3 bg-gray-100 border-none font-bold text-gray-600 m-0">
                    {count}
                </Tag>
            )
        },
        {
            title: '',
            key: 'action',
            width: 50,
            render: (_: any, record: Manager) => {
                const items: MenuProps['items'] = [
                    {
                        key: 'view_profile',
                        label: (
                            <div className="flex items-center gap-2 text-gray-700 py-1 font-medium">
                                <User size={16} />
                                <span>View Profile</span>
                            </div>
                        ),
                        onClick: ({ domEvent }: any) => {
                            domEvent.stopPropagation();
                            router.push(`/users/${record.AccountID}?from=assignments`);
                        }
                    },
                    {
                        key: 'edit',
                        label: (
                            <div className="flex items-center gap-2 text-primary py-1 font-medium">
                                <Edit3 size={16} />
                                <span>Edit Assignments</span>
                            </div>
                        ),
                        onClick: ({ domEvent }: any) => {
                            domEvent.stopPropagation();
                            // Implementation for editing assignments would go here
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

    return (
        <div className="relative">
            <div className="bg-white p-4 pt-2 rounded-2xl border border-gray-100 shadow-xl overflow-x-auto">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-900">All Users with Assignments</h2>
                        <span className="bg-accent-1 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                            {managersData?.meta?.total || 0}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Input
                            placeholder="Search by name, email, or group..."
                            prefix={<Search size={18} className="text-gray-400" />}
                            className="w-full md:w-[320px] rounded-lg h-10 border-gray-200"
                            value={searchValue}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearchValue(val);
                                if (val === '') {
                                    setAppliedSearch('');
                                    setPagination(prev => ({ ...prev, current: 1 }));
                                }
                            }}
                            onPressEnter={() => {
                                setAppliedSearch(searchValue);
                                setPagination(prev => ({ ...prev, current: 1 }));
                            }}
                            allowClear
                        />
                        <Button
                            icon={<RotateCcw size={18} />}
                            className="rounded-lg h-10 flex items-center gap-2 border-gray-200 font-medium text-gray-500 hover:text-primary hover:border-primary"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        <UserFilterPopover
                            currentFilters={activeFilters}
                            onApply={(values) => {
                                setActiveFilters(values);
                                setPagination(prev => ({ ...prev, current: 1 }));
                            }}
                            onReset={handleReset}
                        />
                        <Button
                            type="primary"
                            icon={<UserPlus size={18} />}
                            className="rounded-lg h-10 flex items-center gap-2 border-none font-medium shadow-none"
                        >
                            Assign User
                        </Button>
                    </div>
                </div>

                <Table
                    rowKey="AccountID"
                    loading={isLoading}
                    columns={columns}
                    dataSource={managersData?.data || []}
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                        className: 'cursor-pointer hover:bg-gray-50/50 transition-colors'
                    })}
                    pagination={{
                        ...pagination,
                        total: managersData?.meta?.total || 0,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50', '1000'],
                        onChange: (page, pageSize) => {
                            setPagination({ current: page, pageSize });
                        }
                    }}
                    className="user-management-table"
                />

                <ViewAssignedUsersDialog
                    open={viewDialogOpen}
                    manager={selectedManager}
                    onClose={() => {
                        setViewDialogOpen(false);
                        setSelectedManager(null);
                    }}
                />
            </div>
        </div>
    );
}
