'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Divider, Button, Tag, Avatar } from 'antd';
import { Manager, useAssignedAccounts } from '@/hooks/user-assignments/useUserAssignments';
import { ShieldCheck, Search, UserPlus } from 'lucide-react';
import UserSelectionModal from '@/components/Users/UserSelectionModal';
import { Users } from '@/interface/user';
import UserCard from '@/components/Users/UserCard';
import UserChip from '@/components/Users/UserChip';

interface EditUserAssignmentDialogProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (payload: { parent: number; data: { userIds: number[] } }) => void;
    manager: Manager | null;
    confirmLoading?: boolean;
}

export default function EditUserAssignmentDialog({
    visible,
    onCancel,
    onSave,
    manager,
    confirmLoading
}: EditUserAssignmentDialogProps) {
    const [form] = Form.useForm();

    const [managerModalOpen, setManagerModalOpen] = useState(false);
    const [personnelModalOpen, setPersonnelModalOpen] = useState(false);
    const [selectedManager, setSelectedManager] = useState<Users | null>(null);
    const [selectedPersonnel, setSelectedPersonnel] = useState<Users[]>([]);
    const [loadedManagerId, setLoadedManagerId] = useState<number | null>(null);
    const { data: currentAssignments } = useAssignedAccounts(selectedManager?.AccountID || null);
    useEffect(() => {
        if (visible && manager && !selectedManager) {
            setSelectedManager({
                AccountID: manager.AccountID,
                AccountIDNo: manager.AccountIDNo,
                AccountName: manager.AccountName,
                Email: manager.Email,
                GAvatar: manager.GAvatar,
                isActive: manager.isActive,
                AccountGroup: manager.AccountGroup,
                AccountType: manager.AccountType,
            } as any);
            form.setFieldsValue({ ManagerID: manager.AccountID });
        }
    }, [visible, manager, selectedManager, form]);

    useEffect(() => {
        if (visible && currentAssignments && selectedManager) {
            if (loadedManagerId !== selectedManager.AccountID) {
                setSelectedPersonnel(currentAssignments);
                setLoadedManagerId(selectedManager.AccountID);
                form.setFieldsValue({
                    UserIDs: currentAssignments.map(u => u.AccountID)
                });
            }
        }
    }, [currentAssignments, selectedManager, visible, form, loadedManagerId]);

    useEffect(() => {
        if (!visible) {
            form.resetFields();
            setSelectedManager(null);
            setSelectedPersonnel([]);
            setLoadedManagerId(null);
        }
    }, [visible, form]);

    const handleOk = () => {
        const managerId = form.getFieldValue('ManagerID');
        const userIds = form.getFieldValue('UserIDs') || [];

        if (!managerId) {
            form.validateFields(['ManagerID']);
            return;
        }
        if (userIds.length === 0) {
            form.validateFields(['UserIDs']);
            return;
        }

        onSave({
            parent: managerId,
            data: { userIds }
        });
    };

    const handleManagerConfirm = (users: Users[]) => {
        if (users.length > 0) {
            const user = users[0];
            setSelectedManager(user);
            form.setFieldsValue({ ManagerID: user.AccountID });
            const updatedPersonnel = selectedPersonnel.filter(p => p.AccountID !== user.AccountID);
            setSelectedPersonnel(updatedPersonnel);
            form.setFieldsValue({ UserIDs: updatedPersonnel.map(p => p.AccountID) });
        }
        setManagerModalOpen(false);
    };

    const handlePersonnelConfirm = (users: Users[]) => {
        setSelectedPersonnel(users);
        form.setFieldsValue({ UserIDs: users.map(u => u.AccountID) });
        setPersonnelModalOpen(false);
    };

    const removePersonnel = (userId: number) => {
        const updated = selectedPersonnel.filter(p => p.AccountID !== userId);
        setSelectedPersonnel(updated);
        form.setFieldsValue({ UserIDs: updated.map(u => u.AccountID) });
    };

    return (
        <>
            <Modal
                title={manager ? "Edit Assignments" : "New User Assignment"}
                open={visible}
                onOk={handleOk}
                onCancel={onCancel}
                confirmLoading={confirmLoading}
                okText={manager ? "Update Assignments" : "Create Assignment"}
                width={650}
                centered
                destroyOnHidden
                forceRender
                className="premium-modal"
                styles={{ body: { padding: '24px 32px 32px 32px' } }}
            >
                <Form form={form} layout="vertical" className="mt-4">
                    <div className="mb-6 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 flex gap-3">
                        <ShieldCheck size={18} className="text-blue-500 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-blue-900 mb-0.5">Structure</h4>
                            <p className="text-xs text-blue-700 leading-relaxed font-medium opacity-80">
                                Organize members by assigning leaders and grouping the people under them.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Form.Item
                            label={<span className="text-gray-700 font-bold text-xs uppercase tracking-widest pl-1">Superior (Manager)</span>}
                            name="ManagerID"
                            rules={[{ required: true, message: 'Please select a manager' }]}
                        >
                            <div className="flex flex-col gap-2">
                                {selectedManager ? (
                                    <UserCard
                                        user={selectedManager}
                                        className="!border-blue-100 bg-blue-50/10"
                                    />
                                ) : (
                                    <Button
                                        type="dashed"
                                        block
                                        className="h-16 rounded-xl border-2 flex items-center justify-center gap-2 text-gray-400 hover:text-primary hover:border-primary transition-all font-medium"
                                        onClick={() => setManagerModalOpen(true)}
                                    >
                                        <Search size={18} />
                                        Click to search and select a superior
                                    </Button>
                                )}
                                {selectedManager && !manager && (
                                    <div className="flex justify-end">
                                        <Button
                                            type="text"
                                            size="small"
                                            onClick={() => setManagerModalOpen(true)}
                                            className="text-primary font-bold text-xs p-0 h-auto"
                                        >
                                            Change Superior
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Form.Item>

                        <Divider className="my-0 border-gray-100" />

                        <Form.Item
                            label={
                                <div className="flex items-center justify-between w-full pr-1">
                                    <span className="text-gray-700 font-bold text-xs uppercase tracking-widest pl-1">Assigned Personnel</span>
                                    {selectedPersonnel.length > 0 && (
                                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                                            {selectedPersonnel.length} Selected
                                        </span>
                                    )}
                                </div>
                            }
                            name="UserIDs"
                            rules={[{ required: true, message: 'Please select at least one personnel' }]}
                        >
                            <div className="flex flex-col gap-4">
                                <Button
                                    type="dashed"
                                    block
                                    className="h-12 rounded-xl flex items-center justify-center gap-2 text-primary border-primary/30 hover:bg-primary/5 transition-all font-bold disabled:opacity-50 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200"
                                    onClick={() => setPersonnelModalOpen(true)}
                                    disabled={!selectedManager}
                                >
                                    <UserPlus size={18} />
                                    {selectedManager ? "Add Personnel" : "Select a superior first to add personnel"}
                                </Button>

                                {selectedPersonnel.length > 0 && (
                                    <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto p-4 rounded-2xl">
                                        {selectedPersonnel.map(person => (
                                            <UserChip
                                                key={person.AccountID}
                                                user={person}
                                                isRemovable
                                                onRemove={removePersonnel}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>

            <UserSelectionModal
                open={managerModalOpen}
                title="Select Superior (Manager)"
                selectionMode="single"
                onCancel={() => setManagerModalOpen(false)}
                onConfirm={handleManagerConfirm}
                initialSelectedKeys={selectedManager ? [selectedManager.AccountID] : []}
                excludeKeys={selectedPersonnel.map(p => p.AccountID)}
            />

            <UserSelectionModal
                open={personnelModalOpen}
                title="Select Personnel to Assign"
                selectionMode="multiple"
                onCancel={() => setPersonnelModalOpen(false)}
                onConfirm={handlePersonnelConfirm}
                initialSelectedKeys={selectedPersonnel.map(p => p.AccountID)}
                initialSelectedRows={selectedPersonnel}
                excludeKeys={selectedManager ? [selectedManager.AccountID] : []}
            />
        </>
    );
}
