export interface ISendVerificationEmailRepository {
  execute: (email: string) => Promise<string>;
}
