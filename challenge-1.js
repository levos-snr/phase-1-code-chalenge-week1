// Function to Calculate grade based on student marks
function generateGrade(marks) {
	if (marks < 0 || marks > 100) {
		return "Invalid marks. Please enter a number between 0 and 100.";
	}

	let grade;
	if (marks > 79) {
		grade = "A";
	} else if (marks >= 60) {
		grade = "B";
	} else if (marks >= 49) {
		grade = "C";
	} else if (marks >= 40) {
		grade = "D";
	} else {
		grade = "E";
	}
	return grade;
}

// Prompt user for marks and display
function promptGrade() {
	const marks = prompt("Enter the student's marks (0-100):");
	const grade = generateGrade(Number(marks));
	alert(grade);
}
