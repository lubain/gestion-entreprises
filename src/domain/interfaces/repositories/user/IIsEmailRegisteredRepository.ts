export interface IIsEmailRegisteredRepository {
  execute: (email: string) => Promise<boolean>;
}
