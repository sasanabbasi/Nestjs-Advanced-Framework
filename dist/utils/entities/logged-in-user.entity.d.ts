export declare class LoggedInUser {
    userId: string;
    email: string;
    isSuperAdmin: boolean;
    tenantId: string;
    isLevelUser: boolean;
    isDefaultUser: boolean;
    user: object;
    permissions: string[];
    headers: object;
    newTokens: object;
}
