import { Utilisateur } from "@/domain/models";

export interface IEditUserRepository {
  execute: (id: number, userData: Utilisateur) => Promise<Utilisateur>;
}
