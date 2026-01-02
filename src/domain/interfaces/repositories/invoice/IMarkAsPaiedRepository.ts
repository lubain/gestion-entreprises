import { Invoice } from "@/domain/models";

export interface IMarkAsPaiedRepository {
  execute(id: number): Promise<Invoice>;
}
