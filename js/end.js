const score = JSON.parse(localStorage.getItem("score")); 
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const scoreElement = document.querySelector("p");
const button = document.querySelector("button");
const input = document.querySelector("input");

scoreElement.innerText = score;

const saveHandler = () => {
     if (!score || input.value == "") {
        alert("invalid username or score!");
     }

     const finalScore = {name:input.value, score};
     highScores.push(finalScore);
     highScores.sort((a, b) => b.score - a.score);
     highScores.splice(10);
     localStorage.setItem("highScores", highScores);
     localStorage.removeItem("scores");
     window.location.assign("/");
};

button.addEventListener("click", saveHandler);