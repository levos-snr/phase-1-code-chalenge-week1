function checkSpeed(speed) {
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

function promptSpeed() {
	let speed = parseFloat(prompt("Enter the speed:"));
	if (isNaN(speed) || speed < 0) {
		alert("Please enter a valid positive number.");
	} else {
		alert(checkSpeed(speed));
	}
}
