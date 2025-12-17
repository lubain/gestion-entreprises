import { IPasswordService } from "@/domain/interfaces/services/IPasswordService";
import bcrypt from "bcryptjs";

export class PasswordService implements IPasswordService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
