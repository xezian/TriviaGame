// Timed Trivia Questions (HW Week 5 UA Coding Bootcamp)

// create an array of questions that are objects with false and correct answers as properties of the object

// declare variables as needed to make this thing tick

// var correct answer counter

// var incorrect answer counter

// var unanswered questions

// var score (as a percentage?)

// create functions that can be called to run the things the game does like especially the jQuery stuff that interacts with the DOM

// put the game itself into an object? Is this a good idea? look at some examples first

// I want to set up the game itelf as simplified as possible this time so that it can by run by calling functions instead of a giant mess of code like the last game. I will need to use setTimeout and setInterval functions which are new to me so I need to keep everything as tidy as possible around that

// Lets go over the game structure itself. I imagine user will want to click a start game option first

// when start game is clicked let's have that run a function that is the game itself, perhaps inside of an object so it can refer to it's own stuff easier? or maybe as a function that calls the other functions of the game and draws information from the objects representing the game's content.

// there will now be a setTimeout called inside which we run the functions do the game stuff

// the setTimeout will be stored in a variable so it can have clearTimeout called on it by selecting an answer

// once past the timeout one way or another, we need to show the answer, and call a setTimeout on that, and we need to show if the answer was correct, thereby adding to the correct, incorrect or unanswered counters

// I'd like to pull these questions at random out of an array, with a reset function that resets the array. maybe if it pulls them out and adds them to a new array, of askedQuestions or someShit, then they can just get returned to the original array after the game is over instead of redefining the whole thing again which would also be easy though I think. function populateArray? (clears the array and fills it up with the original questions set) I do want practice though playing with arrays, so maybe I don't know whatever I'll try someShit.

// I will also say I believe it will be a nicer app, and more re-usable, the more easily I can switch out the content by which I mean the actual questions and answers.