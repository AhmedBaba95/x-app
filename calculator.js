// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  try {
    // Get the display element
    const display = document.getElementById("display");

    // Get the AC/C button element
    const clearButton = document.getElementById("clear-button");

    // Get all the buttons
    const buttons = document.querySelectorAll("button");

    // Initialize a variable to store the current input
    let currentInput = "";

    // Initialize variables for the first and second operands and the operator
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    // Function to update the display and disable/enable buttons
    function updateDisplay() {
      display.value = currentInput;
      // Update the AC/C button text
      clearButton.textContent = currentInput ? "C" : "AC";

      // Disable/enable buttons based on the current input
      buttons.forEach(function (button) {
        if (currentInput === "NaN" || currentInput === "Infinity") {
          if (button !== clearButton) {
            button.disabled = true;
          }
        } else {
          button.disabled = false;
        }
      });
    }

    // Function to handle input of numbers and operators
    function handleInput(input) {
      if (waitingForSecondOperand) {
        currentInput = input;
        waitingForSecondOperand = false;
      } else {
        currentInput += input;
      }
      updateDisplay();
    }

    // Add an event listener to the AC/C button
    clearButton.addEventListener("click", function () {
      currentInput = "";
      operator = null;
      firstOperand = null;
      waitingForSecondOperand = false;
      updateDisplay();
    });

    // Add an event listener to each button
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        if (currentInput === "NaN" || currentInput === "Infinity") {
          return; // Do nothing when NaN or Infinity is displayed
        }

        const buttonValue = button.textContent;

        // Handle numeric input
        if (!isNaN(buttonValue) || buttonValue === ".") {
          handleInput(buttonValue);
        }

        // Inside your event listener for operator buttons
        if (buttonValue === "+" || buttonValue === "-" || buttonValue === "×" || buttonValue === "÷") {
          if (operator && !waitingForSecondOperand) {
            if (parseFloat(currentInput) === 0 && buttonValue === "÷") {
              currentInput = "Infinity";
            } else {
              firstOperand = operate(operator, firstOperand, parseFloat(currentInput));
              currentInput = firstOperand.toString();
            }
            updateDisplay();
          } else {
            firstOperand = parseFloat(currentInput);
          }
          operator = buttonValue;
          waitingForSecondOperand = true;
        }

        // Handle equals button
        if (buttonValue === "=") {
          if (operator && !waitingForSecondOperand) {
            currentInput = operate(operator, firstOperand, parseFloat(currentInput)).toString();
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
          }
        }
      });
    });

    // Perform the arithmetic operations
    function operate(operator, num1, num2) {
      switch (operator) {
        case "+":
          return num1 + num2;
        case "-":
          return num1 - num2;
        case "×":
          return num1 * num2;
        case "÷":
          return num1 / num2;
        default:
          return num2;
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
