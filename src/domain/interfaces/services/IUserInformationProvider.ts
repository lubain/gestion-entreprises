import { administrateurs } from "@/domain/models";

export interface IUserInformationProvider {
  getUserInformation(id: number): Promise<administrateurs | null>;
}
