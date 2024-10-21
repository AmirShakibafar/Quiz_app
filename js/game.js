import formatData from "./formatData.js";
const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionNumber = document.getElementById("question-number");
const questionBox = document.getElementById("question-box");
const answerOptions = questionBox.querySelectorAll(".answer-text");
const categoryElement = document.getElementById("question-category");
const questionText = document.getElementById("question-text");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const error = document.getElementById("error");
const bonusScore = 10;
const difficulty = localStorage.getItem("level") || "medium";
const URL = `https://opentdb.com/api.php?amount=10&category=11&difficulty=${difficulty}&type=multiple`;

let formattedData = null;
let questionIndex = 0;
let currCorrectIndex = null;
let score = 0;
let is_accepted = true;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
  } catch (e) {
    loader.style.display = "none";
    error.style.display = "block";
  }
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
    button.classList.remove("correct");
    button.classList.remove("false");
  });
};

const checkAnswer = (idx) => {
  if (!is_accepted) return;
  is_accepted = false;
  if (idx == currCorrectIndex) {
    answerOptions[idx].classList.toggle("correct");
    score += bonusScore;
    scoreElement.innerText = score;
  } else {
    answerOptions[idx].classList.toggle("false");
    answerOptions[currCorrectIndex].classList.toggle("correct");
  }
};

const finishGame = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/end.html");
};

const nextButtonHandler = () => {
  questionIndex += 1;
  is_accepted = true;
  if (questionIndex < formattedData.length) {
    showQuestion();
  } else {
    finishGame();
  }
};

finishButton.addEventListener("click", finishGame);
nextButton.addEventListener("click", nextButtonHandler);
window.addEventListener("load", fetchData);
answerOptions.forEach((button, idx) => {
  const handler = () => checkAnswer(idx);
  button.addEventListener("click", handler);
});
