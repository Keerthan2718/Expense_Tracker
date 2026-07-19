const filterCategory = document.getElementById("filter-category");
// Store all expenses
let expenses = [];

// Select the form
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");
   function deleteExpense(id) {

    const index = expenses.findIndex(function (expense) {
        return expense.id === id;
    });

    if (index !== -1) {
        expenses.splice(index, 1);
        saveExpenses();
    }

    displayExpenses();
    updateTotal();
}
function updateTotal() {

    const total = expenses.reduce(function (sum, expense) {
        return sum + expense.amount;
    }, 0);

    totalElement.textContent = total;

}
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function displayExpenses() {

    

    expenseList.innerHTML = "";

    const selectedCategory = filterCategory.value;

    const filteredExpenses = expenses.filter(function (expense) {

        if (selectedCategory === "All") {
            return true;
        }

        return expense.category === selectedCategory;

    });
      if (filteredExpenses.length === 0) {
    expenseList.innerHTML = "<p>No expenses found.</p>";
    return;
}

    filteredExpenses.forEach(function (expense) {
      

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${expense.title}</strong><br>
            ₹${expense.amount}<br>
            ${expense.category}<br>
            ${expense.date}<br><br>

            <button onclick="deleteExpense(${expense.id})">
                Delete
            </button>
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
    saveExpenses();
 
    displayExpenses();
    updateTotal();


    // Display array in console
    console.log(expenses);

    // Clear the form
    expenseForm.reset();
});
const storedExpenses = localStorage.getItem("expenses");

if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);

    displayExpenses();
    updateTotal();
}
filterCategory.addEventListener("change", function () {
    displayExpenses();
});