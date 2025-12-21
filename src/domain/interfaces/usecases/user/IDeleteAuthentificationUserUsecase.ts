export interface IDeleteAuthentificationUserUsecase {
  execute: (userId: string) => Promise<boolean>;
}
