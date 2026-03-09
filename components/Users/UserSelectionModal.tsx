'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Table, Input, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Search, RotateCcw } from 'lucide-react';
import { Users } from '@/interface/user';
import { useUsersPaginated } from '@/hooks/users/useUsers';
import UserAvatar from '@/components/Avatar/UserAvatar';
import StatusChip from '@/components/Table/StatusChip';
import UserFilterPopover, { FilterValues } from '@/components/Users/UserFilterPopover';

interface UserSelectionModalProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: (selectedUsers: Users[]) => void;
    selectionMode: 'single' | 'multiple';
    title: string;
    initialSelectedKeys: React.Key[];
    initialSelectedRows?: Users[];
    excludeKeys?: React.Key[];
}

export default function UserSelectionModal({
    open,
    onCancel,
    onConfirm,
    selectionMode,
    title,
    initialSelectedKeys,
    initialSelectedRows = [],
    excludeKeys = []
}: UserSelectionModalProps) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(initialSelectedKeys);
    const [selectedRowsMap, setSelectedRowsMap] = useState<Map<React.Key, Users>>(() => {
        const map = new Map();
        initialSelectedRows.forEach(user => map.set(user.AccountID, user));
        return map;
    });

    const [searchValue, setSearchValue] = useState('');
    const [appliedSearch, setAppliedSearch] = useState('');
    const [activeFilters, setActiveFilters] = useState<FilterValues>({
        accountGroup: null,
        accountType: null,
        status: null,
    });
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    const { data, isLoading } = useUsersPaginated(pagination.current, pagination.pageSize, {
        search: appliedSearch,
        AccountGroup: activeFilters.accountGroup,
        AccountType: activeFilters.accountType,
        isActive: activeFilters.status,
    });

    const filteredData = React.useMemo(() => {
        if (!data?.data) return [];
        return data.data.filter(u => !excludeKeys.includes(u.AccountID));
    }, [data, excludeKeys]);

    const totalCount = (data?.meta?.total || 0) - (data?.data?.filter(u => excludeKeys.includes(u.AccountID)).length || 0);

    useEffect(() => {
        if (open) {
            setSelectedRowKeys(initialSelectedKeys);
            const newMap = new Map();
            initialSelectedRows.forEach(user => newMap.set(user.AccountID, user));
            setSelectedRowsMap(newMap);
            setSearchValue('');
            setAppliedSearch('');
            setActiveFilters({
                accountGroup: null,
                accountType: null,
                status: null,
            });
            setPagination({ current: 1, pageSize: 10 });
        }
    }, [open]);

    const columns: ColumnsType<Users> = [
        {
            title: 'Account ID',
            dataIndex: 'AccountID',
            key: 'AccountID',
            width: 120,
            render: (text: number) => <span className="text-gray-500 font-medium">{text}</span>
        },
        {
            title: 'User name',
            dataIndex: 'AccountName',
            key: 'AccountName',
            render: (text: string, record: Users) => (
                <div className="flex items-center gap-3">
                    <UserAvatar
                        src={record.GAvatar}
                        name={record.AccountName}
                        size={32}
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 leading-none mb-1">{text}</span>
                        <span className="text-gray-500 text-xs">{record.Email}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Group',
            dataIndex: 'AccountGroup',
            key: 'AccountGroup',
            render: (text: string) => <span className="text-gray-600 font-medium text-xs">{text}</span>
        },
        {
            title: 'Type',
            dataIndex: 'AccountType',
            key: 'AccountType',
            render: (text: string) => <span className="text-gray-600 font-medium text-xs">{text}</span>
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 100,
            render: (status: boolean) => <StatusChip status={status} />
        }
    ];

    const handleOk = () => {
        const finalSelectedRows = selectedRowKeys
            .map(key => selectedRowsMap.get(key))
            .filter((user): user is Users => !!user);
        onConfirm(finalSelectedRows);
    };

    const handleReset = () => {
        setSearchValue('');
        setAppliedSearch('');
        setActiveFilters({
            accountGroup: null,
            accountType: null,
            status: null,
        });
        setPagination({ current: 1, pageSize: 10 });
    };

    const rowSelection = {
        type: selectionMode === 'single' ? ('radio' as const) : ('checkbox' as const),
        selectedRowKeys,
        onChange: (keys: React.Key[], rows: Users[]) => {
            setSelectedRowKeys(keys);
            setSelectedRowsMap(prev => {
                const newMap = new Map(prev);
                rows.forEach(row => {
                    if (keys.includes(row.AccountID)) {
                        newMap.set(row.AccountID, row);
                    }
                });
                return newMap;
            });
        },
    };

    return (
        <Modal
            title={title}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            width={800}
            centered
            okText="Confirm Selection"
            className="premium-modal"
            destroyOnHidden
            styles={{
                body: {
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    paddingRight: '8px'
                }
            }}
        >
            <div className="mb-4 flex items-center gap-3 mt-4">
                <Input
                    placeholder="Search by name, email, or id..."
                    prefix={<Search size={18} className="text-gray-400" />}
                    className="flex-1 rounded-lg h-10 border-gray-200"
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
                    className="rounded-lg h-10 flex items-center gap-2 border-gray-200 font-medium text-gray-500"
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
                />
            </div>

            <Table
                rowKey="AccountID"
                loading={isLoading}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: totalCount,
                    size: 'small',
                }}
                onChange={(newPagination: any) => {
                    setPagination({
                        current: newPagination.current,
                        pageSize: newPagination.pageSize,
                    });
                }}
                size="middle"
                className="selection-table"
                onRow={(record) => ({
                    onClick: () => {
                        if (selectionMode === 'single') {
                            setSelectedRowKeys([record.AccountID]);
                            setSelectedRowsMap(prev => new Map(prev).set(record.AccountID, record));
                        } else {
                            const isSelected = selectedRowKeys.includes(record.AccountID);
                            if (isSelected) {
                                setSelectedRowKeys(selectedRowKeys.filter(k => k !== record.AccountID));
                            } else {
                                setSelectedRowKeys([...selectedRowKeys, record.AccountID]);
                                setSelectedRowsMap(prev => new Map(prev).set(record.AccountID, record));
                            }
                        }
                    },
                })}
            />
        </Modal>
    );
}
