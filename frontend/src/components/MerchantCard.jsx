export default function MerchantCard({ merchant, amount, rank }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:border-red-500/30 hover:bg-red-500/5 transition duration-300">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
          #{rank} HIGHEST
        </span>
        <div className="bg-red-500/10 px-2 py-1 rounded text-red-400 text-xs font-bold">
           ₹{amount.toLocaleString()}
        </div>
      </div>

      <h3 className="text-white font-semibold text-lg truncate">
        {merchant}
      </h3>

      <p className="text-xs text-slate-400 mt-2">
        High carbon intensity category
      </p>
    </div>
  );
}
