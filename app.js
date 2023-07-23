const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch")
let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click",allTodosRemoved); 
    filterInput.addEventListener("keyup",filter);  
}
function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item")
   
    todoListesi.forEach(function(todo){
        if(todo.textContent.toLowerCase().trim().includes(filterValue)){
            todo.setAttribute("style","display : block !important");
        }else{
            todo.setAttribute("style","display : none !important");
        }
    });

    

}
function pageLoaded() {
    checkStorageTodos();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}
function allTodosRemoved(){
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            todo.remove();
            todos=[];
            localStorage.setItem("todos",JSON.stringify(todos));
            showAlert("success","Todos cleared")
        })
    }else{
        showAlert("warning","You dont have any todos")
    }
}





function removeTodoToUI(e) {
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        removeTodoToStorage(todo.textContent)
        showAlert("danger","Your todo removed..")
    }
}
function removeTodoToStorage(removeTodo){
    checkStorageTodos();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
        localStorage.setItem("todos",JSON.stringify(todos))
    });

}
function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Please enter a value!")
    } else {
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Your todo is append");
    }
    e.preventDefault();
}

function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = newTodo

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function addTodoToStorage(newTodo) {
    checkStorageTodos();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function checkStorageTodos() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

}
function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    div.role = "alert";
    firstCardBody.appendChild(div);
    div.style.marginTop = "15px"
    setTimeout(() => {
        div.remove();
    }, 2000)
}