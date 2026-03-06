'use client';

import React from 'react';
import { Button, Tag, Skeleton } from 'antd';
import UserAvatar from '@/components/Avatar/UserAvatar';
import { Users } from '@/interface/user';

interface ProfileHeaderProps {
    user: Users | undefined;
    isLoading: boolean;
    onEdit: () => void;
}

export default function ProfileHeader({ user, isLoading, onEdit }: ProfileHeaderProps) {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-8 mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-60" />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
                {isLoading ? (
                    <Skeleton.Avatar active size={120} shape="circle" />
                ) : (
                    <div className="relative">
                        <UserAvatar
                            src={user?.GAvatar}
                            name={user?.AccountName}
                            size={120}
                        />
                    </div>
                )}

                <div className="flex-1 text-center md:text-left">
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton.Input active size="large" />
                            <br />
                            <Skeleton.Input active size="small" />
                        </div>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">{user?.AccountName}</h1>
                            <p className="text-lg text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2 mb-4">
                                <span className="text-primary">{user?.Nickname || 'No Nickname'}</span>
                                <span className="text-gray-300">•</span>
                                <span>{user?.DomainAccount || 'No Domain Account'}</span>
                            </p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <Tag color="blue" className="rounded-full px-4 py-0.5 border-none bg-blue-50 text-blue-600 font-bold">
                                    {user?.AccountType}
                                </Tag>
                                <Tag color="purple" className="rounded-full px-4 py-0.5 border-none bg-purple-50 text-purple-600 font-bold">
                                    {user?.AccountGroup}
                                </Tag>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex gap-2">
                    <Button
                        type="primary"
                        size="large"
                        className="rounded-xl font-bold h-12 shadow-lg shadow-primary/20"
                        onClick={onEdit}
                        disabled={isLoading}
                    >
                        Edit Profile
                    </Button>
                </div>
            </div>
        </div>
    );
}
