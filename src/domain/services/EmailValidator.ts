import { IEmailValidator } from "@/domain/interfaces/services/IEmailValidator";

export class EmailValidator implements IEmailValidator {
  isValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
