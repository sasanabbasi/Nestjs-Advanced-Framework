export class LoggedInUser {
  public userId: string;
  public email: string;
  public isSuperAdmin: boolean;
  public tenantId: string;
  public isLevelUser: boolean;
  public isDefaultUser: boolean;
  public user: object;
  public permissions: string[];
  public headers: object;
  public newTokens: object;
}
