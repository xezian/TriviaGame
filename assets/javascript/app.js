// Timed Trivia Questions (HW Week 5 UA Coding Bootcamp)

// create an array of questions that are objects with false and correct answers as properties of the object. How do I put this in a seperate file? note: I have attempted this.

// put the entire game into an object. Is this a good idea? Let's find out!
var theGameItself = {
// variables section:
        // declare variables as needed to make this thing tick
        todaysQuestions: [],
        // variable to store the number of questions
        questionsAmount: 0,
        // var correct answer counter
        correctAnswers: 0,
        // var incorrect answer counter
        incorrectAnswers: 0,
        // var unanswered questions
        unansweredQuestions: 0,
        // store a timeout in here?
        questionTime: null,
        // toggle whether or not we already guessed
        guessProhibited: false,
// funcitons section:
        // calculate the score
        score: function() {
                var percent = this.correctAnswers/this.questionsAmount;
                percent = percent * 100;
                percent = Math.round(percent, -2);
                return percent;
        },
        // function to create all of the html divs that will be used to display the game content. I think it's probably harder to do it this way and with no obvious advantages, but I wanted to see if it would work. See how little html I have in my index.html file! 
        createDivs: function() {
                // every div declared
                var header = $("<div/>");
                var footer = $("<footer/>");
                var outer = $("<div/>");
                var inner = $("<div/>");
                var topMessage = $("<div/>");
                var middleMessage = $("<div/>");
                var bottomMessage = $("<div/>");
                var imageDiv = $("<div/>");
                var scoreDiv = $("<div/>");
                var startGameButton = $("<button>");
                // header div id and class
                header
                        .attr("id", "header")
                        .addClass("row justify-content-center")
                        .html("<h1>Welcome to JavaScript Trivia!</h4>");
                // footer div id and class
                footer
                        .attr("id", "footer")
                        .addClass("row justify-content-center")
                        .css({"position": "absolute", "bottom": "0", "width": "100%", "height": "5vh", "text-align": "center"})
                        .html("© Copyright 2017 Jason A. Leo");
                // outer div id and class
                outer
                        .attr("id", "outer-div")
                        .addClass("container-fluid");
                // inner div id and class
                inner
                        .attr("id", "inner-div")
                        .addClass("row container-fluid justify-content-center");
                // message div id and class
                topMessage
                        .attr("id", "top-message")
                        .addClass("row justify-content-center")
                        .html("var jsTrivia = function() {");
                // middle message div id and class
                middleMessage
                        .attr("id", "middle-message")
                        .addClass("row justify-content-center")
                        .html(`console.log("I'm having fun!")`);
                // bottom message div id and class
                bottomMessage
                        .attr("id", "bottom-message")
                        .addClass("row justify-content-center")
                        .html("};");
                // image div id and class
                imageDiv
                        .attr("id", "image-div")
                        .addClass("row justify-content-center");
                // score div id and class
                scoreDiv
                        .attr("id", "score-div")
                        .css({"position":"absolute","top":"15vh","right":"2vw"})
                        .addClass("card");
                // start game button id and class
                startGameButton
                        .attr("id", "start")
                        .addClass("btn btn-primary")
                        .html("START!");
                // append all divs
                header.appendTo("body");
                outer.appendTo($("body"));
                footer.appendTo("body");
                topMessage.appendTo(outer);
                inner.appendTo($(outer));
                startGameButton.appendTo(inner);
                middleMessage.appendTo(outer);
                bottomMessage.appendTo(outer);
                scoreDiv.appendTo(outer);
                imageDiv.appendTo(outer);
        },
        // function whose job it is to initialize the game!
        gameInit: function() {
                // here I copy the questions from my questionVault array (in question-vault.js) into the game file. I want to do this so I can more easily switch out the questions, even store new content in another file and link to that instead
                theGameItself.todaysQuestions = questionVault.slice();
                // now it's time to set up the Document Object Model and reset the score
                $("body").empty();
                theGameItself.createDivs();
                theGameItself.resetScore();
                // on click event listener to start the game
                $(document).on("click", "#start", function(){
                        theGameItself.showQuestion();
                        theGameItself.showScore();
                });
                // on click event listener for correct guesses
                $(document).on("click", ".correct-answer", function(){
                        if (theGameItself.guessProhibited) {
                                return
                        } else {
                                theGameItself.guessAttempted();
                                $("#middle-message").html(`console.log("Correct!")`);
                                theGameItself.correctAnswers++;
                                theGameItself.showScore();
                        }
                });
                // on click event listener for incorrect guesses
                $(document).on("click", ".incorrect-answer", function(){
                        if (theGameItself.guessProhibited) {
                                return
                        } else {
                                theGameItself.guessAttempted();
                                $("#middle-message").html(`console.log("Wrong!")`);
                                theGameItself.incorrectAnswers++;
                                theGameItself.showScore();
                        }
                });
        },        
        // function to reset all the game values
        resetScore: function() {
                this.correctAnswers = 0;
                this.incorrectAnswers = 0;
                this.unansweredQuestions = 0;
        },
        // function to display or update the score
        showScore: function() {
                $("#score-div").empty();
                var title = $("<div/>");
                var body = $("<ul/>");
                var wrong = $("<li/>");
                var unanswered = $("<li/>");
                var right = $("<li/>");
                var score = $("<li/>");
                title
                        .addClass("card-title justify-content-center")
                        .html("Score:")
                        .appendTo($("#score-div"));
                body
                        .addClass("list-group list-group-flush")
                        .attr("id", "list-body")
                        .appendTo($("#score-div"));
                wrong
                        .addClass("list-group-item")
                        .html(`wrong answers: ${this.incorrectAnswers}`)
                        .appendTo("#list-body");
                unanswered
                        .addClass("list-group-item")
                        .html(`unanswered: ${this.unansweredQuestions}`)
                        .appendTo("#list-body");
                right
                        .addClass("list-group-item")
                        .html(`correct answers: ${this.correctAnswers}`)
                        .appendTo("#list-body");
                score
                        .addClass("list-group-item")
                        .html(`score: ${(this.score())}%`)
                        .appendTo("#list-body");
        },
        // function to run when you've run out of time on a question
        timesUp: function() {
                this.guessProhibited = true;
                theGameItself.showCorrectAnswer();
                $("#middle-message").html(`console.log("Time's Up!")`);
                theGameItself.unansweredQuestions++;
                theGameItself.showScore();
                setTimeout(theGameItself.showQuestion, 2500);
        },
        // function to display the correct answer when you either guess right, wrong, or run out of time
        showCorrectAnswer: function() {
                $("#image-div").empty();
                var imageUrl = $("#question").attr("image-url");
                var newImage = $("<img/>");
                newImage.attr("src", imageUrl);
                $("#question").html(`var answer = "the answer is: ${$("#question").attr("correct-answer")}`);
                $(".incorrect-answer").remove();
                setTimeout(function() {
                        $(".correct-answer").remove();
                }, 1000);
                newImage.appendTo($("#image-div"));
        },
        // function to put a new question on the screen for a given amount of time (10 secs)
        showQuestion: function() {
                theGameItself.newQuestion();
                $("#middle-message").html(`console.log("You got this.")`);
                this.questionTime = setTimeout(function() {
                        theGameItself.timesUp();
                        }, 10000);
        },
        // function to show the answer and do appropriate stuff when an answer is selected
        guessAttempted: function() {
                clearTimeout(this.questionTime);
                this.guessProhibited = true;
                theGameItself.showCorrectAnswer();
                setTimeout(theGameItself.showQuestion, 2500);
        },
        // function to draw up a new question from out of the questions array
        newQuestion: function() {
                // clear inner div
                $("#inner-div").empty();
                // add to the questionsAmount
                this.guessProhibited = false;
                this.questionsAmount++;
                // find the index of a random quesiton from the array
                var index = theGameItself.todaysQuestions.indexOf(theGameItself.todaysQuestions[Math.floor(Math.random() * theGameItself.todaysQuestions.length)]);
                // cut the question object (questionPkg) out of the array using splice
                var questionPkg = theGameItself.todaysQuestions.splice(index, 1);
                // create a div for the question
                var question = $("<div/>");
                question.attr("id", "question")
                // add a url for an image I can pull off the html object later
                question
                        .attr("correct-answer", questionPkg[0].correctAnswer())
                        .attr("image-url", questionPkg[0].image)
                        .attr("class", "row container-fluid justify-content-center")
                // display the question
                        .html(`var question = "${questionPkg[0].question}"`)
                        .appendTo($("#inner-div"));
                // for loop to create individual html elements representing the answers
                for (var i = 0; i < questionPkg[0].answers.length; i++) {
                        var answer = $("<button>");
                        answer.attr("class", "btn btn-info");
                // display the answer
                        var answers = $("<div/>");
                        answers.attr("class", "row container-fluid justify-content-center");
                        answer
                                .html(questionPkg[0].answers[i])
                                .addClass("row justify-content-center")
                                .css({"margin": "10px"});
                // if the answer is correct label it correct
                        if (questionPkg[0].answers[i] === questionPkg[0].correctAnswer()) {
                                answer.addClass("correct-answer");
                // if the answer is incorrect label it incorrect
                        } else {
                                answer.addClass("incorrect-answer");
                        }
                        answers.append(answer);
                        $("#inner-div").append(answers);
                }
                console.log(theGameItself.todaysQuestions);
        },
};
// here is where my 'theGameItself' object ends ^
// on document ready the game begins
$(document).ready(function() {
        theGameItself.gameInit();
});
// I've left these notes at the bottom so I can refer to my process in creating the above code:
// I want to set up the game itelf as simplified as possible this time so that it can by run by calling functions instead of a giant mess of code like the last game. I will need to use setTimeout and setInterval functions which are new to me so I need to keep everything as tidy as possible around that

// I'd like to pull these questions at random out of an array, with a reset function that resets the array. maybe if it pulls them out and adds them to a new array, of askedQuestions or someShit, then they can just get returned to the original array after the game is over instead of redefining the whole thing again which would also be easy though I think. function populateArray? (clears the array and fills it up with the original questions set) I do want practice though playing with arrays, so maybe I don't know whatever I'll try someShit.

// I will also say I believe it will be a nicer app, and more re-usable, the more easily I can switch out the content by which I mean the actual questions and answers.
