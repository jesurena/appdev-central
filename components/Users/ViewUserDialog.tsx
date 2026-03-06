'use client';

import React from 'react';
import { Modal, Descriptions, Tag, Button, Tooltip } from 'antd';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import StatusChip from '@/components/Table/StatusChip';
import UserAvatar from '@/components/Avatar/UserAvatar';
import { getRoleLabel } from '@/utils/roleUtils';
import { copyToClipboard } from '@/utils/clipboard';

import { Users } from '@/interface/user';

interface ViewUserDialogProps {
    visible: boolean;
    onClose: () => void;
    user: Users | null;
    showProfileButton?: boolean;
}

export default function ViewUserDialog({ visible, onClose, user, showProfileButton = false }: ViewUserDialogProps) {
    const router = useRouter();
    const [copiedField, setCopiedField] = React.useState<string | null>(null);

    if (!user) return null;

    const handleCopy = (text: string, field: string) => {
        copyToClipboard(text, field);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleGoToProfile = () => {
        onClose();
        router.push(`/users/${user.AccountID}`);
    };

    return (
        <Modal
            title="User Details"
            open={visible}
            onCancel={onClose}
            footer={
                showProfileButton ? (
                    <div className="flex justify-end pt-2">
                        <Button
                            type="primary"
                            icon={<ExternalLink size={14} />}
                            onClick={handleGoToProfile}
                            className="rounded-xl font-bold bg-primary hover:bg-primary/90 flex items-center gap-2"
                        >
                            Go to User Profile
                        </Button>
                    </div>
                ) : null
            }
            centered
            width={{
                xs: '90%',
                sm: '80%',
                md: '70%',
                lg: '60%',
                xl: '50%',
                xxl: '40%',
            }}
            styles={{ body: { paddingTop: '20px' } }}
        >
            <div className="flex flex-col items-center mb-8">
                <UserAvatar
                    src={user.GAvatar}
                    domainAccount={user.DomainAccount}
                    name={user.AccountName}
                    size={84}
                    className="shadow-sm border-2 border-white"
                />
                <h2 className="text-xl mt-2 font-bold text-gray-900">{user.AccountName}</h2>
                <div className="flex flex-col items-center text-gray-500">
                    <div className="flex items-center gap-2 group">
                        <span className="text-sm">{user.Email}</span>
                        <Tooltip title={copiedField === 'Header Email' ? 'Copied!' : 'Copy Email'}>
                            <button
                                onClick={() => handleCopy(user.Email, 'Header Email')}
                                className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-primary"
                            >
                                {copiedField === 'Header Email' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                        </Tooltip>
                    </div>
                    {user.DomainAccount && (
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-medium text-xs opacity-60 uppercase tracking-wider">{user.DomainAccount}</span>
                        </div>
                    )}
                </div>
            </div>

            <Descriptions column={1} bordered size="small" styles={{ label: { width: '40%' } }}>
                <Descriptions.Item label="Account ID">
                    <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-gray-900">{user.AccountID}</span>
                        <Tooltip title={copiedField === 'Account ID' ? 'Copied!' : 'Copy ID'}>
                            <button
                                onClick={() => handleCopy(String(user.AccountID), 'Account ID')}
                                className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-primary"
                            >
                                {copiedField === 'Account ID' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                        </Tooltip>
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Nickname">
                    <span className="font-medium text-gray-700">{user.Nickname || 'N/A'}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Account Group">
                    <span className="font-medium text-gray-700">{user.AccountGroup}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Account Type">
                    <Tag color="blue" className="rounded-full px-3">{user.AccountType}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Valid To">
                    <span className="font-medium text-gray-700">
                        {user.ValidTo || 'N/A'}
                    </span>
                </Descriptions.Item>
                <Descriptions.Item label="TCD Access">
                    <div className="flex items-center gap-2">
                        <StatusChip
                            status={!!user.AllowTCDAccess}
                            activeText="AUTHORIZED"
                            inactiveText="RESTRICTED"
                        />
                        {user.AllowTCDAccess && user.TCDRole && (
                            <Tag color="orange" className="rounded-full px-3 text-[10px] font-bold border-none m-0 uppercase">
                                {getRoleLabel(user.TCDRole)}
                            </Tag>
                        )}
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Procurement Access">
                    <div className="flex items-center gap-2">
                        <StatusChip
                            status={!!user.AllowProcurementAccess}
                            activeText="AUTHORIZED"
                            inactiveText="RESTRICTED"
                        />
                        {user.AllowProcurementAccess && user.ProcurementRole && (
                            <Tag color="purple" className="rounded-full px-3 text-[10px] font-bold border-none m-0 uppercase">
                                {getRoleLabel(user.ProcurementRole)}
                            </Tag>
                        )}
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Account Status">
                    <StatusChip status={user.isActive} />
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    );
}
