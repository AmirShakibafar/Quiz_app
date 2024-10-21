const highScores = JSON.parse(localStorage.getItem("highScores")) || []
const orderedList = document.querySelector("ol");



const showHighScores = () => {
    if (!highScores.length) return;
    orderedList.innerHTML = "";
    highScores.forEach((highScore, idx) => {
        orderedList.innerHTML += `<li>
        <span>${idx + 1}</span>
        <p>${highScore.name}</p>
        <span>${highScore.score}</span>
        </li>`
    });
};

showHighScores();