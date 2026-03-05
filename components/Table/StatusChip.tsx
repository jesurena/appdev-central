import React from 'react';
import { Tag } from 'antd';

interface StatusChipProps {
    status: boolean;
    activeText?: string;
    inactiveText?: string;
}

export default function StatusChip({ status, activeText = 'Active', inactiveText = 'Inactive' }: StatusChipProps) {
    return (
        <Tag color={status === true ? 'green' : 'volcano'} className="rounded-md px-2 border-none font-semibold">
            {status === true ? activeText : inactiveText}
        </Tag>
    );
}
