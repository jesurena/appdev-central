import React from 'react';
import { Tag } from 'antd';

interface StatusChipProps {
    status: Boolean;
}

export default function StatusChip({ status }: StatusChipProps) {
    return (
        <Tag color={status === true ? 'green' : 'volcano'} className="rounded-md px-2 border-none font-semibold">
            {status === true ? 'Active' : 'Inactive'}
        </Tag>
    );
}
