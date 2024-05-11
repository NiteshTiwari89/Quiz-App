const questions = [
    {
        question:"Who wrote the novel '1984'?",
        answers:[
            {text:"George Orwellng", correct : "true"},
            {text:"J.K. Rowling", correct : "false"},
            {text:"F.Scott Fitzgerald", correct : "false"},
            {text:"Ernest Hemingway", correct : "false"}
        ]
    },
    {
        question:"What is the capital city of Australia?",
        answers:[
            {text:"Sydney", correct : "false"},
            {text:"Melbourne", correct : "false"},
            {text:"Canberra", correct : "true"},
            {text:"Brisbane", correct : "false"}
        ]
    },
    {
        question:"What is the chemical symbol for Gold?",
        answers:[
            {text:"Gd", correct : "false"},
            {text:"Go", correct : "false"},
            {text:"Ag", correct : "false"},
            {text:"Au", correct : "true"}
        ]
    },
    {
        question:"In what year was the first iPhone released?",
        answers:[
            {text:"2005", correct : "false"},
            {text:"2007", correct : "true"},
            {text:"2008", correct : "false"},
            {text:"2010", correct : "false"}
        ]
    },
    {
        question:"For which of these disciplines Nobel Prize is awarded?",
        answers:
        [
            {text:"Physics, Chemistry",correct:"false"},
            {text:"Physiology",correct:"false"},
            {text:"Medicine",correct:"false"},
            {text:"All of the above",correct:"true"}
        ]
    },
    {
        question:"In which century the Mona Lisa was painted?",
        answers:
        [
            {text:"18th century",correct:"false"},
            {text:"15th century",correct:"false"},
            {text:"16th century",correct:"true"},
            {text:"14th century",correct:"false"}
        ]
    },
    {
        question:"Which is the richest country in the world?",
        answers:
        [
            {text:"Qatar",correct:"true"},
            {text:"Russia",correct:"false"},
            {text:"USA",correct:"false"},
            {text:"UAE",correct:"false"}
        ]
    },
    {
        question:"Which county is the biggest grower of coffee?",
        answers:
        [
            {text:"Spain",correct:"false"},
            {text:"India",correct:"false"},
            {text:"Ethiopia",correct:"false"},
            {text:"Brazil",correct:"true"}
        ]
    },
    {
        question:"Which river is the second longest in the world?",
        answers:
        [
            {text:"Amazon",correct:"false"},
            {text:"Yangtze",correct:"true"},
            {text:"Nile",correct:"false"},
            {text:"Mississippi",correct:"false"}
        ]
    },
    {
        question:"Which planet in the solar system is known as the “Morning Star” or “Evening Star”?",
        answers:
        [
            {text:"Mars",correct:"false"},
            {text:"Venus",correct:"true"},
            {text:"Mercury",correct:"false"},
            {text:"Jupiter",correct:"false"}
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn");


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
    homeButton.style.display = "block";
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}


startQuiz();
