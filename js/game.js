import formatData from "./formatData.js";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionNumber = document.getElementById("question-number");
const questionBox = document.getElementById("question-box");
const answerOptions = questionBox.querySelectorAll(".answer-text");
const categoryElement = document.getElementById("question-category");
const questionText = document.getElementById("question-text");
const URL =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple";

let formattedData = null;
let questionIndex = 0;
let currCorrectIndex = null;

const fetchData = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  formattedData = formatData(json.results);
  console.log(formattedData);
  start();
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  const currQuestion = formattedData[questionIndex];
  const { question, category, correctIndex, answers } = currQuestion;
  currCorrectIndex = correctIndex;
  questionNumber.innerText = questionIndex + 1;
  categoryElement.innerText = category;
  questionText.innerHTML = question;
  answerOptions.forEach((button, idx) => {
    button.innerHTML = answers[idx];
  });
};

const lockAnswers = () => {
  answerOptions.forEach((button) => {
    button.disabled = true;
  });
};

const checkAnswer = (idx) => {
  if (idx == currCorrectIndex) {
    answerOptions[idx].classList.toggle("correct");
  } else {
    answerOptions[idx].classList.toggle("false");
    answerOptions[currCorrectIndex].classList.toggle("correct");
  }
  lockAnswers();
};

window.addEventListener("load", fetchData);
answerOptions.forEach((button, idx) => {
  const handler = () => checkAnswer(idx);
  button.addEventListener("click", handler);
});
