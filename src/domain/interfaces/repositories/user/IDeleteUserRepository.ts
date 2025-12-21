import { Utilisateur } from "@/domain/models";

export interface IDeleteUserRepository {
  execute: (id: number) => Promise<Utilisateur>;
}
