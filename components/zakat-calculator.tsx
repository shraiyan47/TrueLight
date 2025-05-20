"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calculator, Info, DollarSign, Coins, Briefcase, LineChart, Minus } from "lucide-react"

interface AssetCategory {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  fields: AssetField[]
  total: number
}

interface AssetField {
  id: string
  name: string
  value: number
  placeholder: string
  info?: string
}

export default function ZakatCalculator() {
  const [goldPrice, setGoldPrice] = useState(2000) // Default price per ounce in USD
  const [silverPrice, setSilverPrice] = useState(25) // Default price per ounce in USD
  const [nisabGold, setNisabGold] = useState(0)
  const [nisabSilver, setNisabSilver] = useState(0)
  const [currency, setCurrency] = useState("USD")
  const [categories, setCategories] = useState<AssetCategory[]>([])
  const [totalAssets, setTotalAssets] = useState(0)
  const [totalLiabilities, setTotalLiabilities] = useState(0)
  const [netZakatableAssets, setNetZakatableAssets] = useState(0)
  const [zakatPayable, setZakatPayable] = useState(0)
  const [isZakatDue, setIsZakatDue] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Initialize asset categories
  useEffect(() => {
    setCategories([
      {
        id: "cash",
        name: "Cash & Bank Balances",
        icon: <DollarSign className="h-5 w-5" />,
        description: "Include all cash, savings, and checking accounts",
        fields: [
          {
            id: "cash_on_hand",
            name: "Cash on Hand",
            value: 0,
            placeholder: "Enter amount",
          },
          {
            id: "bank_accounts",
            name: "Bank Accounts",
            value: 0,
            placeholder: "Enter amount",
          },
          {
            id: "savings_accounts",
            name: "Savings Accounts",
            value: 0,
            placeholder: "Enter amount",
          },
        ],
        total: 0,
      },
      {
        id: "gold_silver",
        name: "Gold & Silver",
        icon: <Coins className="h-5 w-5" />,
        description: "Enter the current market value of your gold and silver",
        fields: [
          {
            id: "gold_value",
            name: "Gold Value",
            value: 0,
            placeholder: "Enter amount",
            info: "Total value of gold you own",
          },
          {
            id: "silver_value",
            name: "Silver Value",
            value: 0,
            placeholder: "Enter amount",
            info: "Total value of silver you own",
          },
        ],
        total: 0,
      },
      {
        id: "investments",
        name: "Investments",
        icon: <LineChart className="h-5 w-5" />,
        description: "Include stocks, mutual funds, and other investments",
        fields: [
          {
            id: "stocks",
            name: "Stocks & Shares",
            value: 0,
            placeholder: "Enter amount",
          },
          {
            id: "mutual_funds",
            name: "Mutual Funds",
            value: 0,
            placeholder: "Enter amount",
          },
          {
            id: "other_investments",
            name: "Other Investments",
            value: 0,
            placeholder: "Enter amount",
          },
        ],
        total: 0,
      },
      {
        id: "business",
        name: "Business Assets",
        icon: <Briefcase className="h-5 w-5" />,
        description: "Include inventory, accounts receivable, and cash in business",
        fields: [
          {
            id: "inventory",
            name: "Inventory",
            value: 0,
            placeholder: "Enter amount",
          },
          {
            id: "accounts_receivable",
            name: "Accounts Receivable",
            value: 0,
            placeholder: "Enter amount",
          },
          {
            id: "business_bank_accounts",
            name: "Business Bank Accounts",
            value: 0,
            placeholder: "Enter amount",
          },
        ],
        total: 0,
      },
      {
        id: "liabilities",
        name: "Liabilities & Debts",
        icon: <Minus className="h-5 w-5" />,
        description: "Enter short-term debts that are due",
        fields: [
          {
            id: "short_term_loans",
            name: "Short-term Loans",
            value: 0,
            placeholder: "Enter amount",
          },
          {
            id: "accounts_payable",
            name: "Accounts Payable",
            value: 0,
            placeholder: "Enter amount",
          },
          {
            id: "other_debts",
            name: "Other Debts Due",
            value: 0,
            placeholder: "Enter amount",
          },
        ],
        total: 0,
      },
    ])
  }, [])

  // Calculate Nisab values based on gold and silver prices
  useEffect(() => {
    // Nisab is approximately 87.48 grams of gold or 612.36 grams of silver
    // Convert to troy ounces: 1 gram = 0.03215 troy ounces
    const goldOunces = 87.48 * 0.03215
    const silverOunces = 612.36 * 0.03215

    setNisabGold(goldPrice * goldOunces)
    setNisabSilver(silverPrice * silverOunces)
  }, [goldPrice, silverPrice])

  // Calculate totals when categories change
  useEffect(() => {
    let assetsTotal = 0
    let liabilitiesTotal = 0

    categories.forEach((category) => {
      // Calculate category total
      const categoryTotal = category.fields.reduce((sum, field) => sum + field.value, 0)

      // Update category total
      if (category.id === "liabilities") {
        liabilitiesTotal = categoryTotal
      } else {
        assetsTotal += categoryTotal
      }
    })

    setTotalAssets(assetsTotal)
    setTotalLiabilities(liabilitiesTotal)
    const netAssets = assetsTotal - liabilitiesTotal
    setNetZakatableAssets(netAssets > 0 ? netAssets : 0)

    // Calculate Zakat (2.5% of net assets)
    const zakat = (netAssets > 0 ? netAssets : 0) * 0.025
    setZakatPayable(zakat)

    // Determine if Zakat is due (if net assets exceed Nisab)
    setIsZakatDue(netAssets > Math.min(nisabGold, nisabSilver))
  }, [categories, nisabGold, nisabSilver])

  // Handle input change
  const handleInputChange = (categoryId: string, fieldId: string, value: string) => {
    const numericValue = value === "" ? 0 : Number.parseFloat(value)

    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          const updatedFields = category.fields.map((field) => {
            if (field.id === fieldId) {
              return { ...field, value: numericValue }
            }
            return field
          })

          return {
            ...category,
            fields: updatedFields,
            total: updatedFields.reduce((sum, field) => sum + field.value, 0),
          }
        }
        return category
      }),
    )
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="mb-8">
      <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors">
        <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-night-200 bg-green-50 dark:bg-night-300 card-header transition-colors">
          <Calculator className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
          <h2 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
            Calculate Your Zakat
          </h2>
        </div>

        <div className="p-6">
          {/* Nisab Information */}
          <div className="mb-6 p-4 bg-green-50 dark:bg-night-400 rounded-md">
            <h3 className="font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
              Current Nisab Threshold
            </h3>
            <p className="text-sm text-green-700 dark:text-sand-400 mb-3 card-subtitle transition-colors">
              Zakat is due if your net assets exceed the Nisab value (the minimum amount for Zakat to be payable).
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-600 dark:text-sand-500 card-muted transition-colors">
                  Gold Nisab (87.48g)
                </p>
                <p className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                  {formatCurrency(nisabGold)}
                </p>
              </div>
              <div>
                <p className="text-sm text-green-600 dark:text-sand-500 card-muted transition-colors">
                  Silver Nisab (612.36g)
                </p>
                <p className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                  {formatCurrency(nisabSilver)}
                </p>
              </div>
            </div>
          </div>

          {/* Currency Selection */}
          <div className="mb-6">
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors"
            >
              Select Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2 border border-green-200 dark:border-night-200 rounded-md bg-white dark:bg-night-300 text-green-900 dark:text-sand-200 focus:outline-none focus:ring-1 focus:ring-green-500 dark:focus:ring-sand-600 input-field transition-colors"
            >
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound (GBP)</option>
              <option value="CAD">Canadian Dollar (CAD)</option>
              <option value="AUD">Australian Dollar (AUD)</option>
              <option value="INR">Indian Rupee (INR)</option>
              <option value="PKR">Pakistani Rupee (PKR)</option>
              <option value="BDT">Bangladeshi Taka (BDT)</option>
              <option value="MYR">Malaysian Ringgit (MYR)</option>
              <option value="SAR">Saudi Riyal (SAR)</option>
              <option value="AED">UAE Dirham (AED)</option>
            </select>
          </div>

          {/* Advanced Settings Toggle */}
          <div className="mb-6">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-green-700 dark:text-sand-400 text-sm card-subtitle transition-colors"
            >
              <Info className="h-4 w-4" />
              {showAdvanced ? "Hide" : "Show"} Advanced Settings
            </button>

            {showAdvanced && (
              <div className="mt-3 p-4 border border-green-100 dark:border-night-300 rounded-md divider transition-colors">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="gold_price"
                      className="block text-sm font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors"
                    >
                      Gold Price (per oz)
                    </label>
                    <input
                      type="number"
                      id="gold_price"
                      value={goldPrice}
                      onChange={(e) => setGoldPrice(Number.parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border border-green-200 dark:border-night-200 rounded-md bg-white dark:bg-night-300 text-green-900 dark:text-sand-200 focus:outline-none focus:ring-1 focus:ring-green-500 dark:focus:ring-sand-600 input-field transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="silver_price"
                      className="block text-sm font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors"
                    >
                      Silver Price (per oz)
                    </label>
                    <input
                      type="number"
                      id="silver_price"
                      value={silverPrice}
                      onChange={(e) => setSilverPrice(Number.parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border border-green-200 dark:border-night-200 rounded-md bg-white dark:bg-night-300 text-green-900 dark:text-sand-200 focus:outline-none focus:ring-1 focus:ring-green-500 dark:focus:ring-sand-600 input-field transition-colors"
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs text-green-600 dark:text-sand-500 card-muted transition-colors">
                  Adjust the current market prices of gold and silver to calculate an accurate Nisab threshold.
                </p>
              </div>
            )}
          </div>

          {/* Asset Categories */}
          <div className="space-y-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border border-green-100 dark:border-night-300 rounded-md divider transition-colors"
              >
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-night-400 rounded-t-md">
                  <div className="text-green-600 dark:text-sand-400 icon-primary transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                    {category.name}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-green-700 dark:text-sand-400 mb-3 card-subtitle transition-colors">
                    {category.description}
                  </p>
                  <div className="space-y-3">
                    {category.fields.map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="block text-sm font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors"
                        >
                          {field.name}
                          {field.info && (
                            <span
                              className="ml-1 text-xs text-green-600 dark:text-sand-500 card-muted transition-colors"
                              title={field.info}
                            >
                              (?)
                            </span>
                          )}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-green-600 dark:text-sand-500 card-muted transition-colors">
                              {currency}
                            </span>
                          </div>
                          <input
                            type="number"
                            id={field.id}
                            value={field.value || ""}
                            onChange={(e) => handleInputChange(category.id, field.id, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full p-2 pl-12 border border-green-200 dark:border-night-200 rounded-md bg-white dark:bg-night-300 text-green-900 dark:text-sand-200 focus:outline-none focus:ring-1 focus:ring-green-500 dark:focus:ring-sand-600 input-field transition-colors"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="mt-8 p-5 bg-green-50 dark:bg-night-400 rounded-md">
            <h3 className="font-medium text-green-800 dark:text-sand-300 mb-4 card-title transition-colors">
              Zakat Calculation Results
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">Total Assets:</span>
                <span className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                  {formatCurrency(totalAssets)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                  Total Liabilities:
                </span>
                <span className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                  {formatCurrency(totalLiabilities)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-green-200 dark:border-night-300 divider transition-colors">
                <span className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                  Net Zakatable Assets:
                </span>
                <span className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                  {formatCurrency(netZakatableAssets)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-green-200 dark:border-night-300 divider transition-colors">
                <span className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                  Nisab Threshold:
                </span>
                <span className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                  {formatCurrency(Math.min(nisabGold, nisabSilver))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">Is Zakat Due?</span>
                <span
                  className={`font-medium ${
                    isZakatDue ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                  } transition-colors`}
                >
                  {isZakatDue ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-green-200 dark:border-night-300 text-lg font-bold divider transition-colors">
                <span className="text-green-800 dark:text-sand-300 card-title transition-colors">Zakat Payable:</span>
                <span className="text-green-800 dark:text-sand-300 card-title transition-colors">
                  {formatCurrency(zakatPayable)}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-green-600 dark:text-sand-500 card-muted transition-colors">
              Note: This calculation is based on the standard rate of 2.5% of your net zakatable assets. For specific
              situations, please consult with a knowledgeable Islamic scholar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
