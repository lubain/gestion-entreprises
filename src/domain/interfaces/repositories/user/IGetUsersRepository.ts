import { Utilisateur } from "@/domain/models";

export interface IGetUsersRepository {
  execute: () => Promise<Utilisateur[]>;
}
