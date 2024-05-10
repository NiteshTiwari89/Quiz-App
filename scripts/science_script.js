const questions = [
    {
        question:"Which star is the closest to planet Earth?",
        answers:[
            {text:"Proxima Centauri", correct : "false"},
            {text:"Sirius", correct : "false"},
            {text:"Alpha Centauri", correct : "false"},
            {text:"The Sun", correct : "true"}
        ]
    },
    {
        question:"Of all measurements, which speed is considered the fastest?",
        answers:[
            {text:"Speed of sound", correct : "false"},
            {text:"Speed of Earth's rotation", correct : "false"},
            {text:"Speed of light", correct : "true"},
            {text:"All are equal", correct : "false"}
        ]
    },
    {
        question:"What group of stars is the sun classified in?",
        answers:[
            {text:"Supernova", correct : "false"},
            {text:"Hypernova", correct : "false"},
            {text:"Yellow Dwarf", correct : "true"},
            {text:"Red Supergiant", correct : "false"}
        ]
    },
    {
        question:"Which scientist used one of the first telescopes to observe planets and stars?",
        answers:[
            {text:"Isaac Newton", correct : "false"},
            {text:"Galileo Gallelli", correct : "true"},
            {text:"James Watt", correct : "false"},
            {text:"Roger Bacon", correct : "false"}
        ]
    },
    {
        question:"Animals that only consume other animals are called",
        answers:
        [
            {text:"Omnivores",correct:"false"},
            {text:"Herbivores",correct:"false"},
            {text:"Carnivores",correct:"true"},
            {text:"None of these",correct:"false"}
        ]
    },
    {
        question:"Which planet is the largest planet in our solar system?",
        answers:
        [
            {text:"Earth",correct:"false"},
            {text:"Neptune",correct:"false"},
            {text:"Mars",correct:"false"},
            {text:"Jupiter",correct:"true"}
        ]
    },
    {
        question:"Fire can not burn without",
        answers:
        [
            {text:"Carbon",correct:"false"},
            {text:"Oxygen",correct:"true"},
            {text:"Nitrogen",correct:"false"},
            {text:"None of these",correct:"false"}
        ]
    },
    {
        question:"Approximately how much time does light take to travel from Sun to Earth?",
        answers:
        [
            {text:"20 minutes",correct:"false"},
            {text:"1 hour",correct:"false"},
            {text:"8 minutes and 20 seconds",correct:"true"},
            {text:"3 days",correct:"false"}
        ]
    },
    {
        question:"What is the most abundant gas in the Earth's atmosphere?",
        answers:
        [
            {text:"Oxygen",correct:"false"},
            {text:"Hydrogen",correct:"false"},
            {text:"Carbon Dioxide",correct:"false"},
            {text:"Nitrogen",correct:"true"}
        ]
    },
    {
        question:"Identify the hardest natural substance on Earth.",
        answers:
        [
            {text:"Diamond",correct:"true"},
            {text:"Quartz",correct:"false"},
            {text:"Gold",correct:"false"},
            {text:"Iron",correct:"false"}
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers =>{
        const button =  document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    if(score >= 1){
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    }
    else{
        // questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
        questionElement.innerHTML = `Need Study`;
    }
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}


startQuiz();
