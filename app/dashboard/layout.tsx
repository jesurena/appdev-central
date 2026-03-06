import React from 'react';
import Sidebar from '@/components/Sidebar';
import AuthGuard from '@/components/auth/AuthGuard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="flex flex-col lg:flex-row min-h-screen bg-neutral">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}
