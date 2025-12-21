import { IGetAdminByIdRepository } from "@/domain/interfaces/repositories/admins";
import { IGetAdminByIdUsecase } from "@/domain/interfaces/usecases/admins";
import { administrateurs } from "@/domain/models";

export class GetAdminByIdUsecase implements IGetAdminByIdUsecase {
  constructor(
    private readonly getAdminByIdRepository: IGetAdminByIdRepository
  ) {}

  async execute(id: number): Promise<administrateurs | null> {
    return await this.getAdminByIdRepository.execute(id);
  }
}
