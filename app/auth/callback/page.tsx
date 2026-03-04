'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            // You might want to fetch user data here using TanStack Query
            router.push('/dashboard');
        } else {
            router.push('/login?error=auth_failed');
        }
    }, [router, searchParams]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900">Authenticating...</h2>
                <p className="text-gray-500">Please wait while we complete the sign-in process.</p>
            </div>
        </div>
    );
}
