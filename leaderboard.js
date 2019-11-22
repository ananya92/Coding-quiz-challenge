var htmlScoreDivTag = document.querySelector("#html-div");             //Select the html div tag
var cssScoreDivTag = document.querySelector("#css-div");             //Select the css div tag
var javascriptScoreDivTag = document.querySelector("#javascript-div");       //Select the javascript div tag
var backButtonTag = document.querySelector("#goback");                      //Select the back button tag
var clearHighscoresTag = document.querySelector("#clear-highscores");       //Select the clear highscore button tag

backButtonTag.addEventListener("click", function() {
    console.log("here");
    sessionStorage.clear();
    document.location.replace("index.html");                //Redirect to index.html
});
function fillLeaderboard() {
    var htmlScores = JSON.parse(localStorage.getItem("htmlQuizScores"));  //Read all the html scores stored in browser's local storage
    fillScores(htmlScores, htmlScoreDivTag);
    var cssScores = JSON.parse(localStorage.getItem("cssQuizScores"));  //Read all the html scores stored in browser's local storage
    fillScores(cssScores, cssScoreDivTag);
    var javascriptScores = JSON.parse(localStorage.getItem("javascriptQuizScores"));  //Read all the html scores stored in browser's local storage
    fillScores(javascriptScores, javascriptScoreDivTag);
}
function fillScores(userScores, divTag) {
    if(userScores != null) {
        for(var i = 0; i<userScores.length; i++) {                          
            var username = userScores[i].name;
            var score = userScores[i].score;
            var pTag = document.createElement("p");                             //Create new p tag and assign it the user's name and score
            pTag.textContent = username + " - " + score;
            pTag.setAttribute("style","background-color: #FED8B1; margin: 5px 0;");
            divTag.appendChild(pTag);                                  //append the p tag to the highscore div tag
        }
    }
    else {
        divTag.innerHTML = "";
    }
}
clearHighscoresTag.addEventListener("click", function() {
    localStorage.removeItem("htmlQuizScores");
    localStorage.removeItem("cssQuizScores");
    localStorage.removeItem("javascriptQuizScores");
    sessionStorage.clear();
    fillLeaderboard();
});


