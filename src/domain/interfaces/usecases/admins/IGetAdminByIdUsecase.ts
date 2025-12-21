import { administrateurs } from "@/domain/models";

export interface IGetAdminByIdUsecase {
  execute(id: number): Promise<administrateurs | null>;
}
