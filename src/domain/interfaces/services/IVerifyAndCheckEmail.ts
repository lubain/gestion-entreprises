export interface IVerifyAndCheckEmail {
  isEmailValid: (email: string) => Promise<boolean>;
}
