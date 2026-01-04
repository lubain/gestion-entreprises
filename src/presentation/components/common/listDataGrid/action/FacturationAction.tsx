import { Invoice, Product } from "@/domain/models";
import { useInvoice } from "@/presentation/hooks/invoice/use-invoice";
import { IconButton } from "@mui/material";
import { CheckCircle, Printer } from "lucide-react";

interface FacturationActionProps {
  invoice: Invoice;
}

export default function FacturationAction({ invoice }: FacturationActionProps) {
  const { MarkAsPaied } = useInvoice();
  return (
    <p className="flex items-center justify-center">
      {invoice.status !== "payée" && (
        <button
          onClick={() => MarkAsPaied(invoice.id)}
          title="Marquer comme payée"
          className="text-green-600 hover:bg-green-50 rounded transition-colors"
        >
          <CheckCircle size={16} />
        </button>
      )}
      <IconButton>
        <Printer size={16} className="mx-auto" />
      </IconButton>
    </p>
  );
}
