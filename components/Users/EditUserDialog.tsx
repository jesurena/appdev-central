'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch } from 'antd';

import { UserData } from '@/types/user';

interface EditUserDialogProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (values: any) => void;
    user: UserData | null;
    isEditing: boolean;
}

export default function EditUserDialog({ visible, onCancel, onSave, user, isEditing }: EditUserDialogProps) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (isEditing && user) {
                form.setFieldsValue(user);
            } else {
                form.resetFields();
            }
        }
    }, [visible, user, isEditing, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            onSave({ ...user, ...values });
        });
    };

    return (
        <Modal
            title={isEditing ? "Edit User" : "Add New User"}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText={isEditing ? "Update" : "Create"}
            destroyOnHidden
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
            <Form
                form={form}
                layout="vertical"
                initialValues={{ status: true, accountType: 'Standard' }}
            >

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter the user name' }]}
                    >
                        <Input placeholder="e.g. Florence Shaw" />
                    </Form.Item>

                    <Form.Item
                        label="Nickname"
                        name="nickname"
                        rules={[{ required: true, message: 'Please enter the nickname' }]}
                    >
                        <Input placeholder="e.g. Florence" />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter the email address' },
                        { type: 'email', message: 'Please enter a valid email' }
                    ]}
                >
                    <Input placeholder="e.g. florence@untitledui.com" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Account Group"
                        name="accountGroup"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Select placeholder="Select Group">
                            <Select.Option value="Management">Management</Select.Option>
                            <Select.Option value="Operations">Operations</Select.Option>
                            <Select.Option value="Finance">Finance</Select.Option>
                            <Select.Option value="Marketing">Marketing</Select.Option>
                            <Select.Option value="Engineering">Engineering</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Account Type"
                        name="accountType"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Select placeholder="Select Type">
                            <Select.Option value="Admin">Admin</Select.Option>
                            <Select.Option value="Standard">Standard</Select.Option>
                            <Select.Option value="Editor">Editor</Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item
                    label="Account Status"
                    name="status"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                </Form.Item>
            </Form>
        </Modal>
    );
}