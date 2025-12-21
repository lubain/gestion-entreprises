import { Client } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { CLIENT_TABLE_NAME } from "./Constant";
import { ICreateClientRepository } from "@/domain/interfaces/repositories/client";

export class CreateClientRepository implements ICreateClientRepository {
  async execute(clientData: Omit<Client, "id">): Promise<Client> {
    const { data, error } = await supabase
      .from(CLIENT_TABLE_NAME)
      .insert(clientData)
      .select()
      .single();

    handleError(error);

    return data as Client;
  }
}
