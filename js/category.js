const buttons = document.querySelectorAll("button");

const buttonHandler = (event) => {
    localStorage.setItem("category", String(event.target.dataset.category));
    window.location.assign("/");
};

buttons.forEach((button) => {
    button.addEventListener("click", buttonHandler);
})