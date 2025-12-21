export interface Invoice {
  id: number;
  clientId: number;
  clientName: string;
  date: string;
  total: number;
  status: "payée" | "en_attente";
}
