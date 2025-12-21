import { Utilisateur } from "@/domain/models";

export interface ICreateUserUsecase {
  execute: (
    userInformations: Omit<Utilisateur, "id" | "cree_a" | "mis_a_jour_a">
  ) => Promise<Utilisateur>;
}
