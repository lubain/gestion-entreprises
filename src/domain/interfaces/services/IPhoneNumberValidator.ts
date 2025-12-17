export interface IPhoneNumberValidator {
  isValid(phoneNumber: string): boolean;
  format(phoneNumber: string): string | null;
}
