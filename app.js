var addNewTask=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var todoTask=document.getElementById("todo-task");
var completedTask=document.getElementById("completed-task");

var createNewTaskElement=function(taskString){
  var listItem=document.createElement("li");
  var checkBox=document.createElement("input");
  var label=document.createElement("label");
  var editInput=document.createElement("input");
  var editButton=document.createElement("button");
  var deleteButton=document.createElement("button");
  var deleteButtonImg=document.createElement("img");

  listItem.classList.add("content__item");
  label.innerText=taskString;
  label.className="content__item__label-name";
  checkBox.type="checkbox";
  checkBox.className="content__item__checkbox";
  editInput.type="text";
  editInput.className="content__item__input-name";
  editButton.innerText="Edit";
  editButton.className="content__btn edit";
  deleteButton.className="content__btn delete";
  deleteButtonImg.src="./assets/icons/remove.svg";
  deleteButtonImg.className="delete-image";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask=function(){
  console.log("Add Task...");
  if (!addNewTask.value) return;
  var listItem=createNewTaskElement(addNewTask.value);
  todoTask.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  addNewTask.value="";
}

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  var listItem=this.parentNode;
  var editInput=listItem.querySelector("input[type=text]");
  var label=listItem.querySelector("label");
  var editBtn=listItem.querySelector(".edit");
  var containsClass=listItem.classList.contains("editmode");
  if(containsClass){
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
    editInput.classList.remove("editmode-input");
    label.classList.remove("editmode-label");
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
    editInput.classList.add("editmode-input");
    label.classList.add("editmode-label");
  }
  listItem.classList.toggle("editmode");
};

var deleteTask=function(){
  console.log("Delete Task...");
  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted=function(){
  console.log("Complete Task...");
  var listItem=this.parentNode;
  completedTask.appendChild(listItem);
  completedTask.appendChild(listItem)?listItem.classList.add("completed"):null;
  if(listItem.childNodes.length===11){
    listItem.classList.contains("completed")?listItem.childNodes[3].classList.add("completed-label"):null;
  }
  if(listItem.childNodes.length===5){
    listItem.classList.contains("completed")?listItem.childNodes[1].classList.add("completed-label"):null;
  }
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
  console.log("Incomplete Task...");
  var listItem=this.parentNode;
  if(listItem.childNodes.length===11){
    todoTask.appendChild(listItem)?listItem.classList.remove("completed"):null;
    listItem.classList.contains("completed")?null:listItem.childNodes[3].classList.remove("completed-label");
  }
  if(listItem.childNodes.length===5){
    todoTask.appendChild(listItem)?listItem.classList.remove("completed"):null;
    listItem.classList.contains("completed")?null:listItem.childNodes[1].classList.remove("completed-label");
  }
  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
  console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  var checkBox=taskListItem.querySelector("input[type=checkbox]");
  var editButton=taskListItem.querySelector("button.edit");
  var deleteButton=taskListItem.querySelector("button.delete");
  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<todoTask.children.length;i++){
  bindTaskEvents(todoTask.children[i],taskCompleted);
}

for (var i=0; i<completedTask.children.length;i++){
  bindTaskEvents(completedTask.children[i],taskIncomplete);
}
