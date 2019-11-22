var quizChoiceTag = document.querySelectorAll(".quiz-choice");         //Select all quiz option buttons

for (var i = 0; i < quizChoiceTag.length; i++) {
    quizChoiceTag[i].addEventListener("click", function() { selectQuizFunction(event)});  //Add click event listener to all the quiz option buttons 
}  
    
function selectQuizFunction(event) {
    event.preventDefault();
    var element = event.target;
    sessionStorage.setItem("selectedQuiz", element.textContent);    //Saving the selected quiz in the session storage object
    document.location.replace("question-page.html");                //Replacing the current page with the URL
};
