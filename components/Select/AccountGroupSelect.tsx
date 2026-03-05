'use client';

import React from 'react';
import { Select, SelectProps } from 'antd';
import { useAccountGroupStats } from '@/hooks/dashboard/useDashboardData';

interface AccountGroupSelectProps extends SelectProps {
    // Add any custom props if needed
}

export default function AccountGroupSelect(props: AccountGroupSelectProps) {
    const { data, isLoading } = useAccountGroupStats();

    const options = data?.groups?.map((group: any) => ({
        label: group.AccountGroup,
        value: group.AccountGroup,
    })) || [];

    return (
        <Select
            loading={isLoading}
            placeholder="Select Group"
            options={options}
            {...props}
        />
    );
}
