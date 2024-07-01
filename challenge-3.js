// Constants for PAYE tax rates
const PAYE_RATES = [
	{ min: 0, max: 24000, rate: 0.1 },
	{ min: 24001, max: 32333, rate: 0.25 },
	{ min: 32334, max: 500000, rate: 0.3 },
	{ min: 500001, max: 800000, rate: 0.325 },
	{ min: 800001, max: Infinity, rate: 0.35 },
];

// NHIF rates
const NHIF_RATES = [
	{ min: 0, max: 5999, deduction: 150 },
	{ min: 6000, max: 7999, deduction: 300 },
	{ min: 8000, max: 11999, deduction: 400 },
	{ min: 12000, max: 14999, deduction: 500 },
	{ min: 15000, max: 19999, deduction: 600 },
	{ min: 20000, max: 24999, deduction: 750 },
	{ min: 25000, max: 29999, deduction: 850 },
	{ min: 30000, max: 34999, deduction: 900 },
	{ min: 35000, max: 39999, deduction: 950 },
	{ min: 40000, max: 44999, deduction: 1000 },
	{ min: 45000, max: 49999, deduction: 1100 },
	{ min: 50000, max: 59999, deduction: 1200 },
	{ min: 60000, max: 69999, deduction: 1300 },
	{ min: 70000, max: 79999, deduction: 1400 },
	{ min: 80000, max: 89999, deduction: 1500 },
	{ min: 90000, max: 99999, deduction: 1600 },
	{ min: 100000, max: Infinity, deduction: 1700 },
];

// NSSF rates
const NSSF_RATE = 0.06;
const TIER_I_LIMIT = 7000;
const TIER_II_LIMIT = 36000;

function calculateNHIF(grossSalary) {
	for (let rate of NHIF_RATES) {
		if (grossSalary >= rate.min && grossSalary <= rate.max) {
			return rate.deduction;
		}
	}
	return 0;
}

//Function to Calculate PAYE
function calculatePAYE(grossSalary) {
    let tax = 0;
    for (let rate of PAYE_RATES) {
        if (grossSalary > rate.min) {
            const taxableAmount = Math.min(grossSalary, rate.max) - rate.min;
            tax += taxableAmount * rate.rate;
        }
    }
    return tax;
}

// Function to Calculate NSSF
function calculateNSSF(basicSalary) {
    const tierIContribution = Math.min(basicSalary, TIER_I_LIMIT) * NSSF_RATE;
    const tierIIContribution = Math.min(Math.max(basicSalary - TIER_I_LIMIT, 0), TIER_II_LIMIT - TIER_I_LIMIT) * NSSF_RATE;
    return tierIContribution + tierIIContribution;
}

// Calculate Net Salary
function calculateNetSalary(basicSalary, benefits) {
    const grossSalary = basicSalary + benefits;
    const nssfDeductions = calculateNSSF(basicSalary);
    const nhifDeductions = calculateNHIF(grossSalary);
    const payeeTax = calculatePAYE(grossSalary);

    const netSalary = grossSalary - nssfDeductions - nhifDeductions - payeeTax;
    return {
        grossSalary,
        nssfDeductions,
        nhifDeductions,
        payeeTax,
        netSalary
    };
}

// Prompt user for inputs and display
function promptSalaryDetails() {
	const basicSalary = parseFloat(prompt("Enter your basic salary:"));
	const benefits = parseFloat(prompt("Enter your benefits:"));

	const { grossSalary, nssfDeductions, nhifDeductions, payeeTax, netSalary } =
		calculateNetSalary(basicSalary, benefits);
	alert(
		`Gross Salary: ${grossSalary}\nNSSF Deductions: ${nssfDeductions}\nNHIF Deductions: ${nhifDeductions}\nPAYE Tax: ${payeeTax}\nNet Salary: ${netSalary}`
	);
}