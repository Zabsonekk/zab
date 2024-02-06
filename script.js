const questions = [
    {
        question: "Ktora z ponizszych substancji jest kwasem solnym",
        options: ["HNO3", "H2SO4", "NaOH", "HCI"],
        correctAnswer: "HCI"
    },
    {
        question: "Ktory pierwiastek chemiczny ma symbol Cu",
        options: ["Srebro", "Miedz", "Zloto", "Zelazo"],
        correctAnswer: "Miedz"
    },
    {
        question: "Ile wynosi granica ciagu (1/n) gdy n dazy do nieskonczonosci'?",
        options: ["1", "∞", "0", "-∞"],
        correctAnswer: "0"
    },
    {
        question: "Ktory pierwiastek jest najbardziej obfity w skorupie ziemi",
        options: ["Krzem", "Tlen", "Wegiel", "Azot"],
        correctAnswer: "Azot"
    },
    {
        question: "Co to jest srednia arytmetyczna zbioru danych",
        options: ["Mediana danych", "Suma danych podzielona przez liczbe danych", "Roznica miedzy najwieksza a najmniejsza wartoscia w zbiorze danych", "Najczesciej wystepujaca wartosc w zbiorze danych"],
        correctAnswer: "Suma danych podzielona przez liczbe danych"
    },
    {
        question: "Ktory pierwiastek jest najlzejszy",
        options: ["Wodor", "Hel", "Lit", "Neon"],
        correctAnswer: "Wodor"
    },
    {
        question: "Ktory z tych gatunkow jezykowych nie nalezy do rodziny jezykow romanskich",
        options: ["Niemiecki", "Francuski", "Hiszpanski", "Wloski"],
        correctAnswer: "Niemiecki"
    },
    {
        question: "Ktory pierwiastek chemiczny ma symbol S",
        options: ["Cyna", "Selen", "Stront", "Siarka"],
        correctAnswer: "Siarka"
    },{
        question: "Ktory pierwiastek chemiczny jest obecny w wiekszosci zwiazkow organicznych",
        options: ["Tlen", "Siarka", "Wegiel", "Azot"],
        correctAnswer: "Wegiel"
    },
    















];

let usedQuestionIndexes = [];
let score = 0;
let quizEnd = false;
let timerInterval;

function getRandomQuestionIndex() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestionIndexes.includes(randomIndex));
    usedQuestionIndexes.push(randomIndex);
    return randomIndex;
}

function displayQuestion() {
    if (usedQuestionIndexes.length === questions.length) {
        endQuiz();
        return;
    }
    const questionIndex = getRandomQuestionIndex();
    const question = questions[questionIndex];

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";

    question.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option, question.correctAnswer);
        optionsElement.appendChild(button);
    });

    startTimer();
}

function checkAnswer(userAnswer, correctAnswer) {
    clearInterval(timerInterval);

    const resultElement = document.getElementById("result");

    if (userAnswer === correctAnswer) {
        score++;
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Incorrect!";
    }

    setTimeout(() => {
        resultElement.textContent = "";
        if (usedQuestionIndexes.length < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    quizEnd = true;
    const resultElement = document.getElementById("result");
    resultElement.textContent = `You got ${score} out of ${questions.length} questions correct.`;
    document.getElementById("options").innerHTML = "";
}

function startTimer() {
    let timeLeft = 10;
    const timerElement = document.getElementById("timer");
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.style.width = (timeLeft * 10) + "%";
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            if (!quizEnd) {
                endQuiz();
            }
        }
    }, 1000);
}

displayQuestion();