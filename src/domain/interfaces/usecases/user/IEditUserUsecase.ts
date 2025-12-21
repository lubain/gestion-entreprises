import { Utilisateur } from "@/domain/models";

export interface IEditUserUsecase {
  execute: (id: number, userData: Utilisateur) => Promise<Utilisateur>;
}
