import BudgetList from "./_components/BudgetList";

export default function budgetsPage() {
  return (
    <div className="py-4 px-6 w-full">
      <h2 className="font-bold text-3xl pt-4 lg:pt-0 pb-6">My Budgets</h2>
      <BudgetList />
    </div>
  );
}
