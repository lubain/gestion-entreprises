import { supabase } from "@/infrastructure/supabase/supabase";
import { IGetAllClientRepository } from "@/domain/interfaces/repositories/client";
import { CLIENT_TABLE_NAME } from "./Constant";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { Client } from "@/domain/models";

export class GetAllClientRepository implements IGetAllClientRepository {
  async execute(): Promise<Client[]> {
    const { data, error } = await supabase.from(CLIENT_TABLE_NAME).select("*");

    handleError(error);

    return data as Client[];
  }
}
