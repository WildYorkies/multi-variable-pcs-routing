// Order of dropdown questions. 
// eg. If it's the 2nd dropdown question, but 5th question in the survey, the number should be 5 
// MUST BE STRINGS 
var qs = {
	"education": "1",
	"military": "2",
	"mass": "5",
}
// Order of the routing question dropdown. 
// Eg. If it's the 4th dropdown question, but the 7th question in the survey, the number should be 7
// MUST BE A NUMBER 
var routingDropdownNumber = 6; 

// Object containing the skill name and it's matching VALUE in the routing question select box options 
// MUST BE NUMBERS
var skills = {
	"undergrad_mlt": "0",
	"grad_mlt": "1",
	"undergrad_mlt_mass": "2",
	"grad_mlt_mass": "3",
	"undergrad_mass": "4",
	"grad_mass": "5"
}
// To be used when no correct match is found
// MUST BE A NUMBER 
var nonMatchingSkill = 1;

// The logic for each question response
// 1 is the first choice in dropdown, 2 the second, 3 the third, etc 
// MUST BE STRINGS
var pathwaysToSkills = {};
pathwaysToSkills[qs.education + "1" + qs.military + "1" + qs.mass + "2"] = skills.undergrad_mlt;
pathwaysToSkills[qs.education + "2" + qs.military + "1" + qs.mass + "2"] = skills.grad_mlt;
pathwaysToSkills[qs.education + "1" + qs.military + "2" + qs.mass + "1"] = skills.undergrad_mass;
pathwaysToSkills[qs.education + "2" + qs.military + "2" + qs.mass + "1"] = skills.grad_mass;
pathwaysToSkills[qs.education + "1" + qs.military + "1" + qs.mass + "1"] = skills.undergrad_mlt_mass;
pathwaysToSkills[qs.education + "2" + qs.military + "1" + qs.mass + "1"] = skills.grad_mlt_mass;