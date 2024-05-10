const questions = [
    {
        question:"If two typists can type two pages in two minutes, how many typists will it take to type 18 pages in 6 minutes?        ",
        answers:[
            {text:"3", correct : "false"},
            {text:"6", correct : "true"},
            {text:"18", correct : "false"},
            {text:"12", correct : "false"}
        ]
    },
    {
        question:"If you count from 1 to 100, how many 7's will you pass on the way?",
        answers:[
            {text:"10", correct : "false"},
            {text:"14", correct : "false"},
            {text:"20", correct : "true"},
            {text:"21", correct : "false"}
        ]
    },
    {
        question:"Pear is to apple as potato is to",
        answers:[
            {text:"Banana", correct : "false"},
            {text:"Radish", correct : "true"},
            {text:"Strawberry", correct : "false"},
            {text:"Peach", correct : "false"}
        ]
    },
    {
        question:"Choose the correct alternative from given ones that will complete the series : 1250, 250, 50, 10 , ?",
        answers:[
            {text:"1", correct : "false"},
            {text:"2", correct : "true"},
            {text:"20", correct : "false"},
            {text:"50", correct : "false"}
        ]
    },
    {
        question:"Ram pointed towards a lady and said, “Her daughter is the wife of my son-in-law.” What relation does Ram have with the woman he pointed towards?",
        answers:
        [
            {text:"Husband",correct:"true"},
            {text:"Father",correct:"false"},
            {text:"Brother",correct:"false"},
            {text:"None of the above",correct:"false"}
        ]
    },
    {
        question:"Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
        answers:
        [
            {text:"(1/3)",correct:"false"},
            {text:"(2/8)",correct:"false"},
            {text:"(1/8)",correct:"true"},
            {text:"(1/16)",correct:"false"}
        ]
    },
    {
        question:" If NOIDA is written as OPJEB, then what will be the code for DELHI?",
        answers:
        [
            {text:"EFAMK",correct:"false"},
            {text:"EFMAK",correct:"false"},
            {text:"EFMIJ",correct:"true"},
            {text:"EFMIK",correct:"false"}
        ]
    },
    {
        question:"The number comes next in the series 12, 36, 109, 329, ... ",
        answers:
        [
            {text:"900",correct:"false"},
            {text:"890",correct:"false"},
            {text:"990",correct:"true"},
            {text:"None of the above",correct:"false"}
        ]
    },
    {
        question:"Which number comes next in the series 1536, 384, 96, ___?",
        answers:
        [
            {text:"23",correct:"false"},
            {text:"24",correct:"true"},
            {text:"28",correct:"false"},
            {text:"18",correct:"false"}
        ]
    },
    {
        question:" If PINK is coded as 1691411, then RED will be coded as -",
        answers:
        [
            {text:"1963",correct:"false"},
            {text:"1854",correct:"true"},
            {text:"1853",correct:"false"},
            {text:"1954",correct:"false"}
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
