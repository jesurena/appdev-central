'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, Input, Button, notification } from 'antd';

import dashboardMockup from './assets/image-removebg-preview.png';
import StackIcon from 'tech-stack-icons';

type FieldType = {
    email?: string;
    password?: string;
};

export default function LoginPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        }
    }, [router]);

    useEffect(() => {
        if (error === 'unauthorized') {
            notification.error({
                message: 'Login Error',
                description: 'You are not authorized to access this application.',
                placement: 'topRight',
            });
            router.replace('/login');
        }
    }, [error, router]);

    const handleGoogleLogin = () => {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        window.location.href = `${backendUrl}/auth/google/redirect`;
    };

    return (
        <div className="flex min-h-screen bg-white">
            <div className="flex w-full md:w-1/2 lg:w-[45%] flex-col justify-between p-8 sm:p-12 relative z-10">
                <div>
                    <Link href="/" className="flex items-center gap-2 group w-max">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                            <span className="text-white font-bold text-xs">AC</span>
                        </div>
                        <span className="text-xl font-bold text-primary tracking-tight">
                            appdev central
                        </span>
                    </Link>
                </div>

                <div className="flex-1 flex flex-col justify-center w-full max-w-[420px] mx-auto">
                    <h1 className="text-[34px] font-bold text-gray-900 mb-2.5 text-center tracking-tight">Login your account</h1>
                    <p className="text-gray-500 mb-10 text-center text-[15px]">
                        Enter your email and password to access your account.
                    </p>

                    <Form
                        name="login"
                        layout="vertical"
                        autoComplete="off"
                        requiredMark={false}

                    >
                        <Form.Item<FieldType>
                            label={<span className="text-sm font-semibold text-gray-700">Email</span>}
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                            className="mb-0"
                        >
                            <Input
                                placeholder="name@company.com"
                                className="w-full px-4 py-3 rounded-xl border-gray-200 hover:border-gray-300 focus:border-accent-1"
                            />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label={<span className="text-sm font-semibold text-gray-700">Password</span>}
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 6, message: 'Password must be at least 6 characters long!' }
                            ]}
                            className="mb-0"
                        >
                            <Input.Password
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border-gray-200 hover:border-gray-300 focus:border-accent-1"
                            />
                        </Form.Item>

                        <div className="pt-2">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-accent-1 text-white font-semibold rounded-xl transition-all"
                            >
                                Log In
                            </Button>
                        </div>
                    </Form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">Or Login With</span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Button
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center w-full gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700 hover:border-gray-300"
                            >
                                <StackIcon name="google" className="w-5 h-5" />
                                Continue with Google
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center text-[13px] text-gray-400 font-medium">
                    <span>Copyright © 2025 AppDev Central</span>
                    <Link href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
                </div>
            </div>

            <div className="hidden md:flex w-1/2 lg:w-[55%] bg-accent-1 relative overflow-hidden flex-col justify-center px-12 lg:px-24 text-white">
                <div className="relative z-10 w-full max-w-xl">
                    <h2 className="text-[40px] lg:text-[46px] font-bold mb-6 leading-[1.15] tracking-tight">
                        Manage your team and operations.
                    </h2>
                    <p className="text-blue-100 text-[18px] lg:text-[19px] leading-relaxed mb-12 opacity-90">
                        Log in to access AppDev Central and manage your team and operations.
                    </p>
                </div>

                <div className="relative z-10 w-full max-w-2xl">
                    <div className="relative">
                        <Image
                            src={dashboardMockup}
                            alt="Dashboard Preview"
                            className="w-full h-auto block"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
