var quizChoiceTag = document.querySelectorAll(".quiz-choice");         //Select all quiz option buttons
var questionTag = document.querySelector("#question");                 //Select the question tag
var option1Tag = document.querySelector("#option1");                   //Select the first option tag 
var option2Tag = document.querySelector("#option2");                   //Select the second option tag
var option3Tag = document.querySelector("#option3");                   //Select the third option tag
var option4Tag = document.querySelector("#option4");                   //Select the fourth option tag
var lineTag = document.querySelector("#line");                         //Select the line tag - initially hidden
var answerTag = document.querySelector("#answer");                     //Select the answer tag
var nextButtonTag = document.querySelector("#next");                   //Select the Next button tag

for (var i = 0; i < quizChoiceTag.length; i++) {
    quizChoiceTag[i].addEventListener("click", function() { selectQuizFunction(event)});  //Add click event listener to all the quiz option buttons 
}  
    
function selectQuizFunction(event) {
    event.preventDefault();
    var element = event.target;
    sessionStorage.setItem("selectedQuiz", element.textContent);    //Saving the selected quiz in the session storage object
    document.location.replace("question-page.html");                //Replacing the current page with the URL
};

function loadQuestion() {
    var questionList;
    var questionIndex;
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
    var item = sessionStorage.getItem("questionIndex");
    questionIndex = (item != null) ? parseInt(item) : 0;   //If the questionIndex has been stored in sessionStorage, retrieve it's value else assign the index to 0 as it is the first question. In this way if the page is refreshed, the progress of the quiz will not be lost and the current question can be loaded back.

    //Populating the question and options
    questionTag.textContent = questionList[questionIndex].title;
    option1Tag.textContent = "1. " + questionList[questionIndex].choices[0];
    option2Tag.textContent = "2. " +questionList[questionIndex].choices[1];
    option3Tag.textContent = "3. " +questionList[questionIndex].choices[2];
    option4Tag.textContent = "4. " +questionList[questionIndex].choices[3];


}