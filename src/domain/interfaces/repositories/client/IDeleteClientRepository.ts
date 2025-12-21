import { Client } from "@/domain/models";

export interface IDeleteClientRepository {
  execute(id: number): Promise<Client>;
}
