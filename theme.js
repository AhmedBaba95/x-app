// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the theme button element
    const themeButton = document.getElementById("theme-button");
    
    // Get references to various elements that should toggle the dark theme
    const body = document.body;  // The <body> element
    const result = document.querySelector(".result");  // The result section
    const operators = document.querySelector(".operators");  // The operators section
    const equalityButton = document.querySelector(".equality button");  // The equality button
    const numbers = document.querySelector(".numbers");  // The numbers section
    const placeholder = document.querySelector(".result input::placeholder");  // Placeholder for the input
    const numbersRows = document.querySelectorAll(".numbers_row button");  // All number buttons

    // Function to toggle the dark mode
    function toggleDarkMode() {
        // Toggle the "dark-theme" class on different elements
        body.classList.toggle("dark-theme");
        themeButton.classList.toggle("dark-theme");
        result.classList.toggle("dark-theme");
        operators.classList.toggle("dark-theme");
        equalityButton.classList.toggle("dark-theme");
        placeholder.classList.toggle("dark-theme");
        numbers.classList.toggle("dark-theme");

        // Loop through number buttons and toggle "dark-theme" class for each
        numbersRows.forEach((button) => {
            button.classList.toggle("dark-theme");
        });

        // Update the theme button text
        if (body.classList.contains("dark-theme")) {
            themeButton.textContent = "Light mode";
        } else {
            themeButton.textContent = "Dark mode";
        }
    }

    // Add an event listener to the theme button to trigger dark mode toggle
    themeButton.addEventListener("click", toggleDarkMode);
});
