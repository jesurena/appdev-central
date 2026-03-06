export interface Users {
    AccountID: number;
    AccountIDNo: string;
    AONumber: string;
    AccountName: string;
    AccountGroup: string;
    AccountType: string;
    DomainAccount: string;
    Email: string;
    ValidTo: string | null;
    SignaturePath: string | null;
    SignatureImage: string | null;
    Nickname: string | null;
    isActive: boolean;
    GAvatar: string | null;
    AllowTCDAccess?: boolean;
    AllowProcurementAccess?: boolean;
    TCDRole?: number | string | null;
    ProcurementRole?: number | string | null;
    Source?: string;
    assignedAccounts?: any[];
}
