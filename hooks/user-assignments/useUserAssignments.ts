import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface AssignedAccount {
    AccountID: number;
    AccountIDNo: string;
    AccountName: string;
    Email: string;
    GAvatar: string | null;
    Source: string;
    isActive: boolean;
}

export interface Manager {
    AccountID: number;
    AccountIDNo: string;
    AccountName: string;
    Email: string;
    AccountGroup: string;
    AccountType: string;
    GAvatar: string | null;
    isActive: boolean;
    assignedAccounts: AssignedAccount[];
}

export const useManagers = () => {
    return useQuery<Manager[]>({
        queryKey: ['managers'],
        queryFn: async () => {
            const { data } = await api.get('/managers');
            return data.data || data;
        },
    });
};
