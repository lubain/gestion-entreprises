import { Utilisateur } from "@/domain/models/Utilisateurs.ts";

export interface IUpdateUserUsecase {
  execute: (id: number, userData: Partial<Utilisateur>) => Promise<Utilisateur>;
}
