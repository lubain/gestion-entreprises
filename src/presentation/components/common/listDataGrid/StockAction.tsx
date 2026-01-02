import { Product } from "@/domain/models";
import { ArrowUpDown } from "lucide-react";

interface StockActionProps {
  product: Product;
}

export default function StockAction({ product }: StockActionProps) {
  return (
    <>
      {product.stock < 9999 && (
        <button
          onClick={
            () => ""
            // setAdjustmentData({
            //   product: p,
            //   type: "add",
            //   quantity: 1,
            // })
          }
          className="text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Ajuster le stock"
        >
          <ArrowUpDown size={18} />
        </button>
      )}
    </>
  );
}
