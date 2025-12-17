import { Utilisateur } from "@/domain/models";

export interface ICreateUserRepository {
  execute: (
    userInformations: Omit<Utilisateur, "id" | "cree_a" | "mis_a_jour_a">,
    hashedPassword: string
  ) => Promise<Utilisateur>;
}
