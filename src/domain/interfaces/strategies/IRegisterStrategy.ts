import { RegisterUserDTO } from "@/domain/DTOS/RegisterUserDTO";
import { registerProps } from "@/domain/interfaces/usecases/Register/IRegisterUserUsecase";

export interface IRegisterStrategy {
  register(data: registerProps, userId: number): Promise<RegisterUserDTO>;
}
