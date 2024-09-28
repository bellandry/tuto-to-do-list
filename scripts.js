// selectionner le champ de saisie
const taskInput = document.getElementById("taskInput");
// sélectionner le bouton
const addTaskBtn = document.getElementById("addTaskBtn");
// sélectionner la liste de taches
const taskList = document.getElementById("taskList");

//écoute de l'événement de clic sur le bouton
addTaskBtn.addEventListener("click", addTask);

window.addEventListener("load", displayTasks);

// fonction pour ajouter les taches
function addTask() {
  // récupérer le texe saisi dans l'input
  const task = taskInput.value;
  // si le texte n'est pas vide alors on peut l'enregistrer
  if (task) {
    let tasks = getTasks();
    //ajouter la tache dans le tableau des taches
    tasks.push(task);
    // vider l'input
    taskInput.value = "";
    saveTask(tasks);
    //actualiser la liste des taches
    displayTasks();
  }
}

function saveTask(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks = localStorage.getItem("tasks");

  if (tasks) {
    return JSON.parse(tasks);
  } else {
    return [];
  }

  // version racourcis de la condition
  // return tasks ? JSON.pasrse(tasks) : []
}

function deleteTask(index) {
  let tasks = getTasks();
  tasks.splice(index, 1);
  saveTask(tasks);
  displayTasks();
}

function displayTasks() {
  //vider l'affichage des taches
  taskList.innerHTML = "";

  let tasks = getTasks();
  //parcourir le tableau des taches
  tasks.forEach((task, index) => {
    // créer la balise li pour chaque tache
    const li = document.createElement("li");
    // insérer les taches dans la balise li
    li.textContent = task;

    // créer le bouton de suppression
    const deleteBtn = document.createElement("button");
    //insérer le texte dans le bouton
    deleteBtn.textContent = "supprimer";
    //ajouter une classe au bouton
    deleteBtn.classList.add("delete-btn");
    //ajouter l'évenement de clic
    deleteBtn.addEventListener("click", () => deleteTask(index));
    //insérer le bouton dans la balise li
    li.appendChild(deleteBtn);
    // insérer la balise li dans la liste ul
    taskList.appendChild(li);
  });
}
