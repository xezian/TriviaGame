var questionVault = [
        {
            question: "Who wrote the first version of JavaScript?",
            answers: ["Peter Dinklage", "Mary Poppins", "Brendan Eich", "Benjamin Franklin"],
            correctAnswer: function() {
                return this.answers[2];
            },
            image: "assets/images/eich.jpg",
            alternate: "Picture of Brendan Eich"
        },
        {
            question: "Which one will return a random number between greater than or equal to zero and less than 10?",
            answers: ["Math.floor(Math.random() * 10)", "Math.ceil(Math.random() * 10)", "Math.floor(Math.random(0,10))", "Math.random(10)"],
            correctAnswer: function() {
                return this.answers[0];
            },
            image: "assets/images/dice.jpg",
            alternate: "Picture of the original random number generators"
        },
        {
            question: "What is the name JavaScript went by during development?",
            answers: ["ProtoScript", "CoffeeBuzz", "Mocha", "Netscape"],
            correctAnswer: function() {
                return this.answers[2];
            },
            image: "assets/images/mocha.jpg",
            alternate: "Picture of a mocha latte"
        },
        {
            question: "In how much time was the first version of JavaScript developed?",
            answers: ["101 Days", "12 Weeks", "A Fortnight", "10 Days"],
            correctAnswer: function() {
                return this.answers[3];
            },
            image: "assets/images/time-is-money.jpg",
            alternate: "Picture representing a short amount of time"
        },
        {
            question: "What is the ternary operator in JavaScript?",
            answers: ["( x ? y : z )", "(`[ x $ y ~ z ]`)", "(x) ? (y) : (z)", "y if x else z"],
            correctAnswer: function() {
                return this.answers[0];
            },
            image: "assets/images/ternaryoperator.jpg",
            alternate: "Ternary operator pun"
        },
        {
            question: "Which one is known as the Standard for JavaScript?",
            answers: ["jQuery", "ECMAScript", "Python", "CoffeeScript"],
            correctAnswer: function() {
                return this.answers[1];
            },
            image: "assets/images/First_Web_Server.jpg",
            alternate: "First Web Server"
        },
        {
            question: "What does ECMA stand for?",
            answers: ["Extra Classy Magical Articulator", "European Computer Manufacturer's Association", "Essential Convenience Making Administration", "Easier Code Means Action"],
            correctAnswer: function() {
                return this.answers[1];
            },
            image: "assets/images/europe.png",
            alternate: "Europe"
        },
        {
            question: "What is a recursive function?",
            answers: ["A function that refers to another function inside itself", "A function that can be found multiple times in the same program", "A function where the code block is placed before the variable is declared", "A function that calls itself until it does not"],
            correctAnswer: function() {
                return this.answers[3];
            },
            image: "assets/images/recursiveswan.jpg",
            alternate: "Picture of a swan with a twisted neck"
        },
        {
            question: "What is the syntax in JavaScript for writing single line comments that are not read by the interpreter?",
            answers: ["\\\\ comment ", "<!-- comment -->", "// comment", "!~ comment"],
            correctAnswer: function() {
                return this.answers[2];
            },
            image: "assets/images/comment.png",
            alternate: "no comment"
        },
        {
            question: "What is the value type of greatIdeas in: var greatIdeas = [];",
            answers: ["Array", "Function", "List", "Object"],
            correctAnswer: function() {
                return this.answers[0];
            },
            image: "assets/images/arrayofbirds.jpg",
            alternate: "An array of birds"
        },
        {
            question: "What is the value type of weirdIdeas in: var weirdIdeas = {};",
            answers: ["Function", "Array", "Operator", "Object"],
            correctAnswer: function() {
                return this.answers[3];
            },
            image: "assets/images/Copper_object.jpg",
            alternate: "A copper object"
        },
        {
            question: "How old is JavaScript (as of Nov, 2017)?",
            answers: ["7 Years", "11 Years", "22 Years", "33 Years"],
            correctAnswer: function() {
                return this.answers[2];
            },
            image: "assets/images/Avocado_toast.jpg",
            alternate: "Picture of avocado toast"
        },
        {
            question: "Which comapny currently manages JavaScript (Nov, 2017)",
            answers: ["Mozilla", "Google", "Apple", "Microsoft"],
            correctAnswer: function() {
                return this.answers[0];
            },
            image: "assets/images/firefox.jpg",
            alternate: "Cool Firefox picture"
        },
        {
            question: "In JavaScript, what is the value type of NaN (Not a Number)?",
            answers: ["Boolean", "Number", "Null", "Operator"],
            correctAnswer: function() {
                return this.answers[1];
            },
            image: "assets/images/number.jpg",
            alternate: "A picture of a number"
        },
        {
            question: "Which uses the correct filename extension for a JavaScript file?",
            answers: ["example.jav", "example.jsc", "example.java", "example.js"],
            correctAnswer: function() {
                return this.answers[3];
            },
            image: "assets/images/js.jpg",
            alternate: ".js"
        },
        {
            question: "What will this statement print to the console: console.log([]+(-~{}-~{}-~{}-~{})+(-~{}-~{}));",
            answers: ["undefined", "42", "-1", "Unknown Syntax Error"],
            correctAnswer: function() {
                return this.answers[1];
            },
            image: "assets/images/dont-panic.jpg",
            alternate: "Don't Panic"
        },
        {
            question: "What is referred to by the term 'Vanilla JavaScript'?",
            answers: ["JavaScript unsupplemented by any frameworks", "A 'Lite' version of JavaScript that is easier to learn but less powerful", "A JavaScript framework that offers many basic functions to beginning programmers", "A flavor of Ice Cream named after JavaScript which is basically vanilla with curly brackets"],
            correctAnswer: function() {
                return this.answers[0];
            },
            image: "assets/images/vanilla.jpg",
            alternate: "Picture of Vanilla Iced Cream"
        },
    ]