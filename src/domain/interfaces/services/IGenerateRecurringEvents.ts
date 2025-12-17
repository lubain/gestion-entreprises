import { Evenement } from "@/domain/models";

export interface IGenerateRecurringEvents {
    generate: (event: Evenement, viewStart: Date, viewEnd: Date) => Omit<Evenement, "id">[]
}