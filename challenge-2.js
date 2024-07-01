// Function to calculate demerit points based on speed.
function calculateDemeritPoints(speed) {
	const speedLimit = 70;
	const kmPerDemeritPoint = 5;

	if (speed <= speedLimit) {
		return "Ok";
	} else {
		const demeritPoints = Math.floor((speed - speedLimit) / kmPerDemeritPoint);
		if (demeritPoints > 12) {
			return "License suspended";
		} else {
			return `Points: ${demeritPoints}`;
		}
	}
}

// Prompt user for speed and display
function promptSpeed() {
	const speed = prompt("Enter the speed of the car:");
	const result = calculateDemeritPoints(parseInt(speed));
	alert(result);
}
