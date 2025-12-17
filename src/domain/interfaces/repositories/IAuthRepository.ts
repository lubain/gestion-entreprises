import { administrateurs, Utilisateur } from "@/domain/models";
import { Session } from "@supabase/supabase-js";

export type AuthStateChangeCallback = (session: Session | null) => void;

export type SignUpProps = {
  user?: Omit<Utilisateur, "id" | "cree_a" | "mis_a_jour_a">;

  administrateurId?: number;
  userData: Omit<administrateurs, "id">;
  contact?: string[];
};
