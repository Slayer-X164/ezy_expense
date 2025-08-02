const BudgetCardSkeleton = () => {
  return (
    <div className="flex justify-between items-center w-[350px] h-[100px] px-4 py-3 bg-[#111] border border-neutral-700  animate-pulse">
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Emoji placeholder */}
        <div className="w-10 h-10 rounded-full bg-neutral-700" />
        <div>
          <div className="h-4 w-24 bg-neutral-700 rounded mb-2" />
          <div className="h-3 w-20 bg-neutral-800 rounded" />
        </div>
      </div>

      {/* Right section */}
      <div className="flex flex-col items-end">
        <div className="h-4 w-12 bg-green-800 rounded mb-2" />
        <div className="h-3 w-16 bg-red-800/50 rounded" />
      </div>
    </div>
  );
};

export default BudgetCardSkeleton;
