// Timed Trivia Questions (HW Week 5 UA Coding Bootcamp)

// create an array of questions that are objects with false and correct answers as properties of the object. How do I put this in a seperate file? note: I have attempted this.

// put the entire game into an object. Is this a good idea? Let's find out!
var theGameItself = {
// declare variables as needed to make this thing tick
        todaysQuestions: [],
// var correct answer counter
        correctAnswers: 0,
// var incorrect answer counter
        incorrectAnswers: 0,
// var unanswered questions
        unansweredQuestions: 0,
// var score (as a percentage?)
        score: 0,
// create functions that can be called to run the things the game does like especially the jQuery stuff that interacts with the DOM
        resetScore: function() {
        // reset all the game values
                this.correctAnswers = 0;
                this.incorrectAnswers = 0;
                this.unansweredQuestions = 0;
                this.score = 0;
        },
        createDivs: function() {
// This is where I create all of the html divs that will be used to display the game content. I think it's probably harder to do it this way and with no obvious advantages, but I wanted to see if it would work. See how little html I have in my index.html file! 
// every div declared
                var header = $("<div/>");
                var footer = $("<footer/>");
                var outer = $("<div/>");
                var inner = $("<div/>");
                var startGameButton = $("<button>");
// header div id and class          
                header.attr("id", "header");
                header.addClass("row justify-content-center");
                header.html("<h1>Welcome to JavaScript Trivia!</h4>");
// footer div id and class
                footer.attr("id", "footer");
                footer.addClass("row justify-content-center");
                footer.css({"position": "absolute", "bottom": "0", "width": "100%", "height": "5vh", "text-align": "center"});
                footer.html("© Copyright 2017 Jason A. Leo");
// outer div id and class
                outer.attr("id", "outer-div");
                outer.addClass("container-fluid");
// inner div id and class            
                inner.attr("id", "inner-div");
                inner.addClass("row container-fluid justify-content-center");
// start game button id and class
                startGameButton.attr("id", "start");
                startGameButton.addClass("btn btn-primary");
                startGameButton.html("START!");
// append all divs
                header.appendTo("body");
                outer.appendTo($("body"));
                footer.appendTo("body");
                inner.appendTo($(outer));
                startGameButton.appendTo(inner);
        },
// function whose job it is to initialize the game!
        gameInit: function() {
// here I copy the questions from my questionVault array (in question-vault.js) into the game file. I want to do this so I can more easily switch out the questions, even store new content in another file and link to that instead
                theGameItself.todaysQuestions = questionVault.slice();
// now it's time to set up the Document Object Model again and reset the score
                $("body").empty();
                theGameItself.createDivs();
                theGameItself.resetScore();
        },
        newQuestion: function() {
                $("#inner-div").empty();
                var index = theGameItself.todaysQuestions.indexOf(theGameItself.todaysQuestions[Math.floor(Math.random() * theGameItself.todaysQuestions.length)]);
                var questionPkg = theGameItself.todaysQuestions.splice(index, 1);
                var question = $("<div/>");
                question.attr("id", "question")
                question.attr("correct-answer", questionPkg[0].correctAnswer());
                question.attr("class", "row container-fluid justify-content-center");
                question.html(questionPkg[0].question);
                var answers = $("<div/>");
                answers.attr("class", "row container-fluid justify-content-center");
                for (var i = 0; i < questionPkg[0].answers.length; i++) {
                        var answer = $("<button>");
                        answer.attr("class", "btn btn-info")
                        answer.html(questionPkg[0].answers[i]);
                        if (questionPkg[0].answers[i] === questionPkg[0].correctAnswer()) {
                                answer.addClass("correct-answer");
                        } else {
                                answer.addClass("incorrect-answer")
                        }
                        answers.append(answer);
                }
                $("#inner-div").append(question);
                $("#inner-div").append(answers);
                console.log(theGameItself.todaysQuestions);
        },
        showCorrectAnswer: function() {
                var correctAnswer = $("#question").attr("correct-answer");
                $("#question").html("the answer is: " + correctAnswer);
                $(".incorrect-answer").remove();
        }
};
// on click event listener to start the game
$(document).on("click", "#start", function(){
        theGameItself.newQuestion();
})
// I want to set up the game itelf as simplified as possible this time so that it can by run by calling functions instead of a giant mess of code like the last game. I will need to use setTimeout and setInterval functions which are new to me so I need to keep everything as tidy as possible around that

// Lets go over the game structure itself. I imagine user will want to click a start game option first

// when start game is clicked let's have that run a function that is the game itself, perhaps inside of an object so it can refer to it's own stuff easier? or maybe as a function that calls the other functions of the game and draws information from the objects representing the game's content.

// there will now be a setTimeout called inside which we run the functions do the game stuff

// the setTimeout will be stored in a variable so it can have clearTimeout called on it by selecting an answer

// once past the timeout one way or another, we need to show the answer, and call a setTimeout on that, and we need to show if the answer was correct, thereby adding to the correct, incorrect or unanswered counters

// I'd like to pull these questions at random out of an array, with a reset function that resets the array. maybe if it pulls them out and adds them to a new array, of askedQuestions or someShit, then they can just get returned to the original array after the game is over instead of redefining the whole thing again which would also be easy though I think. function populateArray? (clears the array and fills it up with the original questions set) I do want practice though playing with arrays, so maybe I don't know whatever I'll try someShit.

// I will also say I believe it will be a nicer app, and more re-usable, the more easily I can switch out the content by which I mean the actual questions and answers.
$(document).ready(function() {
        theGameItself.gameInit();
});