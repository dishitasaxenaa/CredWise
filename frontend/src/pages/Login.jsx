import { useState } from "react";
import { connectBank } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { CreditCard, TrendingUp, ShieldCheck } from "lucide-react"; // Assuming lucide-react is available or use alternatives

export default function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({
    bankName: "State Bank of India",
    ifsc: "",
    accountNumber: "",
    pin: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.bankName || !form.ifsc || !form.accountNumber || !form.pin) {
      setError("Please fill all bank details");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await connectBank(form);
      login(res.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err?.message || "Failed to connect bank");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* Left Column - Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden bg-slate-900 border-r border-slate-800">
        
        {/* Background Gradients/Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.05),_transparent_40%)]" />
        
        {/* Decorative Circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 p-12 h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center transform rotate-3 shadow-lg shadow-emerald-500/20">
                        <TrendingUp className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-200">CrediWise</span>
                </div>
                
                <h1 className="text-5xl font-bold leading-tight mb-6 text-white">
                    Smart banking <br /> 
                    <span className="text-emerald-400">Green Score</span>
                </h1>
                
                <p className="text-xl text-slate-400 max-w-md leading-relaxed">
                   What if your daily expense can chart your interest rate?
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-300">
                    <div className="p-2 bg-slate-800/50 rounded-lg"><ShieldCheck className="w-5 h-5 text-emerald-400"/></div>
                    <span>Bank-grade security</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                    <div className="p-2 bg-slate-800/50 rounded-lg"><CreditCard className="w-5 h-5 text-emerald-400"/></div>
                    <span>Analyze last 6 months transactions</span>
                </div>
            </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12 relative">
          
          {/* Mobile Background Effect */}
          <div className="absolute inset-0 bg-slate-950 lg:hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.1),_transparent_70%)]" />
          </div>

          <div className="w-full max-w-md space-y-8 relative z-10 animate-fade-in-up">
              <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">Connect Bank</h2>
                  <p className="text-slate-400">Link your primary account to generate your Green Score.</p>
              </div>

              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2">
                    <span>!</span> {error}
                  </div>
                )}

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Bank Name</label>
                        <input
                            name="bankName"
                            value={form.bankName}
                            onChange={handleChange}
                            disabled={loading}
                            className="input-primary"
                            placeholder="Bank Name"
                        />
                    </div>
                   
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">IFSC Code</label>
                             <input
                                name="ifsc"
                                value={form.ifsc}
                                onChange={handleChange}
                                disabled={loading}
                                className="input-primary"
                                placeholder="SBIN000123"
                            />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-medium text-slate-300">Account No</label>
                             <input
                                name="accountNumber"
                                value={form.accountNumber}
                                onChange={handleChange}
                                disabled={loading}
                                className="input-primary"
                                placeholder="1234567890"
                            />
                        </div>
                    </div>


                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">PIN</label>
                        <input
                            type="password"
                            name="pin"
                            value={form.pin}
                            onChange={handleChange}
                            disabled={loading}
                            className="input-primary"
                            placeholder="••••"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading || !form.ifsc || !form.accountNumber || !form.pin}
                        className="btn-primary flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Connecting...
                            </>
                        ) : "Connect Bank"}
                    </button>
                    <p className="mt-4 text-xs text-slate-500 text-center">
                        This is a simulated bank connection. No real money is involved.
                    </p>
                </div>
              </form>
          </div>
      </div>
    </div>
  );
}
