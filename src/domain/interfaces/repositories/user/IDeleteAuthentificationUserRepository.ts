export interface IDeleteAuthentificationUserRepository {
  execute(userId: string): Promise<boolean>;
}
