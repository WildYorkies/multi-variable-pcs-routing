require('config.js');

// Execution:
// 1. User answers the dropdown questions
// 2. User clicks the fake submit button
// 3. Routing question is set by script 
// 4. Script clicks the real submit button and advances to chat

var qsArray = [];
for (var key in qs)
    qsArray.push(qs[key]);


//lpTag.events.bind(appName, eventName, callbackFunction);
lpTag.events.bind("lpUnifiedWindow", "state", function(eventData, eventInfo){
    console.log(eventData.state);
	if (eventData.state == "preChat") {
		console.log("preChat matched");
        
		setTimeout(function(){ 
			var allQuestions = document.getElementsByClassName("lp_question_wrapper");
			// Find and hide routing question dropdown 
			var routingQuestion;
			for (var i=0;i<allQuestions.length;i++) {
				if ( i + 1 === routingDropdownNumber) {
					routingQuestion = allQuestions[i].children[0].children[1].children[0];
					console.log(allQuestions[i].children[0].children[1].children[0]);
				}
			}
			hideElement(routingQuestion);
			console.log("routingQuestion bound to " + routingQuestion + " and the select box is invisible");
			// find real submit button and create fake submit button 
			var realSubmitButton = document.getElementsByClassName("lp_submit_button")[0];
			console.log("realSubmitButton bound to " + realSubmitButton);
			var lpButtonsArea = document.getElementsByClassName("lp_buttons_area")[0];
			console.log("lpButtonsArea bound to " + lpButtonsArea);
			var fakeSubmitButton = document.createElement('button');
			fakeSubmitButton.innerHTML = "";
			fakeSubmitButton.style.width = "115px";
			fakeSubmitButton.style.height = "35px";
			console.log("fakeSubmitButton = " + fakeSubmitButton);
			// if the next button is hidden, append the fake submit button, else append the fake button only when the submit button is not hidden 
			var nextButton = document.getElementsByClassName("lp_next_button")[0];
			if (nextButton.classList.contains("lpHide")) {
				lpButtonsArea.appendChild(fakeSubmitButton); 
				console.log("fake submit button appended");
			} else {
				nextButton.addEventListener("click", function(){
					setTimeout(function(){
						if (realSubmitButton.classList.contains("lpHide")) {
							console.log("do not append fake submit button");
						} else { 
							lpButtonsArea.appendChild(fakeSubmitButton); 
							console.log("fake submit button appended");
						}
					}, 500)
				});	
			}
			
			fakeSubmitButton.addEventListener("click", function(){
				console.log("fakeSubmitButton clicked");
				
				// analyze the responses 
				var selections = "";
				qsArray.map(function(questionNumber) {
					for (var i=0;i<allQuestions.length;i++) {
						if ( i + 1 == questionNumber) {
							var response = allQuestions[i].children[0].children[1].children[0].options.selectedIndex;
							console.log(typeof(response) + " is the response type");
							console.log("response for " + questionNumber + " is bound to " + response); //+ " AKA " + actualBox.options[actualBox.selectedIndex].text);
							selections += questionNumber + response;
							console.log("pushed " + questionNumber + response);
						} 
					}
					
				});
				console.log("selections = " + selections);
				console.log(typeof(selections) + " is the type");
				
				// choose the skill 
				function chooseSkill() {
					if (pathwaysToSkills.hasOwnProperty(selections)) {
						console.log("skill chosen: " + pathwaysToSkills[selections] + " and type is " + typeof(pathwaysToSkills[selections]));
						return pathwaysToSkills[selections];
					} else {
						console.log("nonMatchingSkill chosen");
						return nonMatchingSkill;
					}
				}
				
				//routingQuestion.addEventListener('change', function (e) { e.value = chooseSkill(); }, false);
				routingQuestion.value = chooseSkill();
				console.log("routing question pre-eventDispatch = " + routingQuestion.value);
				// Dispatch and advance to chat 
				var changeEvent = new Event('change');
				routingQuestion.dispatchEvent(changeEvent);
				console.log("changeEvent fired");
				realSubmitButton.click();
				console.log("real submit button clicked");
			
			});	
		}, 500);
    }
});

function hideElement(el) {
	el.setAttribute("style", "display: none !important;");
}
