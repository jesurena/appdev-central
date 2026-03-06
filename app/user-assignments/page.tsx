import React, { Suspense } from 'react';
import UserAssignmentTable from './components/UserAssignmentTable';

export default function UserAssignmentsPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <div className="mb-8">
                <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">User Assignments</h1>
                <p className="text-gray-500 mt-1 text-base">
                    Manage users access and their account permissions here.
                </p>
            </div>

            <Suspense fallback={<div>Loading assignments...</div>}>
                <UserAssignmentTable />
            </Suspense>
        </div>
    );
}
