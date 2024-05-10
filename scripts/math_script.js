const questions = [
    {
        question:"Who invented infinitesimal calculus independently of Newton and created the binary system?",
        answers:[
            {text:"Gottfried Leibniz", correct : "true"},
            {text:"Hermann Grassmann", correct : "false"},
            {text:"Johannes Kepler", correct : "false"},
            {text:"Heinrich Weber", correct : "false"}
        ]
    },
    {
        question:"Who among the following was a great Mathematician and astronomer?",
        answers:[
            {text:"Vetalbatiya", correct : "false"},
            {text:"Banabhatta", correct : "false"},
            {text:"Aryabhatta", correct : "true"},
            {text:"Dhanvantari", correct : "false"}
        ]
    },
    {
        question:"What is the definition of a triangle in n Euclidean geometry?",
        answers:[
            {text:"Quarter of a square", correct : "false"},
            {text:"polygon", correct : "false"},
            {text:"two-dimensional plane determined by any three points", correct : "true"},
            {text:"shape containing at least three angles", correct : "false"}
        ]
    },
    {
        question:"Which 3rd-century Greek mathematician wrote Elements of Geometry?",
        answers:[
            {text:"Archimedes", correct : "false"},
            {text:"Euclid", correct : "true"},
            {text:"Eratosthenes", correct : "false"},
            {text:"Pythagoras", correct : "false"}
        ]
    },
    {
        question:"The basic shape of the North American continent on a map is called?",
        answers:
        [
            {text:"Square",correct:"false"},
            {text:"Triangular",correct:"true"},
            {text:"Circular",correct:"false"},
            {text:"Hexagonal",correct:"false"}
        ]
    },
    {
        question:"Which is the most significant five-digit number exactly divisible by 279?",
        answers:
        [
            {text:"99603",correct:"false"},
            {text:"99882",correct:"true"},
            {text:"99550",correct:"false"},
            {text:"None of these",correct:"false"}
        ]
    },
    {
        question:"What is its name if a natural number has precisely two different divisors?",
        answers:
        [
            {text:"Integer",correct:"false"},
            {text:"Prime number",correct:"false"},
            {text:"Composite number",correct:"true"},
            {text:"Perfect number",correct:"false"}
        ]
    },
    {
        question:"What shape are honeycomb cells",
        answers:
        [
            {text:"Hexagons",correct:"true"},
            {text:"Squares",correct:"false"},
            {text:"Pentagons",correct:"false"},
            {text:"Triangles",correct:"false"}
        ]
    },
    {
        question:"A tank can be filled by two pipes in 10 and 30 minutes, respectively, and a third pipe can empty in 20 minutes. How much time will the tank fill if three pipes are opened simultaneously?",
        answers:
        [
            {text:"10 min",correct:"false"},
            {text:"8 min",correct:"false"},
            {text:"7 min",correct:"false"},
            {text:"None of these",correct:"true"}
        ]
    },
    {
        question:"Four prime numbers are arranged in ascending order. The sum of the first three is 385, while the last is 1001. The most significant prime number is—",
        answers:
        [
            {text:"11",correct:"false"},
            {text:"13",correct:"false"},
            {text:"17",correct:"true"},
            {text:"9",correct:"false"}
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
