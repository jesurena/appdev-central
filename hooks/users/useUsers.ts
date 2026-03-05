import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Users } from '@/interface/user';

export interface PaginatedResponse<Users> {
    data: Users[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        path: string;
    };
}

export const useUsers = () => {
    return useQuery<Users[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await api.get('/users');
            return data.data || data;
        },
    });
};

export const useUsersPaginated = (page: number = 1, pageSize: number = 10, filters: any = {}) => {
    return useQuery<PaginatedResponse<Users>>({
        queryKey: ['users', 'paginate', page, pageSize, filters],
        queryFn: async () => {
            const { data } = await api.get('/users/paginate', {
                params: {
                    page,
                    per_page: pageSize,
                    ...filters
                },
            });
            return data;
        },
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userData: any) => {
            const { data } = await api.post('/users', userData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, userData }: { id: number; userData: any }) => {
            const { data } = await api.put(`/users/${id}`, userData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};

export const useBulkUpdateStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ ids, status }: { ids: React.Key[]; status: boolean }) => {
            const { data } = await api.post('/users/bulk-status', { ids, isActive: status });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};
