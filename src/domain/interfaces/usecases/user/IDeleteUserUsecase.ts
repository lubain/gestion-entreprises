import { Utilisateur } from "@/domain/models";

export interface IDeleteUserUsecase {
  execute: (id: number) => Promise<Utilisateur>;
}
