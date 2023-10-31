document.addEventListener("DOMContentLoaded", function () {
    const themeButton = document.getElementById("theme-button");
    const body = document.body;
    const result = document.querySelector(".result");
    const operators = document.querySelector(".operators");
    const equalityButton = document.querySelector(".equality button");
    const numbers = document.querySelector(".numbers");
    const placeholder = document.querySelector(".result input::placeholder")
    const numbersRows = document.querySelectorAll(".numbers_row button")

    function toggleDarkMode() {
        body.classList.toggle("dark-theme");
        themeButton.classList.toggle("dark-theme");
        result.classList.toggle("dark-theme");
        operators.classList.toggle("dark-theme");
        equalityButton.classList.toggle("dark-theme");
        placeholder.classList.toggle("dark-theme");
        numbers.classList.toggle("dark-theme")

        numbersRows.forEach((button) => {
            button.classList.toggle("dark-theme");
        });
        
        if (body.classList.contains("dark-theme")) {
            themeButton.textContent = "Light mode";
        } else {
            themeButton.textContent = "Dark mode";
        }
    }

    themeButton.addEventListener("click", toggleDarkMode);
});
