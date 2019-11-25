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
var timeLeftTag = document.querySelector("#time-left");

var score = 0;

var timerInterval;
function timerFunction() {                              //Timer function to countdown the time
    var time = parseInt(sessionStorage.getItem("timeLeft"));
    time--;
    timeLeftTag.textContent = time.toString();
    sessionStorage.setItem("timeLeft", time);
    if(time <= 0) {
        clearInterval(timerInterval);                   //If timer reaches 0, stop the timer
        sessionStorage.setItem("timeLeft", 0);
        document.location.replace("result-page.html");
    }
}

for (var i = 0; i < quizChoiceTag.length; i++) {
    quizChoiceTag[i].addEventListener("click", function() { selectQuizFunction(event)});  //Add click event listener to all the quiz option buttons 
}  

function selectQuizFunction(event) {
    event.preventDefault();
    var element = event.target;
    sessionStorage.setItem("timeLeft", 100);  
    sessionStorage.setItem("score", score);
    sessionStorage.setItem("selectedQuiz", element.textContent);    //Saving the selected quiz in the session storage object
    document.location.replace("question-page.html");                //Replacing the current page with the URL
};

for (var i = 0; i < answerChoiceTag.length; i++) {
    answerChoiceTag[i].addEventListener("click", function() { checkAnswerFunction(event)});  //Add click event listener to all the answer option buttons 
}  
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
    var time = parseInt(sessionStorage.getItem("timeLeft"));    //If page is refreshed, set the time back to the previously stored time in session storage object
    timeLeftTag.textContent = time.toString();
    questionIndex = (index != null) ? parseInt(index) : 0;   //If the questionIndex has been stored in sessionStorage, retrieve it's value else assign the index to 0 as it is the first question. In this way if the page is refreshed, the progress of the quiz will not be lost and the current question can be loaded back.
    if((questionIndex == 0) || (typeof timerInterval === 'undefined')) {    //Adding condition to check if timerInterval is undefined to handle the scenario if page is refreshed. In this case the timerInterval will become undefined. we want to resume the countdown from same place, hence, starting the timer again.
        timerInterval = setInterval(timerFunction,1000);    //Start the timer since first question is now being loaded
        sessionStorage.setItem("questionIndex",questionIndex); //Store the questionIndex if the first question is loaded
    }
    //Populating the question and options
    questionTag.textContent = questionList[questionIndex].title;
    option1Tag.textContent = "1. " + questionList[questionIndex].choices[0];
    option2Tag.textContent = "2. " + questionList[questionIndex].choices[1];
    option3Tag.textContent = "3. " + questionList[questionIndex].choices[2];
    option4Tag.textContent = "4. " + questionList[questionIndex].choices[3];
}

function checkAnswerFunction(event) {
    event.preventDefault();
    var selectedAnswerTag = event.target;
    var questionList = getSelectedQuiz();
    var questionIndex = sessionStorage.getItem("questionIndex");
    var penaltyTag = document.querySelector("#penalty-alert");

    lineTag.setAttribute("style", "display:block");                     //Display the line and the next button after an option has been selected
    nextButtonTag.setAttribute("style", "display:block");
    selectedAnswerTag.setAttribute("style", "font-weight:500;");        //Highlight the selected answer

    if(questionList[questionIndex].answer == selectedAnswerTag.textContent.substring(3)) { //Check if selected answer is the correct answer
        score+= 10;                                              //For correct answer add 10 points to score
        sessionStorage.setItem("score", score);
        answerTag.textContent = "Correct!";
        answerTag.setAttribute("style", "display:block");         //Display the "Correct!" outcome to user
        selectedAnswerTag.setAttribute("style","background-color:#90EE90"); //Indicate that selected choice is correct by making the button light green
    }
    else {
        var time = parseInt(sessionStorage.getItem("timeLeft"));
        var answer = questionList[questionIndex].answer;
        time-= 10;  
        sessionStorage.setItem("timeLeft", time);
        timeLeftTag.textContent = time.toString();                //For incorrect answer, deduct 10 seconds from timer
        selectedAnswerTag.setAttribute("style","background-color:#FFCCCB");     //Indicate that selected choice is incorrect by making the button light red
        answerTag.textContent = "Incorrect!";   
        answerTag.setAttribute("style", "display:block");         //Display the "Inorrect!" outcome to user
        
        for(var i=0; i<4; i++) {                                   //Indicate the correct answer by making it green
            if(questionList[questionIndex].answer === option1Tag.textContent.substring(3)) {
                option1Tag.setAttribute("style","background-color:#90EE90");
            }
            else if(questionList[questionIndex].answer === option2Tag.textContent.substring(3)) {
                option2Tag.setAttribute("style","background-color:#90EE90");
            }
            else if(questionList[questionIndex].answer === option3Tag.textContent.substring(3)) {
                option3Tag.setAttribute("style","background-color:#90EE90");
            }
            else if(questionList[questionIndex].answer === option4Tag.textContent.substring(3)) {
                option4Tag.setAttribute("style","background-color:#90EE90");
            }
        }

        myVar = setTimeout(function(){ penaltyTag.setAttribute("style", "display:block;")  }, 1);  //display the penalty span tag for 2 seconds alerting the user that time penalty has occured
        myVar = setTimeout(function(){ penaltyTag.setAttribute("style", "display:none;")  }, 1000); 
    }
    for (var i = 0; i < answerChoiceTag.length; i++) {          //Disable the buttons after an answer has been selected
        answerChoiceTag[i].disabled = true;
    }  
}

nextButtonTag.addEventListener("click", function(event) {
    event.preventDefault();
    var questionIndex = sessionStorage.getItem("questionIndex");
    var questionList = getSelectedQuiz();

    lineTag.setAttribute("style", "display:none");                     //Remove the line, next button and answer of question since new question will load now
    nextButtonTag.setAttribute("style", "display:none");
    answerTag.setAttribute("style", "display:none");         

    for (var i = 0; i < answerChoiceTag.length; i++) { 
        answerChoiceTag[i].setAttribute("style", "font-weight:normal;");        //Remove highlight from the previous selected answer
        answerChoiceTag[i].disabled = false;                                    //Enable the buttons for next question
    }

    questionIndex++;
    if(questionIndex >= questionList.length) {
        var time = parseInt(timeLeftTag.textContent);
        if(time > 0) {
            sessionStorage.setItem("timeLeft", time);
        }
        document.location.replace("result-page.html");                //Reached the end of the questions; redirect to result page
    }
    sessionStorage.setItem("questionIndex", questionIndex);
    loadQuestion();
});
