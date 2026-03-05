'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch, DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import AccountGroupSelect from '@/components/Select/AccountGroupSelect';
import AccountTypeSelect from '@/components/Select/AccountTypeSelect';

dayjs.extend(customParseFormat);

import { Users } from '@/interface/user';

interface EditUserDialogProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (values: any) => void;
    user: Users | null;
    isEditing: boolean;
}

export default function EditUserDialog({ visible, onCancel, onSave, user, isEditing }: EditUserDialogProps) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (isEditing && user) {
                form.setFieldsValue({
                    ...user,
                    ValidTo: user.ValidTo ? dayjs(user.ValidTo, 'MM-DD-YYYY') : null
                });
            } else {
                form.resetFields();
            }
        }
    }, [visible, user, isEditing, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            const formattedValues = {
                ...values,
                ValidTo: values.ValidTo ? values.ValidTo.format('MM-DD-YYYY') : null
            };
            onSave({ ...user, ...formattedValues });
        });
    };

    const allowTCD = Form.useWatch('AllowTCDAccess', form);
    const allowProcurement = Form.useWatch('AllowProcurementAccess', form);

    const moduleRoles = [
        { label: 'Super Admin', value: 1 },
        { label: 'Admin', value: 2 },
        { label: 'Buyer', value: 3 },
        { label: 'Requestor', value: 4 },
    ];

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
                initialValues={{
                    isActive: true,
                    AccountType: null,
                    AccountGroup: null,
                    AllowTCDAccess: false,
                    AllowProcurementAccess: false,
                    TCDRole: null,
                    ProcurementRole: null,
                    ValidTo: dayjs('01-01-2030', 'MM-DD-YYYY')
                }}
            >
                <div className="mb-5">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">User and Account Information</h3>
                    <p className="text-xs text-gray-500">Enter the user and account information here.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Full Name"
                        name="AccountName"
                        rules={[{ required: true, message: 'Please enter the user name' }]}
                    >
                        <Input placeholder="e.g. Florence Shaw" />
                    </Form.Item>

                    <Form.Item
                        label="Nickname"
                        name="Nickname"
                    >
                        <Input placeholder="e.g. Florence" />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Email Address"
                    name="Email"
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
                        name="AccountGroup"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <AccountGroupSelect />
                    </Form.Item>

                    <Form.Item
                        label="Account Type"
                        name="AccountType"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <AccountTypeSelect />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Valid To"
                        name="ValidTo"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <DatePicker format="MM-DD-YYYY" className="w-full" placeholder="Select Expiry Date" />
                    </Form.Item>
                    <Form.Item
                        label="Account Status"
                        name="isActive"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                    </Form.Item>
                </div>

                <div className="">
                    <div className="mb-5">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">Access Control & Permissions</h3>
                        <p className="text-xs text-gray-500">Enable system modules and assign specific functional roles for this user.</p>
                    </div>

                    <div className="">
                        <div className="grid grid-cols-2">
                            <Form.Item
                                label={<span className="text-gray-700 font-semibold">TCD Access</span>}
                                name="AllowTCDAccess"
                                valuePropName="checked"
                                className="mb-0"
                            >
                                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                            </Form.Item>

                            {allowTCD && (
                                <Form.Item
                                    label={<span className="text-gray-700 font-semibold">TCD Module Role</span>}
                                    name="TCDRole"
                                    className="mb-0"
                                    rules={[{ required: true, message: 'Required' }]}
                                >
                                    <Select placeholder="Select TCD Role" allowClear options={moduleRoles} />
                                </Form.Item>
                            )}
                        </div>

                        <div className="grid grid-cols-2">
                            <Form.Item
                                label={<span className="text-gray-700 font-semibold">Procurement Access</span>}
                                name="AllowProcurementAccess"
                                valuePropName="checked"
                                className="mb-0"
                            >
                                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                            </Form.Item>

                            {allowProcurement && (
                                <Form.Item
                                    label={<span className="text-gray-700 font-semibold">Procurement Module Role</span>}
                                    name="ProcurementRole"
                                    className="mb-0"
                                    rules={[{ required: true, message: 'Required' }]}
                                >
                                    <Select placeholder="Select Role" allowClear options={moduleRoles} />
                                </Form.Item>
                            )}
                        </div>
                    </div>
                </div>
            </Form>
        </Modal>
    );
}
