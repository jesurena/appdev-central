'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Tag, Skeleton, Card, Divider, Tabs, Empty } from 'antd';
import { ChevronLeft, XCircle, Users as UsersIcon, LayoutPanelLeft } from 'lucide-react';
import { useUser, useUpdateUser } from '@/hooks/users/useUsers';
import EditUserDialog from '@/components/Users/EditUserDialog';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoCard from './components/PersonalInfoCard';
import AccessRolesCard from './components/AccessRolesCard';
import AssignedAccountsTab from './components/AssignedAccountsTab';

export default function UserProfilePage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: user, isLoading, isError, refetch } = useUser(id as string);
    const updateUser = useUpdateUser();

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const handleSaveUser = (values: any) => {
        updateUser.mutate({ id: Number(id), userData: values }, {
            onSuccess: () => {
                setIsEditModalVisible(false);
                refetch();
            }
        });
    };

    if (isError) {
        return (
            <div className="p-8 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
                <XCircle size={48} className="text-red-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-900">User Not Found</h2>
                <p className="text-gray-500">We couldn't retrieve the user details.</p>
                <Button className="mt-4" onClick={() => router.push('/users')}>Back to Users</Button>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <Button
                type="text"
                icon={<ChevronLeft size={18} />}
                onClick={() => router.back()}
                className="!px-1 mb-6 flex items-center gap-1 text-gray-500 font-medium"
            >
                Back to User Management
            </Button>

            <ProfileHeader
                user={user}
                isLoading={isLoading}
                onEdit={() => setIsEditModalVisible(true)}
            />

            <EditUserDialog
                visible={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                onSave={handleSaveUser}
                user={user || null}
                isEditing={true}
                confirmLoading={updateUser.isPending}
            />

            <Tabs
                defaultActiveKey="overview"
                className="profile-tabs"
                items={[
                    {
                        key: 'overview',
                        label: (
                            <span className="flex items-center gap-2 font-bold px-2 py-1">
                                <LayoutPanelLeft size={18} />
                                Profile Overview
                            </span>
                        ),
                        children: (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                                <PersonalInfoCard user={user} isLoading={isLoading} />
                                <AccessRolesCard user={user} isLoading={isLoading} />
                            </div>
                        )
                    },
                    {
                        key: 'assignments',
                        label: (
                            <span className="flex items-center gap-2 font-bold px-2 py-1">
                                <UsersIcon size={18} />
                                Assigned Users
                                {user?.assignedAccounts && (
                                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] ml-1">
                                        {user.assignedAccounts.length}
                                    </span>
                                )}
                            </span>
                        ),
                        children: (
                            <AssignedAccountsTab user={user} isLoading={isLoading} />
                        )
                    }
                ]}
            />
        </div>
    );
}

