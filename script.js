function addTask() {

    let task = document.getElementById("task").value;
    let date = document.getElementById("date").value;
    let priority = document.getElementById("priority").value;

    if (task == "") {
        alert("Enter a task");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML =
        "<b>" + task + "</b><br>" +
        "Deadline: " + date + "<br>" +
        "Priority: " + priority +
        "<br><br>" +
        "<button onclick='markDone(this)'>Complete</button> " +
        "<button onclick='deleteTask(this)'>Delete</button>";

    document.getElementById("taskList").appendChild(li);

    updateCount();
    saveTasks();

    document.getElementById("task").value = "";
    document.getElementById("date").value = "";
    document.getElementById("priority").selectedIndex = 0;
}

function markDone(button) {

    button.parentElement.style.background = "#d1fae5";
    button.parentElement.style.textDecoration = "line-through";

    saveTasks();
}

function deleteTask(button) {

    button.parentElement.remove();

    updateCount();
    saveTasks();
}

function saveTasks() {

    localStorage.setItem(
        "tasks",
        document.getElementById("taskList").innerHTML
    );
}

function loadTasks() {

    document.getElementById("taskList").innerHTML =
        localStorage.getItem("tasks") || "";

    updateCount();
}

function updateCount(){

    let tasks =
        document.querySelectorAll("#taskList li");

    let total =
        tasks.length;

    let completed =
        document.querySelectorAll(
            "#taskList li[style*='line-through']"
        ).length;

    document.getElementById("count").innerHTML =
        total;

    document.getElementById("completed").innerHTML =
        completed;

    document.getElementById("pending").innerHTML =
        total - completed;
}

function searchTask() {

    let input =
        document.getElementById("search")
        .value
        .toLowerCase();

    let tasks =
        document.querySelectorAll("#taskList li");

    tasks.forEach(function(task) {

        if (task.innerText
                .toLowerCase()
                .includes(input)) {

            task.style.display = "block";
        }
        else {

            task.style.display = "none";
        }
    });
}

window.onload = loadTasks;