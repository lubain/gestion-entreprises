import { EmailValidator } from "./EmailValidator";
import { IVerifyAndCheckEmail } from "@/domain/interfaces/services/IVerifyAndCheckEmail";
import { IGetUserByEmailUsecase } from "../interfaces/usecases/user";

export class VerifyAndCheckEmail extends EmailValidator
  implements IVerifyAndCheckEmail {
  constructor(private readonly getUserByEmailUsecase: IGetUserByEmailUsecase) {
    super();
  }
  async isEmailValid(email: string): Promise<boolean> {
    const isValid = this.isValid(email);

    if (!isValid) {
      return false;
    }

    const matchingUser = await this.getUserByEmailUsecase.execute(email);

    if (matchingUser) return false;

    return true;
  }
}
