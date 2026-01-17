import MerchantCard from "./MerchantCard";
import TipsCard from "./TipsCard";

export default function ExplainabilitySection({ explainability }) {
  if (!explainability) return null;

  const { topCarbonMerchants, tips } = explainability;

  return (
    <section className="space-y-6">
      
      {/* Top Carbon Merchants */}
      <div className="glass-card p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Highest Carbon Footprint
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Top merchants contributing to your carbon score this month
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCarbonMerchants.map((item, idx) => (
              <MerchantCard
                key={idx}
                merchant={item.merchant}
                amount={item.amount}
                rank={idx + 1}
              />
            ))}
          </div>
      </div>

      {/* Sustainable Tips */}
      <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-slate-900/60 to-emerald-900/10">
          <TipsCard tips={tips} />
      </div>

    </section>
  );
}
