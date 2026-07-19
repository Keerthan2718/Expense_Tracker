// Store all expenses
const expenses = [];

// Select the form
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
   function deleteExpense(id) {

    const index = expenses.findIndex(function (expense) {
        return expense.id === id;
    });

    if (index !== -1) {
        expenses.splice(index, 1);
    }

    displayExpenses();
}
function displayExpenses() {

    // Clear old list
    expenseList.innerHTML = "";

    // Loop through all expenses
    expenses.forEach(function (expense) {

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${expense.title}</strong> -
            ₹${expense.amount}<br>
            ${expense.category} |
            ${expense.date}
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;

        expenseList.appendChild(li);

    });

}

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
 
    displayExpenses();


    // Display array in console
    console.log(expenses);

    // Clear the form
    expenseForm.reset();
});