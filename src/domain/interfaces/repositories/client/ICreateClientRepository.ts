import { Client } from "@/domain/models";

export interface ICreateClientRepository {
  execute(clientData: Omit<Client, "id">): Promise<Client>;
}
