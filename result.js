var finalScoreTag = document.querySelector("#final-score");                 //Select the final score tag
var userNameTag = document.querySelector("#user-name");                     //Select the username tag
var submitButtonTag = document.querySelector("#submit");                    //Select the Submit button tag
var htmlScoreDivTag = document.querySelector("#html-div");             //Select the html div tag
var cssScoreDivTag = document.querySelector("#css-div");             //Select the css div tag
var javascriptScoreDivTag = document.querySelector("#javascript-div");       //Select the javascript div tag
var backButtonTag = document.querySelector("#goback");                      //Select the back button tag
var clearHighscoresTag = document.querySelector("#clear-highscores");       //Select the clear highscore button tag

submitButtonTag.addEventListener("click",function(event) {
    //Store the username and score in local storage
    event.preventDefault();
    var userScore = {
        "name" : userNameTag.value,
        "score": finalScoreTag.textContent
    };
    var userScoresList;
    var selectedQuiz = sessionStorage.getItem("selectedQuiz"); //Read the quiz selection stored in the session storage
    if(selectedQuiz == "HTML Quiz") {
        userScoresList = JSON.parse(localStorage.getItem("htmlQuizScores")); //Read the HTML quiz score list
        (userScoresList != null) ? userScoresList.push(userScore) : userScoresList = [userScore];
        localStorage.setItem("htmlQuizScores", JSON.stringify(userScoresList));
    }
    else if(selectedQuiz == "CSS Quiz") {
        userScoresList = JSON.parse(localStorage.getItem("cssQuizScores")); //Read the CSS quiz score list
        (userScoresList != null) ? userScoresList.push(userScore) : userScoresList = [userScore];
        localStorage.setItem("cssQuizScores", JSON.stringify(userScoresList));
    }
    else if(selectedQuiz == "Javascript Quiz") {
        userScoresList = JSON.parse(localStorage.getItem("javascriptQuizScores")); //Read the Javascript quiz score list
        (userScoresList != null) ? userScoresList.push(userScore) : userScoresList = [userScore];
        localStorage.setItem("javascriptQuizScores", JSON.stringify(userScoresList));
    } 
    document.location.replace("leaderboard.html");                //Redirect to leaderboard page
});                  

function loadResult() {
    var finalScore = parseInt(sessionStorage.getItem("score")) + parseInt(sessionStorage.getItem("timeLeft"));
    finalScoreTag.textContent = finalScore.toString();         //Set the final score by retriving it from session storage
}
