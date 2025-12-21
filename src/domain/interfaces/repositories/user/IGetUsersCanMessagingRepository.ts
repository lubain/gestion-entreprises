import { Utilisateur } from "@/domain/models";

export interface IGetUsersCanMessagingRepository {
  execute: () => Promise<Utilisateur[]>;
}
