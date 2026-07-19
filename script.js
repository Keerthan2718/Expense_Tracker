// Select the form
const expenseForm = document.getElementById("expense-form");

// Listen for form submission
expenseForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Get input values
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    // Print values
    console.log({
        title,
        amount,
        category,
        date
    });

});