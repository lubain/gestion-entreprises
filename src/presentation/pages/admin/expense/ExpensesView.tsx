import { Plus } from "lucide-react";
import { Card } from "@/presentation/components/ui/Card";
import { Button } from "@/presentation/components/ui/Button";
import { Input } from "@/presentation/components/ui/Input";
import { useExpenseState } from "@/presentation/hooks/expense/use-expense-state";
import ListDataGrid from "@/presentation/components/common/listDataGrid/ListDataGrid";

const ExpensesView = () => {
  const { isAdding, newExp, expenses, setIsAdding, handleSubmit, setNewExp } =
    useExpenseState();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Dépenses
        </h2>
        <Button
          icon={Plus}
          onClick={() => setIsAdding(true)}
          variant="secondary"
          className="dark:bg-transparent dark:text-white"
        >
          Ajouter Dépense
        </Button>
      </div>

      {isAdding && (
        <Card className="p-4 bg-red-50 border-red-100">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 items-end"
          >
            <Input
              label="Description"
              value={newExp.description}
              onChange={(e: any) =>
                setNewExp({ ...newExp, description: e.target.value })
              }
              className="flex-grow"
              required
            />
            <Input
              label="Montant"
              type="number"
              step="0.01"
              value={newExp.amount}
              onChange={(e: any) =>
                setNewExp({
                  ...newExp,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
              required
            />
            <div className="w-full md:w-48">
              <label className="text-xs font-semibold text-slate-500 dark:text-white uppercase mb-1 block">
                Catégorie
              </label>
              <select
                className="w-full p-2 border border-slate-300 rounded-md text-sm"
                value={newExp.category}
                onChange={(e) =>
                  setNewExp({ ...newExp, category: e.target.value })
                }
              >
                <option>Achats Marchandises</option>
                <option>Charges</option>
                <option>Salaires</option>
                <option>Impôts</option>
                <option>Autre</option>
              </select>
            </div>
            <Button type="submit" variant="danger">
              Enregistrer
            </Button>
          </form>
        </Card>
      )}

      <ListDataGrid type="expense" data={expenses.slice().reverse()} />
    </div>
  );
};

export default ExpensesView;
