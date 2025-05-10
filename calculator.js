const { useState } = React;

function RentalVsMortgageCalculator() {
  // Initial state values for mortgage
  const [homePrice, setHomePrice] = useState(450000);
  const [interestRate, setInterestRate] = useState(3.99);
  const [downPaymentPercent, setDownPaymentPercent] = useState(5);
  const [closingCosts, setClosingCosts] = useState(0);
  const [sellingClosingCosts, setSellingClosingCosts] = useState(8.5);
  const [mortgageTerm, setMortgageTerm] = useState(30);
  const [pmiRate, setPmiRate] = useState(1);
  
  // Initial state values for rent
  const [rentAmount, setRentAmount] = useState(4000);
  const [securityDeposit, setSecurityDeposit] = useState(2);
  
  // General assumptions
  const [timeframeMonths, setTimeframeMonths] = useState(24);
  const [homeAppreciationRate, setHomeAppreciationRate] = useState(4.5);
  const [rentIncreaseRate, setRentIncreaseRate] = useState(1);
  const [propertyTaxRate, setPropertyTaxRate] = useState(0.89);
  const [homeInsurance, setHomeInsurance] = useState(3600);
  const [hoaFees, setHoaFees] = useState(350);
  const [maintenanceCost, setMaintenanceCost] = useState(0.75);
  const [rentersInsurance, setRentersInsurance] = useState(300);
  
  // Calculate mortgage details
  const downPaymentAmount = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPaymentAmount;
  const closingCostsAmount = homePrice * (closingCosts / 100);
  const monthlyInterestRate = interestRate / 100 / 12;
  
  // Calculate mortgage payment
  const mortgageTermMonths = mortgageTerm * 12;
  const monthlyPrincipalAndInterest = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, mortgageTermMonths)) / 
    (Math.pow(1 + monthlyInterestRate, mortgageTermMonths) - 1);
  
  // Calculate PMI (if down payment < 20%)
  const hasPMI = downPaymentPercent < 20;
  const monthlyPMI = hasPMI ? (loanAmount * (pmiRate / 100)) / 12 : 0;
  
  const monthlyPropertyTax = homePrice * (propertyTaxRate / 100) / 12;
  const monthlyHomeInsurance = homeInsurance / 12;
  const monthlyMaintenance = homePrice * (maintenanceCost / 100) / 12;
  const monthlyRentersInsurance = rentersInsurance / 12;
  
  const totalMonthlyMortgageCost = monthlyPrincipalAndInterest + monthlyPropertyTax + 
    monthlyHomeInsurance + monthlyMaintenance + hoaFees + monthlyPMI;
  
  // Initial costs for buying
  const initialCostsBuying = downPaymentAmount + closingCostsAmount;
  
  // Calculate mortgage amortization and equity over time
  let remainingLoanBalance = loanAmount;
  let currentHomeValue = homePrice;
  const monthlyHomeAppreciation = Math.pow(1 + homeAppreciationRate / 100, 1/12) - 1;
  
  for (let month = 1; month <= timeframeMonths; month++) {
    // Calculate interest and principal for this month
    const interestThisMonth = remainingLoanBalance * monthlyInterestRate;
    const principalThisMonth = monthlyPrincipalAndInterest - interestThisMonth;
    
    // Update loan balance
    remainingLoanBalance -= principalThisMonth;
    
    // Update home value with appreciation
    currentHomeValue *= (1 + monthlyHomeAppreciation);
  }
  
  // Calculate equity at end of timeframe (accounting for selling costs)
  const equityAtEnd = currentHomeValue - remainingLoanBalance;
  const sellingCostsAmount = currentHomeValue * (sellingClosingCosts / 100);
  const netEquityAfterSelling = equityAtEnd - sellingCostsAmount;
  
  // Calculate total costs for buying
  const totalCostsBuying = initialCostsBuying + (totalMonthlyMortgageCost * timeframeMonths);
  
  // Calculate net cost (considering equity gained)
  const netCostBuying = totalCostsBuying - (netEquityAfterSelling - downPaymentAmount);
  
  // Calculate rental costs
  const securityDepositAmount = rentAmount * securityDeposit;
  const initialCostsRenting = securityDepositAmount;
  
  // Calculate rent with annual increases
  let totalRentPaid = 0;
  let currentRent = rentAmount;
  const monthlyRentIncrease = Math.pow(1 + rentIncreaseRate / 100, 1/12) - 1;
  
  for (let month = 1; month <= timeframeMonths; month++) {
    totalRentPaid += currentRent;
    currentRent *= (1 + monthlyRentIncrease);
  }
  
  const totalCostsRenting = initialCostsRenting + totalRentPaid + 
    (monthlyRentersInsurance * timeframeMonths);
  
  // Calculate net cost of renting
  const netCostRenting = totalCostsRenting - securityDepositAmount;
  
  // Calculate comparison metrics
  const differenceInNetCost = netCostRenting - netCostBuying;
  const differenceInInitialCost = initialCostsBuying - initialCostsRenting;
  const differenceInMonthlyCost = totalMonthlyMortgageCost - (rentAmount + monthlyRentersInsurance);
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Create PDF report
  const createPdfReport = () => {
    window.print();
  };

  return (
    <div className="flex flex-col">
      <div className="p-4 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Rental vs. Mortgage Analysis - Orlando, FL</h1>
        <p className="text-center text-gray-600 mb-4">Based on Orlando market data as of May 2025</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Mortgage Inputs */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Purchase Options</h2>
            
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
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Property Tax Rate (%/year)</label>
              <input
                type="number"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                step="0.01"
                className="block w-full border p-2"
              />
            </div>
            
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
            </div>
            
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
          </div>
          
          {/* Rental & General Inputs */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Rental Options</h2>
            
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
            </div>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">General Assumptions</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Timeframe (months)</label>
              <input
                type="number"
                value={timeframeMonths}
                onChange={(e) => setTimeframeMonths(Number(e.target.value))}
                className="block w-full border p-2"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Home Appreciation Rate (%/year)</label>
              <input
                type="number"
                value={homeAppreciationRate}
                onChange={(e) => setHomeAppreciationRate(Number(e.target.value))}
                step="0.1"
                className="block w-full border p-2"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Rent Increase Rate (%/year)</label>
              <input
                type="number"
                value={rentIncreaseRate}
                onChange={(e) => setRentIncreaseRate(Number(e.target.value))}
                step="0.1"
                className="block w-full border p-2"
              />
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Mortgage Results */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Mortgage Analysis</h2>
            
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
              <span className="font-medium">Net Proceeds from Sale:</span> 
              <span className="float-right">{formatCurrency(netEquityAfterSelling)}</span>
            </div>
            
            <div className="mt-4 pt-2 border-t border-gray-200 font-bold">
              <span>Net Cost (Total - Equity Gained):</span> 
              <span className="float-right">{formatCurrency(netCostBuying)}</span>
            </div>
          </div>
          
          {/* Rental Results */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Rental Analysis</h2>
            
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
          
          {/* Comparison Results */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Comparison</h2>
            
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
              <h3 className="text-lg font-medium mb-2">Bottom Line:</h3>
              {differenceInNetCost > 0 ? (
                <div className="bg-blue-100 p-2 rounded">
                  <strong>Buying is {formatCurrency(Math.abs(differenceInNetCost))} cheaper over {timeframeMonths} months.</strong>
                </div>
              ) : (
                <div className="bg-green-100 p-2 rounded">
                  <strong>Renting is {formatCurrency(Math.abs(differenceInNetCost))} cheaper over {timeframeMonths} months.</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
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
}

function App() {
  return (
    <div className="container mx-auto">
      <RentalVsMortgageCalculator />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));