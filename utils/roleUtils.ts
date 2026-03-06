export const APP_ROLES: Record<number | string, string> = {
    1: 'Super Admin',
    2: 'Admin',
    3: 'Buyer',
    4: 'Requestor'
};

export const getRoleLabel = (role: number | string | null) => {
    if (!role) return '';
    return APP_ROLES[role] || role.toString();
};

export const getRoleOptions = () => {
    return Object.entries(APP_ROLES).map(([value, label]) => ({
        label,
        value: Number(value)
    }));
};
