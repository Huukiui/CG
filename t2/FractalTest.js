
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;



const quizArray = [
    {
        id: "0",
        question: "What is a fractal?",
        options: ["A type of geometric shape", "A programming language", "A musical instrument", "A cooking technique"],
        correct: "A type of geometric shape",
    },
    {
        id: "1",
        question: "Who coined the term 'fractal' and is considered the father of fractal geometry?",
        options: ["Leonhard Euler", "Isaac Newton", "Benoit B. Mandelbrot", "Euclid"],
        correct: "Benoit B. Mandelbrot",
    },
    {
        id: "2",
        question: "What is the most famous fractal that is often associated with the Mandelbrot Set?",
        options: ["Koch Snowflake", "Sierpinski Triangle", "Cantor Set", "Mandelbrot Set"],
        correct: "Mandelbrot Set",
    },
    {
        id: "3",
        question: "Which mathematical concept is central to the creation of fractals?",
        options: ["Calculus", "Algebra", "Geometry", "Trigonometry"],
        correct: "Iterative processes",
    },
    {
        id: "4",
        question: "In the context of fractals, what does 'self-similarity' refer to?",
        options: ["Being identical at all scales", "Being asymmetrical", "Having a single shape", "Having a finite boundary"],
        correct: "Being identical at all scales",
    },
    {
        id: "5",
        question: "Which artist popularized the use of fractals in visual arts during the 1970s and 1980s?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Jackson Pollock", "Benoit B. Mandelbrot"],
        correct: "Benoit B. Mandelbrot",
    },
    {
        id: "6",
        question: "What is the Julia Set in the context of fractals?",
        options: ["A famous painting", "A type of fractal", "A mathematical constant", "A programming language"],
        correct: "A type of fractal",
    },
    {
        id: "7",
        question: "Which of the following statements about fractals is true?",
        options: ["Fractals only exist in the digital realm", "Fractals have a finite perimeter", "Fractals are exclusive to mathematics", "Fractals can be found in nature"],
        correct: "Fractals can be found in nature",
    },
    {
        id: "8",
        question: "What is the 'escape time' in the context of fractal rendering algorithms?",
        options: ["The time it takes to create a fractal", "The time it takes for a computation to 'escape' a specified range", "The time it takes for a fractal to become popular", "The time it takes for a fractal to lose its detail"],
        correct: "The time it takes for a computation to 'escape' a specified range",
    },
    {
        id: "9",
        question: "Which of the following software is commonly used for generating and exploring fractals?",
        options: ["Microsoft Excel", "Adobe Photoshop", "Fractal Explorer", "AutoCAD"],
        correct: "Fractal Explorer",
    },
];


restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});


nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        questionCount += 1;
        if (questionCount == quizArray.length) {
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};