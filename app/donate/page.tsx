"use client";
import React from "react";
import { useState } from "react";
import { CreditCard, Heart, Users, BookOpen, Globe, CheckCircle } from "lucide-react";
import Header from "@/components/header";

export default function DonationPage() {
  const [donationAmount, setDonationAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10);

  const predefinedAmounts = [5, 10, 25, 50, 100];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(null);
      setDonationAmount(parseFloat(value));
    } else {
      setSelectedAmount(10);
      setDonationAmount(10);
    }
  };

  const handleSubmit = () => {
    setIsProcessing(true);

    // In a real implementation, this would connect to the Stripe API
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Thank you for your ${isMonthly ? "monthly" : "one-time"} donation of $${donationAmount}!`);
    }, 1500);
  };

  return (
    <div>
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 dark:text-sand-200">Support Our Mission</h1>
          <p className="text-xl max-w-3xl mx-auto dark:text-sand-300">Your generous donations help us continue our work in providing authentic Islamic resources and developing this platform for the global Ummah.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Donation form */}
          <div>
            <div className="bg-white dark:card-bg rounded-lg shadow-md p-6 border border-gray-100 dark:border-night-300">
              <h2 className="text-2xl font-semibold mb-6 flex items-center dark:text-sand-300">
                <Heart className="mr-2 text-primary dark:text-sand-700" size={24} />
                Make a Donation
              </h2>

              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 dark:text-sand-300">
                    Donation Type
                  </label>
                  <div className="flex bg-secondary dark:bg-night-300 rounded-lg p-1">
                    <button
                      type="button"
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${!isMonthly ? 'bg-white dark:bg-night-200 shadow-sm text-gray-800 dark:text-sand-300' : 'text-gray-600 dark:text-sand-400'}`}
                      onClick={() => setIsMonthly(false)}
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${isMonthly ? 'bg-white dark:bg-night-200 shadow-sm text-gray-800 dark:text-sand-300' : 'text-gray-600 dark:text-sand-400'}`}
                      onClick={() => setIsMonthly(true)}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 dark:text-sand-300">
                    Donation Amount
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={`py-3 rounded-md text-sm font-medium transition-colors border ${selectedAmount === amount
                          ? 'border-primary bg-primary/10 text-primary dark:border-sand-700 dark:bg-sand-700/20 dark:text-sand-400'
                          : 'border-gray-200 hover:border-gray-300 dark:border-night-200 dark:hover:border-night-100 dark:text-sand-400'
                          }`}
                        onClick={() => handleAmountSelect(amount)}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-sand-500">$</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Custom amount"
                      className="pl-8 w-full dark:input-field rounded-md py-3 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20 dark:focus:border-sand-600 dark:focus:ring-sand-600/20"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 dark:text-sand-300">
                    Payment Details
                  </label>
                  <div className="bg-gray-50 dark:bg-night-300 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <CreditCard className="text-gray-400 dark:text-sand-500 mr-2" size={20} />
                      <span className="text-sm dark:text-sand-400">Secure payment processed by Stripe</span>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Card holder name"
                        className="w-full dark:input-field rounded-md py-2 border-gray-200"
                      />
                      <input
                        type="text"
                        placeholder="Card number"
                        className="w-full dark:input-field rounded-md py-2 border-gray-200"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full dark:input-field rounded-md py-2 border-gray-200"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          className="w-full dark:input-field rounded-md py-2 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:btn-primary dark:focus:ring-sand-600"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Donate ${donationAmount ? `$${donationAmount}` : ""} ${isMonthly ? "Monthly" : ""}`
                  )}
                </button>

                <div className="mt-4 text-center text-sm text-gray-500 dark:text-sand-500">
                  Your donation may be tax-deductible. A receipt will be emailed to you.
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Reasons to support */}
          <div>
            <div className="bg-white dark:card-bg rounded-lg shadow-md p-6 border border-gray-100 dark:border-night-300 mb-6">
              <h2 className="text-2xl font-semibold mb-6 dark:text-sand-300">Why Support Us</h2>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 dark:bg-sand-700/20">
                      <BookOpen className="h-6 w-6 text-primary dark:text-sand-700" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium dark:text-sand-300">Authentic Islamic Knowledge</h3>
                    <p className="mt-2 text-gray-600 dark:text-sand-400">Your support helps us provide carefully researched Islamic content from authentic sources, making reliable knowledge accessible to all.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 dark:bg-sand-700/20">
                      <Globe className="h-6 w-6 text-primary dark:text-sand-700" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium dark:text-sand-300">Global Accessibility</h3>
                    <p className="mt-2 text-gray-600 dark:text-sand-400">We're committed to making Islamic resources available in multiple languages and accessible to Muslims worldwide, regardless of location or circumstances.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 dark:bg-sand-700/20">
                      <Users className="h-6 w-6 text-primary dark:text-sand-700" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium dark:text-sand-300">Supporting Our Team</h3>
                    <p className="mt-2 text-gray-600 dark:text-sand-400">Your donations directly support our dedicated team of scholars, developers, and content creators who work tirelessly to build and maintain this platform.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:card-bg rounded-lg shadow-md p-6 border border-gray-100 dark:border-night-300">
              <h3 className="text-lg font-semibold mb-4 dark:text-sand-300">How Your Donation Helps</h3>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary dark:text-sand-700 mr-2 mt-0.5" />
                  <span className="dark:text-sand-400">Server costs and technical infrastructure</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary dark:text-sand-700 mr-2 mt-0.5" />
                  <span className="dark:text-sand-400">Content research and development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary dark:text-sand-700 mr-2 mt-0.5" />
                  <span className="dark:text-sand-400">New features and app enhancements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary dark:text-sand-700 mr-2 mt-0.5" />
                  <span className="dark:text-sand-400">Translation services for global accessibility</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary dark:text-sand-700 mr-2 mt-0.5" />
                  <span className="dark:text-sand-400">Educational resources development</span>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-night-300 rounded-lg">
                <blockquote className="italic text-gray-600 dark:text-sand-400">
                  "Whoever guides someone to goodness will have a reward like the one who did it."
                  <footer className="mt-2 text-gray-500 dark:text-sand-500">- Prophet Muhammad ﷺ (Sahih Muslim)</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4 dark:text-sand-300">Other Ways to Support</h3>
          <div className="max-w-3xl mx-auto text-gray-600 dark:text-sand-400">
            <p>If you're unable to donate financially, you can still support our mission by sharing our website with others, providing feedback to help us improve, or volunteering your skills. Contact us to learn more about volunteer opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  );
}