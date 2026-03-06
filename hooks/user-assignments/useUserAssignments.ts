import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Users } from '@/interface/user';

export type AssignedAccount = Users;

export interface Manager {
    AccountID: number;
    AccountIDNo: string;
    AONumber: string | null;
    AccountName: string;
    AccountGroup: string;
    AccountType: string;
    DomainAccount: string | null;
    Email: string;
    ValidTo: string | null;
    SignaturePath: string | null;
    SignatureImage: string | null;
    Nickname: string | null;
    isActive: boolean;
    GAvatar: string | null;
    Assigned: number;
}

export const useManagers = (page: number, perPage: number, filters: any) => {
    return useQuery({
        queryKey: ['managers', page, perPage, filters],
        queryFn: async () => {
            const { data } = await api.get('/managers/paginate', {
                params: {
                    page,
                    per_page: perPage,
                    ...filters
                }
            });
            return data;
        },
    });
};

export const useAssignedAccounts = (id: number | null) => {
    return useQuery<AssignedAccount[]>({
        queryKey: ['assigned-accounts', id],
        queryFn: async () => {
            if (!id) return [];
            const { data } = await api.get(`/managers/${id}`);
            return data.data || data;
        },
        enabled: !!id,
    });
};
