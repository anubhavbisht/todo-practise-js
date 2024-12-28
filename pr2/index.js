import { quizData } from "./data.js";

let counter = 1;
let correct = 0;

function reloadQuiz() {
  counter = 1;
  correct = 0;
  loadQuestionnaire();
}

function displayResult() {
  const result = `Your result is ${correct}/${quizData.length}`;
  const parentElement = document.querySelector(".content");
  parentElement.innerHTML = "";

  const resultDiv = document.createElement("div");
  resultDiv.innerHTML = `<h3>${result}</h3>`;

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart quiz";
  restartButton.onclick = reloadQuiz;

  resultDiv.appendChild(restartButton);
  parentElement.appendChild(resultDiv);
}

function checkAnswer(selectedOption) {
  const correctAnswer = quizData[counter - 1].correct;
  if (selectedOption === correctAnswer) {
    correct++;
  }

  counter++;
  loadQuestionnaire();
}

function displayQuestion() {
  const parentElement = document.querySelector(".content");
  const questionNumber = document.getElementById("question-number");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.querySelector(".options-container");

  parentElement.innerHTML = "";

  const questionInfo = quizData[counter - 1];
  questionNumber.innerText = `Question ${counter}/${quizData.length}`;
  questionText.innerText = questionInfo.question;

  optionsContainer.innerHTML = "";

  ["a", "b", "c", "d"].forEach((optionKey, index) => {
    const inputElement = document.createElement("input");
    inputElement.type = "radio";
    inputElement.name = "quizOption";
    inputElement.value = optionKey;
    inputElement.id = `radioOption${optionKey}`;

    const label = document.createElement("label");
    label.setAttribute("for", inputElement.id);
    label.innerText = questionInfo[optionKey];

    inputElement.onclick = () => checkAnswer(optionKey);

    optionsContainer.appendChild(inputElement);
    optionsContainer.appendChild(label);
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.onclick = loadQuestionnaire;
  parentElement.appendChild(nextButton);
}

function loadQuestionnaire() {
  const totalQuestions = quizData.length;
  if (counter > totalQuestions) {
    displayResult();
  } else {
    displayQuestion();
  }
}

loadQuestionnaire();
