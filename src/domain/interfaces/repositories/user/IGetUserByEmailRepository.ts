import { Utilisateur } from "@/domain/models";

export interface IGetUserByEmailRepository {
  execute: (email: string) => Promise<Utilisateur | null>;
}
