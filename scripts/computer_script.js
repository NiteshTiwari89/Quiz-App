const questions = [
    {
        question:"Who is known as the father of computer?",
        answers:[
            {text:"Dennis Ritchie", correct : "false"},
            {text:"Bill Gates", correct : "false"},
            {text:"Charles Babbage", correct : "true"},
            {text:"James Gosling", correct : "false"}
        ]
    },
    {
        question:"Who is credited with the creation of the first mechanical computer, the Difference Engine?",
        answers:[
            {text:"Blasie Pascal", correct : "false"},
            {text:"Garden Moore", correct : "false"},
            {text:"Bjarne Stroustrup", correct : "false"},
            {text:"Charles Babbage", correct : "true"}
        ]
    },
    {
        question:"What is the brain of a computer system called?",
        answers:[
            {text:"RAM", correct : "false"},
            {text:"CPU", correct : "true"},
            {text:"GPU", correct : "false"},
            {text:"None of the above", correct : "false"}
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
