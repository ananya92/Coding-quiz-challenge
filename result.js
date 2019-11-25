var finalScoreTag = document.querySelector("#final-score");                 //Select the final score tag
var userNameTag = document.querySelector("#user-name");                     //Select the username tag
var submitButtonTag = document.querySelector("#submit");                    //Select the Submit button tag
var timeLeftTag = document.querySelector("#time-left");                     //Select the time left tag

submitButtonTag.addEventListener("click",function(event) {
    //Store the username and score in local storage
    event.preventDefault();
    var name = userNameTag.value;
    if(name === "") {
        name = "Player";
    }
    var userScore = {
        "name" : name,
        "score": finalScoreTag.textContent
    };
    var userScoresList;
    var selectedQuiz = sessionStorage.getItem("selectedQuiz"); //Read the quiz selection stored in the session storage

    if(selectedQuiz == "HTML Quiz") {
        userScoresList = JSON.parse(localStorage.getItem("htmlQuizScores")); //Read the HTML quiz score list
        if(userScoresList != null) {
            addInDescendingOrder(userScoresList, userScore);                //If the score list is not null, then add the new score in the descending order in the list
        }
        else {
            userScoresList = [];                                           //If score list is null, then push this score as the first score
            userScoresList.push(userScore);
        }
        localStorage.setItem("htmlQuizScores", JSON.stringify(userScoresList));
    }
    else if(selectedQuiz == "CSS Quiz") {
        userScoresList = JSON.parse(localStorage.getItem("cssQuizScores")); //Read the CSS quiz score list
        if(userScoresList != null) {
            addInDescendingOrder(userScoresList, userScore);                //If the score list is not null, then add the new score in the descending order in the list
        }
        else {
            userScoresList = [];                                           //If score list is null, then push this score as the first score
            userScoresList.push(userScore);
        }

        localStorage.setItem("cssQuizScores", JSON.stringify(userScoresList));
    }
    else if(selectedQuiz == "Javascript Quiz") {
        userScoresList = JSON.parse(localStorage.getItem("javascriptQuizScores")); //Read the Javascript quiz score list
        if(userScoresList != null) {
            addInDescendingOrder(userScoresList, userScore);                //If the score list is not null, then add the new score in the descending order in the list
        }
        else {
            userScoresList = [];                                           //If score list is null, then push this score as the first score
            userScoresList.push(userScore);
        }
        localStorage.setItem("javascriptQuizScores", JSON.stringify(userScoresList));
    } 
    document.location.replace("leaderboard.html");                //Redirect to leaderboard page
});                  

function addInDescendingOrder(userScoresList, userScore) {      //this function ensures that new score is added in descending order in the score list
    var index=0;
    for(var i=0; i<userScoresList.length; i++) {
        if(parseInt(userScoresList[i].score) < parseInt(userScore.score)) {        //when score in the list is less than the current score, then break out of the loop
            break;
        }
        else {
            index++;
        }
    }
    userScoresList.splice(index,0,userScore);                   //add the new score at this index using splice function
}

function loadResult() {
    var timeLeft = parseInt(sessionStorage.getItem("timeLeft"));
    var finalScore = parseInt(sessionStorage.getItem("score")) + timeLeft;
    timeLeftTag.textContent = timeLeft.toString();
    finalScoreTag.textContent = finalScore.toString();         //Set the final score by retriving it from session storage
}
