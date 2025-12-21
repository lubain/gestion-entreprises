import { supabase } from "@/infrastructure/supabase/supabase";
import { IGetClientByIdRepository } from "@/domain/interfaces/repositories/client";
import { CLIENT_TABLE_NAME } from "./Constant";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { Client } from "@/domain/models";

export class GetClientByIdRepository implements IGetClientByIdRepository {
  async execute(id: number): Promise<Client> {
    const { data, error } = await supabase
      .from(CLIENT_TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    handleError(error);

    return data as Client;
  }
}
