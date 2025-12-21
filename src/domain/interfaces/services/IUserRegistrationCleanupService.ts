import { Utilisateur } from "@/domain/models";

export interface IUserRegistrationCleanupService {
  rollback(
    newUserData: Utilisateur | null
  ): Promise<void>;
}
