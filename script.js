// Store all expenses
const expenses = [];

// Select the form
const expenseForm = document.getElementById("expense-form");

// Listen for form submission
expenseForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get input values
    const title = document.getElementById("title").value;
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    // Create expense object
    const expense = {
        id: Date.now(),
        title: title,
        amount: amount,
        category: category,
        date: date
    };

    // Store expense in array
    expenses.push(expense);

    // Display array in console
    console.log(expenses);

    // Clear the form
    expenseForm.reset();
});