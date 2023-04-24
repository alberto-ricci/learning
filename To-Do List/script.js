// Get DOM elements: input box and list container
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a task to the list
function addTask() {
    // Check if input box is empty; if so, show an alert
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        // Create a new list item and set its innerHTML to input value
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // Append the new list item to the list container
        listContainer.appendChild(li);

        // Create a delete button (span) and append it to the list item
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    // Clear the input box
    inputBox.value = "";

    // Save the current list state to local storage
    saveData();
}

// Add an event listener to the list container to handle clicks on list items and delete buttons
listContainer.addEventListener("click", function (e) {
    // Toggle the checked class for list items
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    // Remove the list item if delete button (span) is clicked
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Function to save the current list state to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to retrieve saved tasks from local storage and display them
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Call showTask to display the saved tasks on page load
showTask();