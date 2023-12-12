
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
        question: "What is the RGB color model?",
        options: ["Red, Green, Blue", "Realistic, Grayscale, Black", "Rainbow, Gold, Brown", "Rapid, Green, Bronze"],
        correct: "Red, Green, Blue",
    },
    {
        id: "1",
        question: "Which color model is often used in printing?",
        options: ["CMYK", "RGB", "HSB", "PMS"],
        correct: "CMYK",
    },
    {
        id: "2",
        question: "In the HSL color model, what does 'L' stand for?",
        options: ["Lightness", "Luminosity", "Lemon", "Lavender"],
        correct: "Lightness",
    },
    {
        id: "3",
        question: "What is the purpose of the HEX color code in web design?",
        options: ["To represent numerical values", "To specify colors with red, green, blue values", "To create hyperlinks", "To identify web browsers"],
        correct: "To specify colors with red, green, blue values",
    },
    {
        id: "4",
        question: "Which color model is based on the opponent process theory of color vision?",
        options: ["CMYK", "RGB", "HSB", "Lab"],
        correct: "Lab",
    },
    {
        id: "5",
        question: "What is the purpose of the Pantone Matching System (PMS) in graphic design?",
        options: ["To specify colors for printing", "To create digital artwork", "To design logos", "To choose fonts"],
        correct: "To specify colors for printing",
    },
    {
        id: "6",
        question: "What does the acronym RGBA stand for in the context of web development?",
        options: ["Red, Green, Blue, Alpha", "Really Good Browser Architecture", "Raster Graphics Bitmap Algorithm", "Responsive Grid-Based Application"],
        correct: "Red, Green, Blue, Alpha",
    },
    {
        id: "7",
        question: "Which color model is often used to represent images in the human vision system?",
        options: ["LMS (Long, Medium, Short)", "RGB", "CMYK", "Hexachrome"],
        correct: "LMS (Long, Medium, Short)",
    },
    {
        id: "8",
        question: "What does the 'K' stand for in the CMYK color model?",
        options: ["Key", "Kind", "Kaleidoscope", "Krypton"],
        correct: "Key",
    },
    {
        id: "9",
        question: "Which color space is commonly used for displaying images on electronic devices?",
        options: ["sRGB", "Adobe RGB", "ProPhoto RGB", "Rec. 709"],
        correct: "sRGB",
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