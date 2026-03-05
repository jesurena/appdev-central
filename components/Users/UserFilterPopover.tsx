'use client';

import React, { useState } from 'react';
import { Popover, Button, Select, Divider } from 'antd';
import { Filter, RotateCcw } from 'lucide-react';
import AccountGroupSelect from '@/components/Select/AccountGroupSelect';
import AccountTypeSelect from '@/components/Select/AccountTypeSelect';

export interface FilterValues {
    accountGroup: string | null;
    accountType: string | null;
    status: boolean | null;
}

export interface UserFilterPopoverProps {
    onApply: (filters: FilterValues) => void;
    onReset: () => void;
}

export default function UserFilterPopover({ onApply, onReset }: UserFilterPopoverProps) {
    const [filters, setFilters] = useState<FilterValues>({
        accountGroup: null,
        accountType: null,
        status: null,
    });

    const handleResetAll = () => {
        const resetValues: FilterValues = {
            accountGroup: null,
            accountType: null,
            status: null,
        };
        setFilters(resetValues);
        onReset();
    };

    const handleApply = () => {
        onApply(filters);
    };

    const filterContent = (
        <div className="w-[320px] p-2">
            <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-900">Filter</span>
            </div>

            {/* Account Group */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Account Group</span>
                    <button
                        onClick={() => setFilters({ ...filters, accountGroup: null })}
                        className="text-primary text-xs font-medium hover:underline"
                    >
                        Reset
                    </button>
                </div>
                <AccountGroupSelect
                    className="w-full"
                    placeholder="Select group"
                    value={filters.accountGroup}
                    onChange={(val) => setFilters({ ...filters, accountGroup: val as string })}
                />
            </div>

            {/* Account Type */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Account Type</span>
                    <button
                        onClick={() => setFilters({ ...filters, accountType: null })}
                        className="text-primary text-xs font-medium hover:underline"
                    >
                        Reset
                    </button>
                </div>
                <AccountTypeSelect
                    className="w-full"
                    placeholder="Select type"
                    value={filters.accountType}
                    onChange={(val) => setFilters({ ...filters, accountType: val as string })}
                />
            </div>

            {/* Status */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Status</span>
                    <button
                        onClick={() => setFilters({ ...filters, status: null })}
                        className="text-primary text-xs font-medium hover:underline"
                    >
                        Reset
                    </button>
                </div>
                <Select
                    className="w-full"
                    placeholder="Select status"
                    value={filters.status}
                    onChange={(val) => setFilters({ ...filters, status: val })}
                    options={[
                        { label: 'Active', value: true },
                        { label: 'Inactive', value: false },
                    ]}
                />
            </div>

            <div className="flex items-center gap-3">
                <Button
                    className="flex-1 rounded-lg h-10 border-gray-200 font-bold text-gray-700"
                    onClick={handleResetAll}
                >
                    Reset all
                </Button>
                <Button
                    type="primary"
                    className="flex-1 rounded-lg h-10 bg-primary border-none font-bold"
                    onClick={handleApply}
                >
                    Apply now
                </Button>
            </div>
        </div>
    );

    return (
        <Popover
            content={filterContent}
            trigger="click"
            placement="bottomRight"
            overlayClassName="user-filter-popover"
        >
            <Button
                icon={<Filter size={18} />}
                className="rounded-lg h-10 flex items-center gap-2 border-gray-200 font-medium text-gray-700 hover:text-primary hover:border-primary"
            >
                Filters
            </Button>
        </Popover>
    );
}
