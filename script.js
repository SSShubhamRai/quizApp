const questions = [
    {
        question: "Who is the current Secretary-General of the United Nations?",
        answers: [
            { text: "Antonio Guterres", correct: true },
            { text: "Ban Ki-moon", correct: false },
            { text: "Kofi Annan", correct: false },
            { text: "José Manuel Barroso", correct: false },
        ]
    },
    {
        question: "Which country recently withdrew from the Paris Climate Agreement in 2020?",
        answers: [
            { text: "United States", correct: true },
            { text: "Brazil", correct: false },
            { text: "Australia", correct: false },
            { text: "India", correct: false },
        ]
    },
    {
        question: "In which year did India gain independence from British rule?",
        answers: [
            { text: "1942", correct: false },
            { text: "1947", correct: true },
            { text: "1950", correct: false },
            { text: "1952", correct: false },
        ]
    },
    {
        question: "Which country is the largest producer of oil in the world as of 2023?",
        answers: [
            { text: "Saudi Arabia", correct: false },
            { text: "Russia", correct: false },
            { text: "United States", correct: true },
            { text: "China", correct: false },
        ]
    },
    {
        question: "Which country is the most populous in the world as of 2024?",
        answers: [
            { text: "India", correct: true },
            { text: "China", correct: false },
            { text: "United States", correct: false },
            { text: "Indonesia", correct: false },
        ]
    },
    {
        question: "What is the name of the international agreement signed in 2021 to address climate change?",
        answers: [
            { text: "Kyoto Protocol", correct: false },
            { text: "Paris Agreement", correct: false },
            { text: "Glasgow Climate Pact", correct: true },
            { text: "Copenhagen Accord", correct: false },
        ]
    },
    {
        question: "Which country is currently the largest economy in the world by GDP?",
        answers: [
            { text: "China", correct: false },
            { text: "Germany", correct: false },
            { text: "United States", correct: true },
            { text: "India", correct: false },
        ]
    },
    {
        question: "Which river is the longest in Asia?",
        answers: [
            { text: "Mekong", correct: false },
            { text: "Yangtze", correct: true },
            { text: "Ganges", correct: false },
            { text: "Yellow River", correct: false },
        ]
    },
    {
        question: "What is the name of the trade agreement signed in 2020 between the United States, Mexico, and Canada?",
        answers: [
            { text: "NAFTA", correct: false },
            { text: "USMCA", correct: true },
            { text: "TTP", correct: false },
            { text: "CPTPP", correct: false },
        ]
    },
    {
        question: "Who is the current Prime Minister of the United Kingdom as of December 2024?",
        answers: [
            { text: "Boris Johnson", correct: false },
            { text: "Rishi Sunak", correct: true },
            { text: "Theresa May", correct: false },
            { text: "David Cameron", correct: false },
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-button");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz()
    }
})

startQuiz();