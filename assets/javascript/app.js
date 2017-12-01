// Timed Trivia Questions (HW Week 5 UA Coding Bootcamp)

// create an array of questions that are objects with false and correct answers as properties of the object. How do I put this in a seperate file? note: I have attempted this.

// music 
var gameMusic = new Audio("assets/sounds/strange-noises.mp3");
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
        // fun with colors
        colorChoices: ["pink", "orange", "green", "yellow", "red", "white", "blue", "turquise", "black"],
// functions section:
        // calculate the score
        calculateScore: function() {
                var percent = this.correctAnswers/this.questionsAmount;
                percent = percent * 100;
                // ?? tried to make this give us a percent to the 100th place, like 77.74% for example, with (percent, -2) but it didn't work.
                percent = Math.floor(percent);
                return percent;
        },
        // function to create all of the html divs that will be used to display the game content. I think it's probably harder to do it this way and with no obvious advantages, but I wanted to see if it would work. See how little html I have in my index.html file! 
        createDivs: function() {
                // every div declared
                var header = $("<header/>");
                var footer = $("<footer/>");
                var outer = $("<div/>");
                var inner = $("<div/>");
                var topMessage = $("<div/>");
                var middleMessage = $("<div/>");
                var bottomMessage = $("<div/>");
                var imageDiv = $("<div/>");
                var scoreDiv = $("<div/>");
                var startGameButton = $("<button>");
                // randoColors for elements
                var headerFooter = theGameItself.randoColor();
                var outerColor = theGameItself.randoColor();
                var innerColor = theGameItself.randoColor();
                var startButtonColor = theGameItself.randoColor();
                var bodyColor = theGameItself.randoColor();
                var scoreColor = theGameItself.randoColor();
                // header div id and class
                header
                        .attr("id", "header")
                        .addClass(`row justify-content-center ${headerFooter}`)
                        .html("<h1>Welcome to JavaScript Trivia!</h1>");
                // footer div id and class
                footer
                        .attr("id", "footer")
                        .addClass(`row justify-content-center ${headerFooter}`)
                        .css({"position": "absolute", "bottom": "0", "width": "100%", "height": "5vh", "text-align": "center"})
                        .html("© Copyright 2017 Jason A. Leo");
                // outer div id and class
                outer
                        .attr("id", "outer-div")
                        .addClass(`container-fluid ${outerColor}`);
                // inner div id and class
                inner
                        .attr("id", "inner-div")
                        .addClass(`row container-fluid justify-content-center ${innerColor}`);
                // message div id and class
                topMessage
                        .attr("id", "top-message")
                        .addClass(`row justify-content-center ${innerColor}`)
                        .html("var jsTrivia = function() {");
                // middle message div id and class
                middleMessage
                        .attr("id", "middle-message")
                        .addClass(`row justify-content-center ${innerColor}`)
                        .html(`console.log("Let's have some fun!")`);
                // bottom message div id and class
                bottomMessage
                        .attr("id", "bottom-message")
                        .addClass(`row justify-content-center ${innerColor}`)
                        .html("};");
                // image div id and class
                imageDiv
                        .attr("id", "image-div")
                        .addClass(`row justify-content-center`);
                // score div id and class
                scoreDiv
                        .attr("id", "score-div")
                        .css({"position":"absolute","top":"15vh","right":"2vw"})
                        .addClass(`card ${scoreColor}`);
                // start game button id and class
                startGameButton
                        .attr("id", "start")
                        .addClass(`btn ${startButtonColor}`)
                        .html("START!");
                // set body color
                $("body").addClass(bodyColor);
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
        // function to make sounds
        // TODO * MUSIC * start screen music default muted (a button for that will need to be created)
        makeSounds: function() {
                gameMusic.autoplay = true;
                gameMusic.muted  = true;
                var soundButton = $("<button>");
                soundButton
                        .addClass(`btn ${theGameItself.randoColor()} sound-button`)
                        .text("MUSIC")
                        .css({"position":"absolute","right": "2vw"});
                $("#footer").append(soundButton);
        },
        // function whose job it is to initialize the game!
        gameInit: function() {
                // here I copy the questions from my questionVault array (in question-vault.js) into the game file. I want to do this so I can more easily switch out the questions, even store new content in another file and link to that instead
                theGameItself.todaysQuestions = questionVault.slice();
                // now it's time to set up the Document Object Model and reset the score
                $("body").empty();
                theGameItself.createDivs();
                theGameItself.resetScore();
                theGameItself.gameActions();
                theGameItself.makeSounds();
        },
        gameActions: function() {
                // event click listener to handle un-muting and muting
                $(document).on("click", ".sound-button", function() {
                        if (gameMusic.muted) {
                                $(this).text("MUTE");
                                gameMusic.muted = false;
                        } else {
                                $(this).text("MUSIC");
                                gameMusic.muted = true;
                        }
                });
                // on click event listener to start the game
                $(document).on("click", "#start", function(){
                        $("#header").html("<h3>Give it your best shot!</h3>");
                        theGameItself.showQuestion();
                        theGameItself.showScore();
                });
                // on click event listener to start the game
                $(document).on("click", "#start-over", function(){
                        theGameItself.gameInit();
                });
                // on click event listener for correct guesses
                $(document).on("click", ".correct-answer", function(){
                        if (theGameItself.guessProhibited) {
                                return
                        } else {
                                $("#header").empty();
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
                                $("#header").empty();
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
                var scoreColorOne = theGameItself.randoColor();
                var scoreColorTwo = theGameItself.randoColor();
                title
                        .addClass("card-title row justify-content-center")
                        .html("Score:")
                        .appendTo($("#score-div"));
                body
                        .addClass(`list-group list-group-flush`)
                        .attr("id", "list-body")
                        .appendTo($("#score-div"));
                wrong
                        .addClass(`list-group-item ${scoreColorOne}`)
                        .html(`wrong answers: ${this.incorrectAnswers}`)
                        .appendTo("#list-body");
                unanswered
                        .addClass(`list-group-item ${scoreColorTwo}`)
                        .html(`unanswered: ${this.unansweredQuestions}`)
                        .appendTo("#list-body");
                right
                        .addClass(`list-group-item ${scoreColorOne}`)
                        .html(`correct answers: ${this.correctAnswers}`)
                        .appendTo("#list-body");
                score
                        .addClass(`list-group-item ${scoreColorTwo}`)
                        .html(`score: ${this.calculateScore()}%`)
                        .appendTo("#list-body");
        },
        // function to run when you've run out of time on a question
        timesUp: function() {
                this.guessProhibited = true;
                theGameItself.showCorrectAnswer();
                $("#middle-message").html(`console.log("Time's Up!")`);
                theGameItself.unansweredQuestions++;
                theGameItself.showScore();
                window.setTimeout(theGameItself.showQuestion, 2500);
        },
        // function to display the correct answer when you either guess right, wrong, or run out of time
        showCorrectAnswer: function() {
                $("#image-div").empty();
                var colorTime = theGameItself.randoColor();
                var imageUrl = $("#question").attr("image-url");
                var imageAlt = $("#question").attr("image-alt");
                var newImage = $("<img/>");
                newImage.attr("src", imageUrl)
                        .attr("alt", imageAlt)
                        .attr("class", `image-fluid ${colorTime}`);
                $("#question").html(`var answer = "the answer is: ${$("#question").attr("correct-answer")}`);
                $(".incorrect-answer").remove();
                window.setTimeout(function() {
                        $(".correct-answer").remove();
                }, 1500);
                newImage.appendTo($("#image-div"));
        },
        // function to put a new question on the screen for a given amount of time (10 secs)
        showQuestion: function() {
                if (theGameItself.todaysQuestions.length <= 0) {
                        var startOver = $("<button/>");
                        startOver
                                .attr("id", "start-over")
                                .addClass(`btn ${theGameItself.randoColor()}`)
                                .html("Start Over?")
                                .appendTo("#inner-div");
                        $("#middle-message").html(`console.log("There's no more questions!")`)         
                } else {
                        theGameItself.newQuestion();
                        $("#middle-message").html(`console.log("You got this.")`);
                        theGameItself.questionTime = window.setTimeout(theGameItself.timesUp, 15000);
                };
        },
        // function to show the answer and do appropriate stuff when an answer is selected
        guessAttempted: function() {
                window.clearTimeout(theGameItself.questionTime);
                this.guessProhibited = true;
                theGameItself.showCorrectAnswer();
                window.setTimeout(theGameItself.showQuestion, 3500);
        },
        // function to select a random color
        randoColor: function() {
                 return theGameItself.colorChoices[Math.floor(Math.random() * theGameItself.colorChoices.length)];
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
                question
                        .attr("id", "question")
                        .attr("correct-answer", questionPkg[0].correctAnswer())
                // add a url for an image I can pull off the html object later
                        .attr("image-url", questionPkg[0].image)
                        .attr("image-alt", questionPkg[0].alternate)
                        .attr("class", `row justify-content-center`)
                // display the question
                        .html(`var question = "${questionPkg[0].question}"`)
                        .appendTo($("#inner-div"));
                // for loop to create individual html elements representing the answers
                for (var i = 0; i < questionPkg[0].answers.length; i++) {
                        var buttonColor = theGameItself.randoColor();
                        var answer = $("<button>");
                        answer.attr("class", `btn ${buttonColor}`);
                // display the answer
                        var answers = $("<div/>");
                        answers.attr("class", "row container-fluid justify-content-center");
                        answer
                                .text(questionPkg[0].answers[i])
                                .addClass("row justify-content-center")
                                .css({"margin": "10px"});
                // if the answer is correct label it correct
                        if (questionPkg[0].answers[i] === questionPkg[0].correctAnswer()) {
                                answer.addClass("correct-answer");
                // if the answer is incorrect label it incorrect
                        } else {
                                answer.addClass("incorrect-answer");
                        }                        
                        answers.append(answer)
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
// Things to still do: 
// DONE! add all the images to the appropriate project folder and add they path to the question objects
// DONE! add the alt to the image elements with jQ$
// DONE! style out the divs a little more so they actually look nice (through jQuery or maybe just with CSS)
// add a countdown that shows how much time is left
// add music that plays and sounds when you click the buttons
// DONE! make the buttons select random colors
// TRIED! make the answer buttons appear in a random order (prepend/append?)

// I've left these notes at the bottom so I can refer to my process in creating the above code:
// I want to set up the game itelf as simplified as possible this time so that it can by run by calling functions instead of a giant mess of code like the last game. I will need to use window.setTimeout and window.setInterval functions which are new to me so I need to keep everything as tidy as possible around that
// I'd like to pull these questions at random out of an array, with a reset function that resets the array. maybe if it pulls them out and adds them to a new array, of askedQuestions or someShit, then they can just get returned to the original array after the game is over instead of redefining the whole thing again which would also be easy though I think. function populateArray? (clears the array and fills it up with the original questions set) I do want practice though playing with arrays, so maybe I don't know whatever I'll try someShit.
// I will also say I believe it will be a nicer app, and more re-usable, the more easily I can switch out the content by which I mean the actual questions and answers.
