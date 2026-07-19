const filterCategory = document.getElementById("filter-category");
const searchInput = document.getElementById("search");
const transactionCount =
document.getElementById("transaction-count");
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
function updateTotal(){

    const total = expenses.reduce(function(sum, expense){
        return sum + expense.amount;
    },0);

    totalElement.textContent = total;

    transactionCount.textContent = expenses.length;

}
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function displayExpenses() {

    

    expenseList.innerHTML = "";

    const selectedCategory = filterCategory.value;
    const searchText = searchInput.value.toLowerCase();

    const filteredExpenses = expenses.filter(function (expense) {

    const matchesCategory =
        selectedCategory === "All" ||
        expense.category === selectedCategory;

    const matchesSearch =
        expense.title.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;

});
      if (filteredExpenses.length === 0) {
    expenseList.innerHTML = "<p>No expenses found.</p>";
    return;
}

    filteredExpenses.forEach(function (expense) {
        const formattedDate =
new Date(expense.date).toLocaleDateString("en-IN",{
    day:"numeric",
    month:"short",
    year:"numeric"
});
      

        const li = document.createElement("li");

       li.innerHTML = `
    <div class="expense-info">
        <h3>${expense.title}</h3>

        <p><strong>Amount:</strong> ₹${expense.amount}</p>

        <p><strong>Category:</strong> ${expense.category}</p>

        <p><strong>Date:</strong> ${formattedDate}</p>
    </div>

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
searchInput.addEventListener("input", function () {
    displayExpenses();
});