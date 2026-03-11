'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button, App } from 'antd';
import { useAuth } from '@/hooks/login/useAuth';
import { useTheme } from '@/components/Providers/theme-provider';

import lightMockup from '../assets/light-image.png';
import darkMockup from '../assets/dark-image.png';
import StackIcon from 'tech-stack-icons';

export default function LoginClient() {
    const { notification } = App.useApp();
    const searchParams = useSearchParams();
    const router = useRouter();
    const error = searchParams.get('error');
    const { user, isLoading } = useAuth();
    const { isDark } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (user && !isLoading) {
            router.push('/dashboard');
        }
    }, [user, isLoading, error, router]);

    useEffect(() => {
        if (error === 'unauthorized') {
            notification.error({
                message: 'Login Error',
                description: 'You are not authorized to access this application.',
                placement: 'topRight',
            });
        }
    }, [error]);

    const handleGoogleLogin = () => {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        window.location.href = `${backendUrl}/auth/google/redirect`;
    };

    if (isLoading && !error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-text-info font-medium">Checking session...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-background">
            <div className="flex w-full md:w-1/2 lg:w-[45%] flex-col justify-between p-8 sm:p-12 relative z-10">
                <div>
                    <Link href="/" className="flex items-center gap-2 group w-max">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                            <span className="text-white font-bold text-xs">AC</span>
                        </div>
                        <span className="text-xl font-bold text-text tracking-tight">
                            appdev central
                        </span>
                    </Link>
                </div>

                <div className="flex-1 flex flex-col justify-center w-full max-w-[420px] mx-auto text-center">
                    <h1 className="text-[34px] font-bold text-text mb-2.5 tracking-tight">Login your account</h1>
                    <p className="text-text-info mb-10 text-[15px]">
                        Welcome back! Please login with your Google account to access the system.
                    </p>

                    <div className="flex flex-col gap-4">
                        <Button
                            onClick={handleGoogleLogin}
                            size="large"
                            className="flex items-center justify-center w-full gap-3 px-4 py-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-semibold text-text-info hover:border-gray-300 shadow-sm"
                        >
                            <StackIcon name="google" className="w-5 h-5" />
                            Continue with Google
                        </Button>
                    </div>

                    <div className="mt-8">
                        <p className="text-sm text-text-info font-medium italic">
                            Authorized personnel only
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center text-[13px] text-text-info font-medium">
                    <span>Copyright © {new Date().getFullYear()} AppDev Central</span>
                    <Link href="#" className="hover:text-text-info transition-colors">Privacy Policy</Link>
                </div>
            </div>

            <div className="hidden md:flex w-1/2 lg:w-[55%] bg-gradient-to-br from-primary via-accent-1 to-blue-900 relative overflow-hidden flex-col justify-center px-12 lg:px-24 text-white">
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
                        {mounted && (
                            <Image
                                src={isDark ? darkMockup : lightMockup}
                                alt="Dashboard Preview"
                                className="w-full h-auto block"
                                priority
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
