'use client';

import React from 'react';
import { Modal, Descriptions, Avatar, Tag } from 'antd';
import StatusChip from '@/components/Table/StatusChip';

import { UserData } from '@/types/user';

interface ViewUserDialogProps {
    visible: boolean;
    onClose: () => void;
    user: UserData | null;
}

export default function ViewUserDialog({ visible, onClose, user }: ViewUserDialogProps) {
    if (!user) return null;

    return (
        <Modal
            title="User Details"
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={{
                xs: '80%',
                sm: '70%',
                md: '60%',
                lg: '50%',
                xl: '40%',
                xxl: '30%',
            }}
            styles={{ body: { paddingTop: '20px' } }}
        >
            <div className="flex flex-col items-center mb-8">
                <Avatar src={user.avatar} size={84} className="mb-4 shadow-sm border-2 border-white" />
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
            </div>

            <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Account ID">
                    <span className="font-medium text-gray-700">{user.accountId}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Nickname">
                    <span className="font-medium text-gray-700">{user.nickname}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Account Group">
                    <span className="font-medium text-gray-700">{user.accountGroup}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Account Type">
                    <Tag color="blue" className="rounded-full px-3">{user.accountType}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                    <StatusChip status={user.status} />
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    );
}