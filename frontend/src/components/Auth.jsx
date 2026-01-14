"use client"

import React from "react"
import { useState } from "react"
import { Lock } from "lucide-react"

export default function Auth({
  onLogin,
  loading,
}) {
  const [formData, setFormData] = useState({
    bankName: "",
    ifsc: "",
    accountNumber: "",
    pan: "",
    consent: false,
  })

  const [errors, setErrors] = useState({})

  const banks = [
    "HDFC Bank",
    "SBI (State Bank of India)",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
  ]

  const validate = () => {
    const newErrors= {}
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/

    if (!formData.bankName) newErrors.bankName = "Please select a bank"
    if (!formData.ifsc || !ifscRegex.test(formData.ifsc)) newErrors.ifsc = "Invalid IFSC Code (e.g., SBIN0001234)"
    if (!formData.accountNumber || formData.accountNumber.length < 9) newErrors.accountNumber = "Invalid Account Number"
    if (!formData.pan || !panRegex.test(formData.pan)) newErrors.pan = "Invalid PAN Number (e.g., ABCDE1234F)"
    if (!formData.consent) newErrors.consent = "You must provide consent to proceed"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onLogin(formData)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-blue-900/10 to-slate-900/30 pointer-events-none" />
      <div className="absolute top-10 sm:top-20 right-5 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 sm:bottom-20 left-2 sm:left-40 w-56 sm:w-80 h-56 sm:h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="glass-card border-cyan-500/10 p-6 sm:p-8 w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            CB
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            CredWise
          </h1>
        </div>
        <p className="text-slate-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">Financial Score Engine</p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-slate-300 text-xs sm:text-sm mb-2 font-semibold">Bank Name</label>
            <select
              className="w-full bg-slate-800/50 border border-slate-700/30 rounded-xl p-2 sm:p-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-sm transition-all"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            >
              <option value="">Select your Bank</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            {errors.bankName && <p className="text-red-400 text-xs mt-1">{errors.bankName}</p>}
          </div>

          <div>
            <label className="block text-slate-300 text-xs sm:text-sm mb-2 font-semibold">IFSC Code</label>
            <input
              type="text"
              placeholder="SBIN0001234"
              className="w-full bg-slate-800/50 border border-slate-700/30 rounded-xl p-2 sm:p-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-sm transition-all uppercase"
              value={formData.ifsc}
              onChange={(e) => setFormData({ ...formData, ifsc: e.target.value.toUpperCase() })}
            />
            {errors.ifsc && <p className="text-red-400 text-xs mt-1">{errors.ifsc}</p>}
          </div>

          <div>
            <label className="block text-slate-300 text-xs sm:text-sm mb-2 font-semibold">Account Number</label>
            <input
              type="password"
              placeholder="•••• •••• •••• 1234"
              className="w-full bg-slate-800/50 border border-slate-700/30 rounded-xl p-2 sm:p-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-sm transition-all"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            />
            {errors.accountNumber && <p className="text-red-400 text-xs mt-1">{errors.accountNumber}</p>}
          </div>

          <div>
            <label className="block text-slate-300 text-xs sm:text-sm mb-2 font-semibold">PAN Number</label>
            <input
              type="text"
              placeholder="ABCDE1234F"
              className="w-full bg-slate-800/50 border border-slate-700/30 rounded-xl p-2 sm:p-3 text-white text-sm sm:text-base focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-sm transition-all uppercase"
              value={formData.pan}
              onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
            />
            {errors.pan && <p className="text-red-400 text-xs mt-1">{errors.pan}</p>}
          </div>

          <div className="flex items-start gap-3 mt-4 sm:mt-6 bg-blue-500/10 border border-blue-500/20 p-3 sm:p-4 rounded-xl backdrop-blur-sm">
            <input
              type="checkbox"
              id="consent"
              className="mt-1 w-4 h-4 accent-cyan-400 cursor-pointer flex-shrink-0"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            />
            <label htmlFor="consent" className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              I authorize this platform to access my last 6 months of transaction history in read-only mode for secure
              financial analysis. My data will remain confidential.
            </label>
          </div>
          {errors.consent && <p className="text-red-400 text-xs text-center">{errors.consent}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 text-white font-bold py-2 sm:py-3 rounded-xl transition-all transform hover:scale-[1.02] mt-4 sm:mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Lock size={18} />
            {loading ? "Analyzing..." : "Secure Login"}
          </button>
        </form>
      </div>
    </div>
  )
}
