var quizChoiceTag = document.querySelectorAll(".quiz-choice");         //Select all quiz option buttons
var answerChoiceTag = document.querySelectorAll(".choice");            //Select all answer option buttons
var questionTag = document.querySelector("#question");                 //Select the question tag
var option1Tag = document.querySelector("#option1");                   //Select the first option tag 
var option2Tag = document.querySelector("#option2");                   //Select the second option tag
var option3Tag = document.querySelector("#option3");                   //Select the third option tag
var option4Tag = document.querySelector("#option4");                   //Select the fourth option tag
var lineTag = document.querySelector("#line");                         //Select the line tag - initially hidden
var answerTag = document.querySelector("#answer");                     //Select the answer tag
var nextButtonTag = document.querySelector("#next");                   //Select the Next button tag
var score = 0;
var time = 100;

for (var i = 0; i < quizChoiceTag.length; i++) {
    quizChoiceTag[i].addEventListener("click", function() { selectQuizFunction(event)});  //Add click event listener to all the quiz option buttons 
}  
    
function selectQuizFunction(event) {
    event.preventDefault();
    var element = event.target;
    sessionStorage.setItem("selectedQuiz", element.textContent);    //Saving the selected quiz in the session storage object
    document.location.replace("question-page.html");                //Replacing the current page with the URL
};
function getSelectedQuiz() {
    var questionList;
    var selectedQuiz = sessionStorage.getItem("selectedQuiz"); //Read the quiz selection stored in the session storage
    if(selectedQuiz == "HTML Quiz") {
        questionList = htmlQuestions;                          //Assign the question list object from questions.js by checking the selectedQuiz string
    }
    else if(selectedQuiz == "CSS Quiz") {
        questionList = cssQuestions;
    }
    else if(selectedQuiz == "Javascript Quiz") {
        questionList = javascriptQuestions;
    }
    return questionList;
}
function loadQuestion() {
    var questionList = getSelectedQuiz();
    var questionIndex;
    var index = sessionStorage.getItem("questionIndex");
    questionIndex = (index != null) ? parseInt(index) : 0;   //If the questionIndex has been stored in sessionStorage, retrieve it's value else assign the index to 0 as it is the first question. In this way if the page is refreshed, the progress of the quiz will not be lost and the current question can be loaded back.
    if(questionIndex == 0) {
        sessionStorage.setItem("questionIndex",questionIndex); //Store the questionIndex if the first question is loaded
    }
    //Populating the question and options
    questionTag.textContent = questionList[questionIndex].title;
    option1Tag.textContent = "1. " + questionList[questionIndex].choices[0];
    option2Tag.textContent = "2. " + questionList[questionIndex].choices[1];
    option3Tag.textContent = "3. " + questionList[questionIndex].choices[2];
    option4Tag.textContent = "4. " + questionList[questionIndex].choices[3];
}

for (var i = 0; i < answerChoiceTag.length; i++) {
    answerChoiceTag[i].addEventListener("click", function() { checkAnswerFunction(event)});  //Add click event listener to all the answer option buttons 
}  

function checkAnswerFunction(event) {
    event.preventDefault();
    var selectedAnswerTag = event.target;
    var questionList = getSelectedQuiz();
    var questionIndex = sessionStorage.getItem("questionIndex");
    var penaltyTag = document.querySelector("#penalty-alert");
    lineTag.setAttribute("style", "display:block");                     //Display the line and the next button after an option has been selected
    nextButtonTag.setAttribute("style", "display:block");
    if(questionList[questionIndex].answer == selectedAnswerTag.textContent.substring(3)) { //Check if selected answer is the correct answer
        score+= 10;                                              //For correct answer add 10 points to score
    }
    else {
        time-= 10;                                              //For incorrect answer, deduct 10 seconds from timer
        myVar = setTimeout(function(){ penaltyTag.setAttribute("style", "display:block;")  }, 1);  //display the penalty span tag for 2 seconds alerting the user that time penalty has occured
        myVar = setTimeout(function(){ penaltyTag.setAttribute("style", "display:none;")  }, 1000); 
    }
}