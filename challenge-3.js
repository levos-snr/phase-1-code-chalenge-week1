// Calculate PAYE
function calculatePAYE(grossSalary, isYearly) {
	if (isYearly) {
		if (grossSalary <= 288000) {
			return grossSalary * 0.1;
		} else if (grossSalary <= 388000) {
			return 28800 + (grossSalary - 288000) * 0.25;
		} else if (grossSalary <= 6000000) {
			return 28800 + 100000 * 0.25 + (grossSalary - 388000) * 0.3;
		} else if (grossSalary <= 9600000) {
			return (
				28800 + 100000 * 0.25 + 5612000 * 0.3 + (grossSalary - 6000000) * 0.325
			);
		} else {
			return (
				28800 +
				100000 * 0.25 +
				5612000 * 0.3 +
				3600000 * 0.325 +
				(grossSalary - 9600000) * 0.35
			);
		}
	} else {
		if (grossSalary <= 24000) {
			return grossSalary * 0.1;
		} else if (grossSalary <= 32333) {
			return 2400 + (grossSalary - 24000) * 0.25;
		} else if (grossSalary <= 500000) {
			return 2400 + 8333 * 0.25 + (grossSalary - 32333) * 0.3;
		} else if (grossSalary <= 800000) {
			return 2400 + 8333 * 0.25 + 467667 * 0.3 + (grossSalary - 500000) * 0.325;
		} else {
			return (
				2400 +
				8333 * 0.25 +
				467667 * 0.3 +
				300000 * 0.325 +
				(grossSalary - 800000) * 0.35
			);
		}
	}
}

// NHIF deduction
function calculateNHIF(grossSalary, isYearly) {
	if (isYearly) grossSalary /= 12;
	if (grossSalary <= 5999) return 150;
	if (grossSalary <= 7999) return 300;
	if (grossSalary <= 11999) return 400;
	if (grossSalary <= 14999) return 500;
	if (grossSalary <= 19999) return 600;
	if (grossSalary <= 24999) return 750;
	if (grossSalary <= 29999) return 850;
	if (grossSalary <= 34999) return 900;
	if (grossSalary <= 39999) return 950;
	if (grossSalary <= 44999) return 1000;
	if (grossSalary <= 49999) return 1100;
	if (grossSalary <= 59999) return 1200;
	if (grossSalary <= 69999) return 1300;
	if (grossSalary <= 79999) return 1400;
	if (grossSalary <= 89999) return 1500;
	if (grossSalary <= 99999) return 1600;
	return 1700;
}

// NSSF deduction
function calculateNSSF(grossSalary, isYearly) {
	if (isYearly) grossSalary /= 12;
	const tier1 = Math.min(grossSalary, 7000) * 0.06;
	const tier2 = Math.min(Math.max(grossSalary - 7000, 0), 29000) * 0.06;
	return tier1 + tier2;
}

//  Additional reliefs
function calculateReliefs(
	disabilityExemption,
	mortgageInterest,
	insurancePremium,
	homeOwnershipDeposit,
	isYearly
) {
	let totalRelief = isYearly ? 28800 : 2400; 

	if (disabilityExemption) {
		totalRelief += isYearly ? 180000 : 150000 / 12; 
	}

	if (mortgageInterest) {
		totalRelief += Math.min(mortgageInterest, isYearly ? 300000 : 25000); 
	}

	if (insurancePremium) {
		totalRelief += Math.min(insurancePremium, isYearly ? 60000 : 5000); 
	}

	if (homeOwnershipDeposit) {
		totalRelief += Math.min(homeOwnershipDeposit, isYearly ? 108000 : 9000); 
	}

	return totalRelief;
}

// Net salary
function calculateNetSalary(
	basicSalary,
	benefits,
	disabilityExemption,
	mortgageInterest,
	insurancePremium,
	homeOwnershipDeposit,
	isYearly
) {
	const grossSalary = basicSalary + benefits;
	const paye =
		calculatePAYE(grossSalary, isYearly) -
		calculateReliefs(
			disabilityExemption,
			mortgageInterest,
			insurancePremium,
			homeOwnershipDeposit,
			isYearly
		);
	const nhif = calculateNHIF(grossSalary, isYearly);
	const nssf = calculateNSSF(grossSalary, isYearly);
	const netSalary = grossSalary - (paye + nhif + nssf);

	return {
		grossSalary,
		paye,
		nhif,
		nssf,
		netSalary,
	};
}

// Prompt for salary details and display net salary
function promptSalaryDetails() {
	const paymentPeriod = prompt("Is the payment period 'monthly' or 'yearly'?");
	const isYearly = paymentPeriod.toLowerCase() === "yearly";
	const basicSalary = Number(
		prompt(`Enter the basic salary${isYearly ? " (annual)" : ""}:`)
	);
	const benefits = Number(
		prompt(`Enter the benefits${isYearly ? " (annual)" : ""}:`)
	);
	const disabilityExemption =
		prompt(
			"Do you have a disability exemption certificate? (yes/no)"
		).toLowerCase() === "yes";
	const mortgageInterest = disabilityExemption
		? 0
		: Number(
				prompt(
					`Enter the mortgage interest${isYearly ? " (annual)" : ""} (if any):`
				)
		  );
	const insurancePremium = disabilityExemption
		? 0
		: Number(
				prompt(
					`Enter the insurance premium${isYearly ? " (annual)" : ""} (if any):`
				)
		  );
	const homeOwnershipDeposit = disabilityExemption
		? 0
		: Number(
				prompt(
					`Enter the home ownership total deposit${
						isYearly ? " (annual)" : ""
					} (if any):`
				)
		  );

	const { grossSalary, paye, nhif, nssf, netSalary } = calculateNetSalary(
		basicSalary,
		benefits,
		disabilityExemption,
		mortgageInterest,
		insurancePremium,
		homeOwnershipDeposit,
		isYearly
	);

	alert(`Gross Salary: ${grossSalary.toFixed(2)}
PAYE: ${paye.toFixed(2)}
NHIF: ${nhif.toFixed(2)}
NSSF: ${nssf.toFixed(2)}
Net Salary: ${netSalary.toFixed(2)}`);
}
