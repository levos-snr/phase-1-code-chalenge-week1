// Function to Calculate grade based on student marks
function generateGrade(marks) {
	let grade;
	if (marks > 79) {
		grade = "A";
	} else if (marks >= 60 && marks <= 79) {
		grade = "B";
	} else if (marks >= 49 && marks <= 59) {
		grade = "C";
	} else if (marks >= 40 && marks <= 49) {
		grade = "D";
	} else {
		grade = "E";
	}
	return grade;
}

function promptGrade() {
	const marks = prompt("Enter student marks (between 0 and 100):");
	const grade = generateGrade(parseInt(marks));
	alert(`The grade for marks ${marks} is: ${grade}`);
}