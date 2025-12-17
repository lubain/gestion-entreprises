export interface IGenerateSignupLinkUsecase {
  execute: (email: string) => Promise<string>;
}
