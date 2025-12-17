import { administrateurs, Utilisateur } from "../models";

export interface LoginUserDTO {
  userInformations: administrateurs | null;
  user: Utilisateur | null;
  success: boolean;
  error?: Error | null;
}
