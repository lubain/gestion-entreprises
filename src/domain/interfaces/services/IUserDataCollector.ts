import { LoginUserDTO } from "@/domain/DTOS";

export interface IUserDataCollector {
  execute(): Promise<LoginUserDTO>;
}
