'use client';

import React from 'react';
import { Select, SelectProps } from 'antd';
import { useAccountTypeStats } from '@/hooks/dashboard/useDashboardData';

interface AccountTypeSelectProps extends SelectProps {
    // Add any custom props if needed
}

export default function AccountTypeSelect(props: AccountTypeSelectProps) {
    const { data, isLoading } = useAccountTypeStats();

    const options = data?.types?.map((type: any) => ({
        label: type.AccountType,
        value: type.AccountType,
    })) || [];

    return (
        <Select
            loading={isLoading}
            placeholder="Select Type"
            options={options}
            {...props}
        />
    );
}
