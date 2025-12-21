import { Client } from "@/domain/models";

export interface IGetAllClientRepository {
  execute: () => Promise<Client[]>;
}
