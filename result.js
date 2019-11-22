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
        //If user score list is null then assign this score as its first score else if it is not null then call addInDescendingOrder function to insert this score in its correct order from highest to lowest
        (userScoresList != null) ? addInDescendingOrder(userScoresList, userScore) : userScoresList = [userScore];
        localStorage.setItem("htmlQuizScores", JSON.stringify(userScoresList));
    }
    else if(selectedQuiz == "CSS Quiz") {
        userScoresList = JSON.parse(localStorage.getItem("cssQuizScores")); //Read the CSS quiz score list
        (userScoresList != null) ? addInDescendingOrder(userScoresList, userScore) : userScoresList = [userScore];
        localStorage.setItem("cssQuizScores", JSON.stringify(userScoresList));
    }
    else if(selectedQuiz == "Javascript Quiz") {
        userScoresList = JSON.parse(localStorage.getItem("javascriptQuizScores")); //Read the Javascript quiz score list
        (userScoresList != null) ? addInDescendingOrder(userScoresList, userScore) : userScoresList = [userScore];
        localStorage.setItem("javascriptQuizScores", JSON.stringify(userScoresList));
    } 
    document.location.replace("leaderboard.html");                //Redirect to leaderboard page
});                  
function addInDescendingOrder(userScoresList, userScore) {      //this function ensures that new score is added in descending order in the score list
    var index = 0;
    for(var i=0; i<userScoresList.length; i++) {
        if(parseInt(userScoresList[i].score) < parseInt(userScore.score)) {
            index = i;                                          //when score in the list is less than the current score, then break out of the loop
            break;
        }
    }
    userScoresList.splice(index,0,userScore);                   //add the new score at this index using splice function
}
function loadResult() {
    var finalScore = parseInt(sessionStorage.getItem("score")) + parseInt(sessionStorage.getItem("timeLeft"));
    finalScoreTag.textContent = finalScore.toString();         //Set the final score by retriving it from session storage
}

function fillLeaderboard() {
    var htmlScores = JSON.parse(localStorage.getItem("htmlQuizScores"));  //Read all the html scores stored in browser's local storage
    fillScores(htmlScores, htmlScoreDivTag);
    var cssScores = JSON.parse(localStorage.getItem("cssQuizScores"));  //Read all the html scores stored in browser's local storage
    fillScores(cssScores, cssScoreDivTag);
    var javascriptScores = JSON.parse(localStorage.getItem("javascriptQuizScores"));  //Read all the html scores stored in browser's local storage
    fillScores(javascriptScores, javascriptScoreDivTag);
}
function fillScores(userScores, divTag) {
    for(var i = 0; i<userScores.length; i++) {                          
        var username = userScores[i].name;
        var score = userScores[i].score;
        var pTag = document.createElement("p");                             //Create new p tag and assign it the user's name and score
        pTag.textContent = username + " - " + score;
        pTag.setAttribute("style","background-color: #FED8B1; margin: 5px 0;");
        divTag.appendChild(pTag);                                  //append the p tag to the highscore div tag
    }
}

