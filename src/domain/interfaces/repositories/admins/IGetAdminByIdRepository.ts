import { administrateurs } from "@/domain/models";

export interface IGetAdminByIdRepository {
  execute(id: number): Promise<administrateurs | null>;
}
