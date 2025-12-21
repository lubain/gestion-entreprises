import { Client } from "@/domain/models";

export interface IGetClientByIdRepository {
  execute: (id: number) => Promise<Client>;
}
