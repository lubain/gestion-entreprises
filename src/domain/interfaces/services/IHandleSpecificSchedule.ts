import { horaire_date_specifique } from "@/domain/models";

export interface IHandleSpecificSchedule {
    execute(horaire_date_specifique: horaire_date_specifique[], settingsId: number): Promise<void>
}