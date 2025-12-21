import { Client } from "@/domain/models";
import { supabase } from "@/infrastructure/supabase/supabase";
import { handleError } from "@/infrastructure/supabase/supabaseFetchError";
import { CLIENT_TABLE_NAME } from "./Constant";
import { IDeleteClientRepository } from "@/domain/interfaces/repositories/client";

export class DeleteClientRepository implements IDeleteClientRepository {
  async execute(id: number): Promise<Client> {
    const { data, error } = await supabase
      .from(CLIENT_TABLE_NAME)
      .delete()
      .eq("id", id);

    handleError(error);

    return data as Client;
  }
}
