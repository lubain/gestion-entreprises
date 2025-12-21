import { administrateurs } from "@/domain/models";

export interface IGetAdminByUserIdRepository {
  execute(id: number): Promise<administrateurs>;
}
