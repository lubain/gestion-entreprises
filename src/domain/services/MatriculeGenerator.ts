import { IMatriculeGenerator } from "../interfaces/services/IMatriculeGenerator";
import { sexe_enum } from "../models/enums";

export class MatriculeGenerator implements IMatriculeGenerator {
  generateMatricule(sex: sexe_enum): string {
    return `${sex === sexe_enum.homme ? "XY-" : "2X-"}${new Date().getTime() + String(Math.floor(Math.random() * 1000))}`;
  }
}