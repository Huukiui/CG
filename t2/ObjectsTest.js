
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
        question: "What is an affine transformation in computer graphics?",
        options: [
            "A transformation that preserves collinearity and ratios of distances between points",
            "A transformation that rotates an object around a fixed point",
            "A transformation that changes the size of an object without preserving angles",
            "A transformation that skews or distorts an object"
        ],
        correct: "A transformation that preserves collinearity and ratios of distances between points",
    },
    {
        id: "1",
        question: "In 2D graphics, what are the basic components of an affine transformation matrix?",
        options: [
            "Translation, rotation, and scaling",
            "Shearing, reflection, and projection",
            "Zooming, cropping, and flipping",
            "Compression, expansion, and inversion"
        ],
        correct: "Translation, rotation, and scaling",
    },
    {
        id: "2",
        question: "How does an affine transformation differ from a projective transformation?",
        options: [
            "An affine transformation preserves parallel lines, while a projective transformation does not",
            "An affine transformation can only scale uniformly, while a projective transformation can scale non-uniformly",
            "An affine transformation always involves rotation, while a projective transformation does not",
            "An affine transformation is only applicable to 3D graphics, while a projective transformation is for 2D graphics"
        ],
        correct: "An affine transformation preserves parallel lines, while a projective transformation does not",
    },
    {
        id: "3",
        question: "What is the role of the translation matrix in an affine transformation?",
        options: [
            "It rotates an object around a fixed point",
            "It changes the size of an object without preserving angles",
            "It skews or distorts an object",
            "It shifts an object's position without changing its shape or orientation"
        ],
        correct: "It shifts an object's position without changing its shape or orientation",
    },
    {
        id: "4",
        question: "How can affine transformations be used in computer animation?",
        options: [
            "To create realistic lighting effects",
            "To simulate fluid dynamics",
            "To transform and animate 2D and 3D objects",
            "To compress and decompress image files"
        ],
        correct: "To transform and animate 2D and 3D objects",
    },
    {
        id: "5",
        question: "What is the importance of matrices in representing affine transformations?",
        options: [
            "Matrices are not used in affine transformations",
            "Matrices simplify the representation of complex transformations",
            "Matrices are only used in 3D graphics",
            "Matrices are used only for scaling operations"
        ],
        correct: "Matrices simplify the representation of complex transformations",
    },
    {
        id: "6",
        question: "How do affine transformations contribute to computer graphics rendering?",
        options: [
            "They have no impact on rendering",
            "They improve the performance of rendering algorithms",
            "They are only used in ray tracing",
            "They define the placement and orientation of objects in a scene"
        ],
        correct: "They define the placement and orientation of objects in a scene",
    },
    {
        id: "7",
        question: "In computer vision, how are affine transformations used for image registration?",
        options: [
            "To create artistic filters for images",
            "To align and overlay images from different sources",
            "To compress image data for storage",
            "To generate random patterns in images"
        ],
        correct: "To align and overlay images from different sources",
    },
    {
        id: "8",
        question: "What is the concept of homography in the context of affine transformations?",
        options: [
            "Homography refers to the study of 2D shapes",
            "Homography is synonymous with scaling in computer graphics",
            "Homography is a type of affine transformation that preserves straight lines",
            "Homography is not related to affine transformations"
        ],
        correct: "Homography is a type of affine transformation that preserves straight lines",
    },
    {
        id: "9",
        question: "How can affine transformations be applied to achieve texture mapping in computer graphics?",
        options: [
            "They cannot be used for texture mapping",
            "By distorting the texture coordinates of an object",
            "By ignoring textures in the rendering process",
            "By converting textures into grayscale"
        ],
        correct: "By distorting the texture coordinates of an object",
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