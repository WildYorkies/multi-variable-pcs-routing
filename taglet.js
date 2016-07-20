// Execution:
// 1. User answers the dropdown questions
// 2. User clicks the fake submit button
// 3. Routing question is set by script 
// 4. Script clicks the real submit button and advances to chat

var config = require('config.js');

var qsArray = [];
for (var key in config.qs)
    qsArray.push(qs[key]);


//lpTag.events.bind(appName, eventName, callbackFunction);
lpTag.events.bind("lpUnifiedWindow", "state", function(eventData, eventInfo){
	if (eventData.state == "preChat") { 
		setTimeout(function(){ 
			var allQuestions = document.getElementsByClassName("lp_question_wrapper");
			// Find and hide routing question dropdown 
			var routingQuestion;
			for (var i=0;i<allQuestions.length;i++) {
				if ( i + 1 === config.routingDropdownNumber) {
					routingQuestion = allQuestions[i].children[0].children[1].children[0];
				}
			}
			routingQuestion.setAttribute("style", "display: none !important;");
			// find real submit button and create fake submit button 
			var realSubmitButton = document.getElementsByClassName("lp_submit_button")[0];
			var lpButtonsArea = document.getElementsByClassName("lp_buttons_area")[0];
			var fakeSubmitButton = document.createElement('button');
			fakeSubmitButton.innerHTML = "";
			fakeSubmitButton.style.width = "115px";
			fakeSubmitButton.style.height = "35px";
			// if the next button is hidden, append the fake submit button, else append the fake button only when the submit button is not hidden 
			var nextButton = document.getElementsByClassName("lp_next_button")[0];
			if (nextButton.classList.contains("lpHide")) {
				lpButtonsArea.appendChild(fakeSubmitButton); 
			} else {
				nextButton.addEventListener("click", function(){
					setTimeout(function(){
						if ( !realSubmitButton.classList.contains("lpHide") ) {
							lpButtonsArea.appendChild(fakeSubmitButton); 
						}
					}, 500)
				});	
			}
			
			fakeSubmitButton.addEventListener("click", function(){
				// analyze the responses 
				var selections = "";
				qsArray.map(function(questionNumber) {
					for (var i=0;i<allQuestions.length;i++) {
						if ( i + 1 == questionNumber) {
							var response = allQuestions[i].children[0].children[1].children[0].options.selectedIndex;
							selections += questionNumber + response;
						} 
					}
					
				});
				
				// choose the skill 
				function chooseSkill() {
					if (config.pathwaysToSkills.hasOwnProperty(selections)) {
						return config.pathwaysToSkills[selections];
					} else {
						return config.nonMatchingSkill;
					}
				}
				
				//routingQuestion.addEventListener('change', function (e) { e.value = chooseSkill(); }, false);
				routingQuestion.value = chooseSkill();
				// Dispatch and advance to chat 
				var changeEvent = new Event('change');
				routingQuestion.dispatchEvent(changeEvent);
				realSubmitButton.click();
			
			});	
		}, 500);
    }
});
