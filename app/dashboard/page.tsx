'use client';

import { Users, UserPlus, UsersRound } from 'lucide-react';
import DashboardStatCard from '@/app/dashboard/components/DashboardStatCard';
import DashboardUsersTable from '@/app/dashboard/components/DashboardUsersTable';
import DashboardBanner from '@/app/dashboard/components/DashboardBanner';

export default function DashboardPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <DashboardBanner />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
            </div>

            <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DashboardStatCard
                        title="Total Active Users"
                        value="1,245"
                        icon={<Users size={20} />}
                        iconWrapperClassName="bg-blue-50 text-accent-1"
                        trendValue="+12%"
                        trendLabel="from last month"
                        trendType="positive"
                    />

                    <DashboardStatCard
                        title="New Users"
                        value="86"
                        icon={<UserPlus size={20} />}
                        iconWrapperClassName="bg-green-50 text-green-600"
                        trendValue="+5%"
                        trendLabel="from last week"
                        trendType="positive"
                    />

                    <DashboardStatCard
                        title="Total Account Group"
                        value="24"
                        icon={<UsersRound size={20} />}
                        iconWrapperClassName="bg-purple-50 text-purple-600"
                        subtitle="Active organizational units"
                    />
                </div>

                <DashboardUsersTable />
            </div>
        </div>
    );
}
