import { Utilisateur } from "@/domain/models/Utilisateurs.ts";

export interface IUpdateUserRepository {
  execute: (id: number, userData: Partial<Utilisateur>) => Promise<Utilisateur>;
}
