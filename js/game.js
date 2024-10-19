import formatData from "./formatData.js";

const loader = document.getElementById("loader");
const container = document.getElementById("container");

const URL =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple";

let formattedData = null;

const fetchData = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  formattedData = formatData(json.results);
  console.log(formattedData);
  start();
};

const start = () => {
  loader.style.display = "none";
  container.style.display = "block";
};

window.addEventListener("load", fetchData);
