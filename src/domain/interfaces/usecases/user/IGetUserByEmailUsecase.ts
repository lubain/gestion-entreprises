import { Utilisateur } from "@/domain/models";

export interface IGetUserByEmailUsecase {
  execute: (email: string) => Promise<Utilisateur | null>;
}
