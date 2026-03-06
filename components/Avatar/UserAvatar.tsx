'use client';

import React from 'react';
import { Avatar } from 'antd';

interface UserAvatarProps {
    src?: string | null;
    domainAccount?: string | null;
    name?: string | null;
    size?: number | 'large' | 'small' | 'default';
    className?: string;
}

const colors = [
    '#f56a00', '#7265e6', '#ffbf00', '#00a2ae',
    '#87d068', '#f5222d', '#1890ff', '#eb2f96'
];

export default function UserAvatar({ src, domainAccount, name, size = 40, className }: UserAvatarProps) {
    if (src) {
        return (
            <Avatar
                src={<img src={src} alt={name || 'Avatar'} referrerPolicy="no-referrer" />}
                size={size}
                className={className}
            />
        );
    }

    const identifier = domainAccount || name || '?';
    const initials = identifier.substring(0, 2).toUpperCase();
    const colorIndex = identifier.length % colors.length;
    const backgroundColor = colors[colorIndex];
    const fontSize = typeof size === 'number' ? size / 2.5 : 16;

    return (
        <Avatar
            size={size}
            className={className}
            style={{ backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <span
                className="font-semibold text-white uppercase"
                style={{ fontSize: `${fontSize}px`, lineHeight: 1 }}
            >
                {initials}
            </span>
        </Avatar>
    );
}
