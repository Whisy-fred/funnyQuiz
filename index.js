const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("results-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("questions-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionspan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScroreSpan = document.getElementById("max-scrore");
const resultsMessage = document.getElementById("results-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
   {
    question: "What is the capital of france",
    answer: [
        {text: "London", correct: false},
        {text: "Berlin", correct: false},
        {text: "Paris", correct: true},
        {text: "Madird", correct: false}
    ],
   },

   {
    question: "What planet is called the red planet",
    answer: [
        {text: "Earth", correct: false},
        {text: "neptune", correct: false},
        {text: "jupiter", correct: false},
        {text: "mars", correct: true}
    ],
   },

   {
    question: "Which of these is not a programming language?",
    answer: [
        {text: "java", correct: false},
        {text: "python", correct: false},
        {text: "banana", correct: true},
        {text: "javascript", correct: false}
    ],
   },

   {
    question: "What is your name",
    answer: [
        {text: "john Doe", correct: true},
        {text: "girl", correct: false},
        {text: "man", correct: false},
        {text: "none of the above", correct: true}
    ],
   },

   {
    question: "What is the chemical symbol for gold?",
    answer: [
        {text: "Go", correct: false},
        {text: "Gd", correct: false},
        {text: "Au", correct: true},
        {text: "Ag", correct: false}
    ],
   },
{
    question: "Which country is the giant of africa",
    answer: [
        {text: "south africa", correct: false},
        {text: "Niger", correct: false},
        {text: "Nigeria", correct: true},
        {text: "Cameroon", correct: false}
    ],
   },



];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionspan.textContent = quizQuestions.length;
maxScroreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
   currentQuestionIndex = 0;
   score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
     
     
    
}
function  showQuestion() {
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex]; 

    currentQuestionSpan.textContent = currentQuestionIndex  + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%" ;
    questionText.textContent = currentQuestion.question;

     answersContainer.innerHTML = "";

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn", "answer-container");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
   

}

function selectAnswer(event) {
    if (answersDisabled) return;
        
   answersDisabled  = true;

   const selectedButton = event.target;
   const isCorrect = selectedButton.dataset.correct === "true" ;

   Array.from(answersContainer.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct"); 
        
      } else if (button === selectedButton) {
         button.classList.add("incorrect"); 
      }
   });

   if (isCorrect) {
      score++;
      scoreSpan.textContent = score;
   }

   setTimeout( () =>{
    currentQuestionIndex++;
     
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion()
    } else{
        showResults()
    }
   }, 1000);
};

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    if (percentage === 100) {
        resultsMessage.textContent = "Perfect! you're a genius!";
    } 
    else if (percentage >= 80) {
        resultsMessage.textContent = "bravo ";
    }
    else if (percentage >= 60) {
        resultsMessage.textContent = "good effort! keep learning";
    }
    else if (percentage >= 40) {
        resultsMessage.textContent = "very bad try better next time";
    }
    else if (percentage >= 20) {
        resultsMessage.textContent = "you mum would be dissapointed in you";
    }
    else  {
        resultsMessage.textContent = "you are so dumb!";
    }

}  

function restartQuiz() {
   resultScreen.classList.remove("active");

   startQuiz();
    
}