import { administrateurs } from "@/domain/models";

export interface ICreateAdminRepository {
  execute(adminInformations: Omit<administrateurs, "id">): Promise<administrateurs>;
}
