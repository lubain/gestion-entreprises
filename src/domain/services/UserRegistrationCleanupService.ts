import { IUserRegistrationCleanupService } from "@/domain/interfaces/services/IUserRegistrationCleanupService";
import { Utilisateur } from "@/domain/models";
import { IDeleteUserUsecase } from "../interfaces/usecases/user";

/*
 Cette classe a ete creer pour gerer la nettoyage de la base de donnee
 en cas d'erreur lors de l'inscription d'utilisateur.

 Si on ne nettoie pas la base de donnee, l'utilisateur ne pourra pas
 refaire une tentative d'inscription a cause des contraintes de doublons
  de la base de donnee
*/
export class UserRegistrationCleanupService
  implements IUserRegistrationCleanupService
{
  constructor(private readonly deleteUserUsecase: IDeleteUserUsecase) {}

  async rollback(newUserData: Utilisateur | null): Promise<void> {
    if (newUserData) {
      await this.deleteUserUsecase.execute(newUserData.id);
    }
  }
}
