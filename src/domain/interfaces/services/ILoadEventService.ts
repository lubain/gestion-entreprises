import { AvailabilitySettingsDTO } from "@/domain/DTOS";
import { Evenement, RendezVous } from "@/domain/models";
import { Event } from "@/shared/types/SettingsType";
import DateClass from "@/shared/utils/DateClass";

export interface ILoadEventService {
  execute(
    data: {
      disponibilites: AvailabilitySettingsDTO;
      evenement: Evenement[];
      appointments: RendezVous[];
    },
    filter?: {
      isDisponibilites: boolean;
      isEvenement: boolean;
      isAppointments: boolean;
    },
    interval?: {
      start: DateClass;
      end: DateClass;
    }
  ): Event[];
}
