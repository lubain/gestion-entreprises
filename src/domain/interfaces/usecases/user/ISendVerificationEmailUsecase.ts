export interface ISendVerificationEmailUsecase {
  execute: (email: string) => Promise<void>;
}
