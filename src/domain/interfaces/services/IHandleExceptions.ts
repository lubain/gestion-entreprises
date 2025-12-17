import { horaire_date_specifique } from "@/domain/models";

export interface IHandleExceptions {
    execute(exceptions: horaire_date_specifique[], settingsId: number): Promise<void>
}