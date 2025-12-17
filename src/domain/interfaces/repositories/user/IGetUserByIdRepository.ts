import { Utilisateur } from "@/domain/models";

export interface IGetUserByIdRepository {
  execute: (id: number) => Promise<Utilisateur | null>;
}
