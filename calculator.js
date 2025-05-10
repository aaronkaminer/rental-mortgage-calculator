// Update the return statement in your RentalVsMortgageCalculator component
return (
  <div className="flex flex-col">
    <div className="p-4 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow print-margin">
      {/* Title Section */}
      <div className="print-section">
        <h1 className="text-2xl font-bold text-center mb-6">Rental vs. Mortgage Analysis - Orlando, FL</h1>
        <p className="text-center text-gray-600 mb-4">Based on Orlando market data as of May 2025</p>
      </div>
      
      {/* Purchase Options - First Page */}
      <div className="print-section page-break">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Purchase Options</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          {/* Home Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Home Price</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="pl-7 block w-full border p-2"
              />
            </div>
          </div>
          
          {/* Interest Rate */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              step="0.01"
              className="block w-full border p-2"
            />
          </div>
          
          {/* Mortgage Term */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mortgage Term (years)</label>
            <input
              type="number"
              value={mortgageTerm}
              onChange={(e) => setMortgageTerm(Number(e.target.value))}
              className="block w-full border p-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              Standard terms: 30 years (common), 15 years (lower rate, higher payment)
            </div>
          </div>
          
          {/* Down Payment */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Down Payment (%)</label>
            <input
              type="number"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="block w-full border p-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              {downPaymentPercent < 20 && "PMI required with down payment less than 20%"}
            </div>
          </div>
          
          {/* PMI Rate (conditional) */}
          {downPaymentPercent < 20 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">PMI Rate (% of loan per year)</label>
              <input
                type="number"
                value={pmiRate}
                onChange={(e) => setPmiRate(Number(e.target.value))}
                step="0.05"
                className="block w-full border p-2"
              />
              <div className="text-xs text-gray-500 mt-1">
                Orlando PMI: 0.5-1.5% annually. For a $300,000 loan, PMI costs $125-$375/month.
                PMI can be removed at 20% equity, automatically terminates at 22%.
              </div>
            </div>
          )}
          
          {/* Closing Costs */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Closing Costs (% of price)</label>
            <input
              type="number"
              value={closingCosts}
              onChange={(e) => setClosingCosts(Number(e.target.value))}
              step="0.1"
              className="block w-full border p-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              Orlando closing costs for buying typically range from 2-5% (avg. 2.3%), but are set to 0% by default since these may be covered by seller concessions, lender credits, or special programs. Adjust based on your situation.
              <ul className="list-disc pl-5 mt-1">
                <li>Loan origination: 0.5-1% of loan</li>
                <li>Appraisal/inspection: $300-600</li>
                <li>Title insurance/search: varies</li>
                <li>Recording fees: 0.2-0.5%</li>
                <li>Prepaid expenses: 1-2%</li>
              </ul>
            </div>
          </div>
          
          {/* Selling Costs */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Selling Costs (% of future value)</label>
            <input
              type="number"
              value={sellingClosingCosts}
              onChange={(e) => setSellingClosingCosts(Number(e.target.value))}
              step="0.1"
              className="block w-full border p-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              In Orlando, average home selling costs typically range from 7% to 10% of the home's sale price.
              <ul className="list-disc pl-5 mt-1">
                <li>Real Estate Agent Commissions: 5-6% (most common)</li>
                <li>Closing Costs (Title, Escrow): 1-3%</li>
                <li>Transfer Taxes / Recording Fees: 0.5-1%</li>
              </ul>
              <div className="mt-1">
                For budgeting purposes, planning around 8-9% of the home's sale price is considered realistic and conservative.
              </div>
            </div>
          </div>
          
          {/* Property Tax Rate */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Property Tax Rate (%/year)</label>
            <input
              type="number"
              value={propertyTaxRate}
              onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
              step="0.01"
              className="block w-full border p-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              Orlando property tax rate: approx. 0.89% of assessed value
            </div>
          </div>
          
          {/* Home Insurance */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Annual Home Insurance ($)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(Number(e.target.value))}
                className="pl-7 block w-full border p-2"
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Florida avg: $3,600/year (higher due to hurricane risk)
            </div>
          </div>
          
          {/* HOA Fees */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Monthly HOA Fees ($)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={hoaFees}
                onChange={(e) => setHoaFees(Number(e.target.value))}
                className="pl-7 block w-full border p-2"
              />
            </div>
          </div>
          
          {/* Maintenance Cost */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Annual Maintenance (% of value)</label>
            <input
              type="number"
              value={maintenanceCost}
              onChange={(e) => setMaintenanceCost(Number(e.target.value))}
              step="0.1"
              className="block w-full border p-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              Orlando new homes: 0.5-1%. Older homes: 1.5-2%.
            </div>
          </div>
        </div>
      </div>
      
      {/* Rental Options - Second Page */}
      <div className="print-section page-break">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Rental Options</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          {/* Monthly Rent */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Monthly Rent ($)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={rentAmount}
                onChange={(e) => setRentAmount(Number(e.target.value))}
                className="pl-7 block w-full border p-2"
              />
            </div>
          </div>
          
          {/* Security Deposit */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Security Deposit (months)</label>
            <input
              type="number"
              value={securityDeposit}
              onChange={(e) => setSecurityDeposit(Number(e.target.value))}
              step="0.5"
              className="block w-full border p-2"
            />
          </div>
          
          {/* Renters Insurance */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Annual Renters Insurance ($)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={rentersInsurance}
                onChange={(e) => setRentersInsurance(Number(e.target.value))}
                className="pl-7 block w-full border p-2"
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Renters insurance in Orlando typically costs $15-30 per month ($180-360 per year), with $300/year being a common average. Prices depend on coverage limits, deductibles, location, and personal property value. Most landlords require proof of renters insurance upon lease signing.
            </div>
          </div>
        </div>
      </div>
      
      {/* General Assumptions - Third Page */}
      <div className="print-section page-break">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">General Assumptions</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          {/* Timeframe */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Timeframe (months)</label>
            <input
              type="number"
              value={timeframeMonths}
              onChange={(e) => setTimeframeMonths(Number(e.target.value))}
              className="block w-full border p-2"
            />
          </div>
          
          {/* Home Appreciation Rate */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Home Appreciation Rate (%/year)</label>
            <input
              type="number"
              value={homeAppreciationRate}
              onChange={(e) => setHomeAppreciationRate(Number(e.target.value))}
              step="0.1"
              className="block w-full border p-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              Orlando: Conservative 2-3%, Realistic 4-5%, Optimistic 6-8%
            </div>
          </div>
          
          {/* Rent Increase Rate */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Rent Increase Rate (%/year)</label>
            <input
              type="number"
              value={rentIncreaseRate}
              onChange={(e) => setRentIncreaseRate(Number(e.target.value))}
              step="0.1"
              className="block w-full border p-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              Orlando 2024: 0.9% (recent), 3-10% (typical), 0-5% (renewals)
            </div>
          </div>
        </div>
      </div>
  
      {/* Mortgage Analysis - Fourth Page */}
      <div className="print-section page-break">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Mortgage Analysis</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="mb-2">
            <span className="font-medium">Initial Cost:</span> 
            <span className="float-right">{formatCurrency(initialCostsBuying)}</span>
          </div>
          
          <div className="mb-4">
            <span className="text-sm text-gray-600">Down Payment: {formatCurrency(downPaymentAmount)}</span><br />
            <span className="text-sm text-gray-600">Closing Costs: {formatCurrency(closingCostsAmount)}</span>
          </div>
          
          <div className="mb-2">
            <span className="font-medium">Monthly Payment:</span> 
            <span className="float-right">{formatCurrency(totalMonthlyMortgageCost)}</span>
          </div>
          
          <div className="mb-4">
            <span className="text-sm text-gray-600">Principal & Interest: {formatCurrency(monthlyPrincipalAndInterest)}</span><br />
            {hasPMI && <span className="text-sm text-gray-600">PMI: {formatCurrency(monthlyPMI)}</span>}<br />
            <span className="text-sm text-gray-600">Property Tax: {formatCurrency(monthlyPropertyTax)}</span><br />
            <span className="text-sm text-gray-600">Home Insurance: {formatCurrency(monthlyHomeInsurance)}</span><br />
            <span className="text-sm text-gray-600">HOA Fees: {formatCurrency(hoaFees)}</span><br />
            <span className="text-sm text-gray-600">Maintenance: {formatCurrency(monthlyMaintenance)}</span>
          </div>
          
          <div className="mb-2 pt-2 border-t border-gray-200">
            <span className="font-medium">Total Paid Over {timeframeMonths} Months:</span> 
            <span className="float-right">{formatCurrency(totalCostsBuying)}</span>
          </div>
          
          <div className="mb-2 pt-2 border-t border-gray-200">
            <span className="font-medium">Home Value after {timeframeMonths} Months:</span> 
            <span className="float-right">{formatCurrency(currentHomeValue)}</span>
          </div>
          
          <div className="mb-2">
            <span className="font-medium">Remaining Mortgage:</span> 
            <span className="float-right">{formatCurrency(remainingLoanBalance)}</span>
          </div>
          
          <div className="mb-2 pt-2 border-t border-gray-200">
            <span className="font-medium">Sale Transaction Breakdown:</span>
          </div>
          
          <div className="mb-2">
            <span className="text-sm text-gray-600">Sale Price (Future Home Value):</span> 
            <span className="float-right">{formatCurrency(currentHomeValue)}</span>
          </div>
          
          <div className="mb-2">
            <span className="text-sm text-gray-600">Outstanding Mortgage Balance:</span> 
            <span className="float-right">-{formatCurrency(remainingLoanBalance)}</span>
          </div>
          
          <div className="mb-2">
            <span className="text-sm text-gray-600">Selling Costs ({sellingClosingCosts}%):</span> 
            <span className="float-right">-{formatCurrency(sellingCostsAmount)}</span>
          </div>
          
          <div className="mb-2 pt-1 border-t border-gray-200">
            <span className="font-medium">Net Proceeds from Sale:</span> 
            <span className="float-right">{formatCurrency(netEquityAfterSelling)}</span>
          </div>
          
          <div className="mb-2">
            <span className="text-sm text-gray-600">Initial Investment (Down Payment):</span> 
            <span className="float-right">-{formatCurrency(downPaymentAmount)}</span>
          </div>
          
          <div className="mb-2 pt-1 border-t border-gray-200">
            <span className="font-medium">Net Gain from Home Ownership:</span> 
            <span className="float-right">{formatCurrency(netEquityAfterSelling - downPaymentAmount)}</span>
          </div>
          
          <div className="mt-4 pt-2 border-t border-gray-200 font-bold">
            <span>Net Cost (Total - Equity Gained):</span> 
            <span className="float-right">{formatCurrency(netCostBuying)}</span>
          </div>
        </div>
      </div>
      
      {/* Rental Analysis - Fifth Page */}
      <div className="print-section page-break">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Rental Analysis</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="mb-2">
            <span className="font-medium">Initial Cost:</span> 
            <span className="float-right">{formatCurrency(initialCostsRenting)}</span>
          </div>
          
          <div className="mb-4">
            <span className="text-sm text-gray-600">Security Deposit: {formatCurrency(securityDepositAmount)}</span>
          </div>
          
          <div className="mb-2">
            <span className="font-medium">Initial Monthly Cost:</span> 
            <span className="float-right">{formatCurrency(rentAmount + monthlyRentersInsurance)}</span>
          </div>
          
          <div className="mb-4">
            <span className="text-sm text-gray-600">Rent: {formatCurrency(rentAmount)}</span><br />
            <span className="text-sm text-gray-600">Renters Insurance: {formatCurrency(monthlyRentersInsurance)}</span>
          </div>
          
          <div className="mb-2 pt-2 border-t border-gray-200">
            <span className="font-medium">Total Paid Over {timeframeMonths} Months:</span> 
            <span className="float-right">{formatCurrency(totalCostsRenting)}</span>
          </div>
          
          <div className="mb-2">
            <span className="font-medium">Monthly Rent at End:</span> 
            <span className="float-right">{formatCurrency(currentRent)}</span>
          </div>
          
          <div className="mb-2 pt-2 border-t border-gray-200">
            <span className="font-medium">Security Deposit Returned:</span> 
            <span className="float-right">{formatCurrency(securityDepositAmount)}</span>
          </div>
          
          <div className="mt-4 pt-2 border-t border-gray-200 font-bold">
            <span>Net Cost (Total - Security Deposit):</span> 
            <span className="float-right">{formatCurrency(netCostRenting)}</span>
          </div>
        </div>
      </div>
      
      {/* Comparison - Sixth Page */}
      <div className="print-section">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Comparison</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Initial Costs</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 p-2 rounded">
                <div className="text-sm">Buying</div>
                <div className="font-medium">{formatCurrency(initialCostsBuying)}</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="text-sm">Renting</div>
                <div className="font-medium">{formatCurrency(initialCostsRenting)}</div>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <strong>Difference:</strong> {formatCurrency(differenceInInitialCost)} {differenceInInitialCost > 0 ? "more" : "less"} to buy
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Monthly Costs (Initial)</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 p-2 rounded">
                <div className="text-sm">Buying</div>
                <div className="font-medium">{formatCurrency(totalMonthlyMortgageCost)}</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="text-sm">Renting</div>
                <div className="font-medium">{formatCurrency(rentAmount + monthlyRentersInsurance)}</div>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <strong>Difference:</strong> {formatCurrency(differenceInMonthlyCost)} {differenceInMonthlyCost > 0 ? "more" : "less"} to buy
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Net Costs Over {timeframeMonths} Months</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 p-2 rounded">
                <div className="text-sm">Buying</div>
                <div className="font-medium">{formatCurrency(netCostBuying)}</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="text-sm">Renting</div>
                <div className="font-medium">{formatCurrency(netCostRenting)}</div>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <strong>Difference:</strong> {formatCurrency(Math.abs(differenceInNetCost))} {differenceInNetCost > 0 ? "more to rent" : "more to buy"}
            </div>
          </div>
          
          <div className="mt-6 pt-2 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-2">Financial Summary</h3>
            
            <div className="mb-2">
              <strong>If you buy:</strong>
              <ul className="list-disc pl-5 mt-1 text-sm">
                <li>You will have paid {formatCurrency(totalCostsBuying)} total over {timeframeMonths} months</li>
                <li>Sale price of home: {formatCurrency(currentHomeValue)}</li>
                <li>After paying off remaining mortgage ({formatCurrency(remainingLoanBalance)}) and covering selling costs ({formatCurrency(sellingCostsAmount)}), you'll walk away with {formatCurrency(netEquityAfterSelling)}</li>
                <li>Net gain from home ownership: {formatCurrency(netEquityAfterSelling - downPaymentAmount)} compared to your initial down payment of {formatCurrency(downPaymentAmount)}</li>
              </ul>
            </div>
            
            <div className="mb-2">
              <strong>If you rent:</strong>
              <ul className="list-disc pl-5 mt-1 text-sm">
                <li>You will have paid {formatCurrency(totalCostsRenting)} total</li>
                <li>You will get back your {formatCurrency(securityDepositAmount)} security deposit</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 pt-2 border-t border-gray-200 font-bold text-lg">
            <div className="mb-2">Bottom Line:</div>
            {differenceInNetCost > 0 ? (
              <div className="bg-blue-100 p-2 rounded">
                Buying is {formatCurrency(Math.abs(differenceInNetCost))} cheaper over {timeframeMonths} months.
              </div>
            ) : (
              <div className="bg-green-100 p-2 rounded">
                Renting is {formatCurrency(Math.abs(differenceInNetCost))} cheaper over {timeframeMonths} months.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
    {/* PDF Generation Button */}
    <div className="mx-auto mt-4 mb-8">
      <button 
        onClick={createPdfReport}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate PDF Report
      </button>
    </div>
  </div>
);
