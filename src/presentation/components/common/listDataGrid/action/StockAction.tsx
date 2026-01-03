import { Product } from "@/domain/models";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import StockModal from "../modal/StockModal";

interface StockActionProps {
  product: Product;
}

export default function StockAction({ product }: StockActionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {product.stock < 9999 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Ajuster le stock"
        >
          <ArrowUpDown size={18} />
        </button>
      )}
      {isModalOpen && (
        <StockModal isOpen={isModalOpen} stock={product} onClose={onClose} />
      )}
    </>
  );
}
