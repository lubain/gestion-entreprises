import { UUID } from "crypto";
import { utilisateurs_role_enum } from "./enums";

export interface Utilisateur {
  id: number;
  auth_id?: UUID;
  nom: string;
  prenom: string;
  role: utilisateurs_role_enum;
  email: string | null;
  mot_de_passe_hash: string | null;
}
