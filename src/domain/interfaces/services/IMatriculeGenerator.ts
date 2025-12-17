import { sexe_enum } from "@/domain/models/enums";

export interface IMatriculeGenerator {
  generateMatricule(sex: sexe_enum): string;
}