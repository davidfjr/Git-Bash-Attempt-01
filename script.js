const questions = [
    {
        question: "qual sotaque moderno é o mais próximo daquele falado na Inglaterra em 1700?",
        answers: [
            { text: "Americano", correct: true },
            { text: "Britânico", correct: false }
        ],
        theAnswer: "Surpreendentemente, o sotaque americano falado hoje nos Estados Unidos é mais próximo do inglês falado na Grâ-Bretanha no ano 1700 do que o inglês britânico atual.",
    },
    {
        question: "Qual foi a primeira palavra usada para nomear o futebol?",
        answers: [
            { text: "Soccer", correct: true },
            { text: "Football", correct: false }
        ],
        theAnswer: "Sim, a primeira palavra usada foi soccer, e só depois surgiu a palavra football. E sim, foram os ingleses que criaram a palavra soccer, não os americanos.",
    },
    {
        question: "Qual a pronuncia em inglês da palavra data (que significa dados)?",
        answers: [
            { text: "Data", correct: true },
            { text: "Deita", correct: true }
        ],
        theAnswer: "Sim, as duas pronúncias estão corretas",
    },
]


const questionElement = document.querySelector(".question")
const answerButtons = document.querySelector(".answer-btns")
const NextButton = document.querySelector(".next-btn")
const answerPlaceholder = document.querySelector(".answer-placeholder")

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    NextButton.innerHTML = "NEXT"
    showQuestion()
}


function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function showAnswer(answer) {
    answerPlaceholder.innerHTML = answer
    answerPlaceholder.style.display = "block"
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    } else {
        selectedBtn.classList.add("incorrect")
    }
    showAnswer(questions[currentQuestionIndex].theAnswer)
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    })
    NextButton.style.display = "block"
}

function resetState() {
    NextButton.style.display = "none"
    answerPlaceholder.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function showScore() {
    resetState()
    questionElement.innerHTML = `You score ${score} out of ${questions.length}`
    NextButton.innerHTML = "Play again"
    NextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

NextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz()