export interface IIsEmailRegisteredUsecase {
  execute: (email: string) => Promise<boolean>;
}
