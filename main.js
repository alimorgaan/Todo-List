let addButton = document.getElementById("add");
let inputField = document.getElementById("inputField");
let tasksDiv = document.getElementById("tasksDiv");

//global array to store objects of tasks
let myTasksArray = [];

//tasks stored in local storage like this
// {
//   tasks: [
//     { paragraph: "homework", id: "1" },
//     { paragraph: "feeding kids", id: "2" },
//   ];
// }

//if we have tasks in local storage
if (window.localStorage.tasks) {
  //get tasks and return them as array of objects
  myTasksArray = JSON.parse(window.localStorage.tasks);
  //for every object in the array render a task in html file
  myTasksArray.forEach((object) => {
    createTask(object.paragraph, object.id);
  });
}

addButton.addEventListener("click", () => {
  //if input field is not empty
  if (inputField.value) {
    //make an object for the added task
    let myId = Math.trunc(Math.random() * 1000000);
    let taskObject = { paragraph: inputField.value, id: myId };
    //push this object for tasks array
    myTasksArray.push(taskObject);
    //add the array to local storage as string
    window.localStorage.tasks = JSON.stringify(myTasksArray);
    //create and render the added task
    createTask(inputField.value, myId);
  }
});

//function to create task and render it
function createTask(paragraph, id) {
  let myTask = document.createElement("div");
  myTask.className = "task";
  myTask.setAttribute("id", id);
  let myP = document.createElement("p");
  myP.textContent = paragraph;
  let myDelete = document.createElement("button");
  myDelete.textContent = "delete";
    myDelete.className = "delete";
    

  myDelete.addEventListener("click", (e) => {
    let myTasksArray = JSON.parse(window.localStorage.tasks);
    let idToDelete = e.currentTarget.parentElement.getAttribute("id");
    let indexToDelete;
    for (let i = 0; i < myTasksArray.length; i++) {
        if (myTasksArray[i].id == idToDelete) {
            indexToDelete = i; 
        }
      }
      myTasksArray.splice(indexToDelete, 1); 
      window.localStorage.tasks = JSON.stringify(myTasksArray); 
    e.currentTarget.parentElement.remove();
  });
    
  myTask.appendChild(myP);
  myTask.appendChild(myDelete);
  tasksDiv.appendChild(myTask);
}
