import { horaire_hebdomadaire } from "@/domain/models";
import { horaire_date_specifique } from "@/domain/models/HoraireDateSpecifique";

export interface IHandleWeeklySchedule {
    execute(data: {
        horaire_hebdomadaire: horaire_hebdomadaire[];
        horaire_date_specifique?: horaire_date_specifique[];
    }, settingsId: number): Promise<void>
}