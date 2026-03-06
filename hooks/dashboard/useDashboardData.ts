import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Users } from '@/interface/user';

export const useLatestUsers = () => {
    return useQuery<Users[]>({
        queryKey: ['users', 'latest'],
        queryFn: async () => {
            const { data } = await api.get('/dashboard/latest-users');
            return data.data || data;
        },
    });
};

export const useUserCount = () => {
    return useQuery<number>({
        queryKey: ['users', 'count'],
        queryFn: async () => {
            const { data } = await api.get('/dashboard/count');
            return data.count;
        },
    });
};

export const useAccountGroupStats = () => {
    return useQuery<{ count: number; groups: any[] }>({
        queryKey: ['users', 'stats', 'groups'],
        queryFn: async () => {
            const { data } = await api.get('/dashboard/account-groups');
            return data;
        },
    });
};

export const useAccountTypeStats = () => {
    return useQuery<{ count: number; types: any[] }>({
        queryKey: ['users', 'stats', 'types'],
        queryFn: async () => {
            const { data } = await api.get('/dashboard/account-types');
            return data;
        },
    });
};
