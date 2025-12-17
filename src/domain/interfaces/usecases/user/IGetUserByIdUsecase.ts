import { Utilisateur } from "@/domain/models";

export interface IGetUserByIdUsecase {
  execute: (id: number) => Promise<Utilisateur | null>;
}
