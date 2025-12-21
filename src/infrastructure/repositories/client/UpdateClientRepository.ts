import { Client } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { CLIENT_TABLE_NAME } from "./Constant";
import { IUpdateClientRepository } from "@/domain/interfaces/repositories/client";

export class UpdateClientRepository implements IUpdateClientRepository {
  async execute(id: number, clientData: Partial<Client>): Promise<Client> {
    const { data, error } = await supabase
      .from(CLIENT_TABLE_NAME)
      .update(clientData)
      .eq("id", id)
      .select()
      .single();

    handleError(error);

    return data as Client;
  }
}
