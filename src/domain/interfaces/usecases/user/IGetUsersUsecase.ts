import { Utilisateur } from "@/domain/models";

export interface IGetUsersUsecase {
  execute: () => Promise<Utilisateur[]>;
}
