import { Client } from "@/domain/models";

export interface IUpdateClientRepository {
  execute(id: number, data: Partial<Client>): Promise<Client>;
}
