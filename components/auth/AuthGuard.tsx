'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/login/useAuth';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoading, isError } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && (isError || !user)) {
            router.replace('/login');
        }
    }, [isLoading, isError, user, router, pathname]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-gray-500 font-medium">Verifying session...</p>
            </div>
        );
    }

    if (isError || !user) {
        return null;
    }

    return <>{children}</>;
}
