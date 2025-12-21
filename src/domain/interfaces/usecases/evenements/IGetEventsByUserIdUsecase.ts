import { Evenement } from "@/domain/models/Evenement.ts";

export interface IGetEventsByUserIdUsecase {
  execute: (userId: number) => Promise<Evenement[]>;
}
