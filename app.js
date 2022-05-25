//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var addNewTask=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var todoTask=document.getElementById("todo-task");//ul of #todo-task
var completedTask=document.getElementById("completed-task");//completed-task


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add("content__item");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className="content__item__label-name";

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="content__item__checkbox";
    editInput.type="text";
    editInput.className="content__item__input-name";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="content__btn edit";

    deleteButton.className="content__btn delete";
    deleteButtonImg.src="./remove.svg";
    deleteButtonImg.className="delete-image";
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!addNewTask.value) return;
    var listItem=createNewTaskElement(addNewTask.value);

    //Append listItem to todoTask
    todoTask.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    addNewTask.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector("input[type=text]");
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".edit");
    var containsClass=listItem.classList.contains("editmode");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
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

    //toggle .editmode on the parent.
    listItem.classList.toggle("editmode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-task
    var listItem=this.parentNode;
    completedTask.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #todo-task.
    var listItem=this.parentNode;
    todoTask.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over todoTask ul list items
//for each list item
for (var i=0; i<todoTask.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(todoTask.children[i],taskCompleted);
}




//cycle over completedTask ul list items
for (var i=0; i<completedTask.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTask.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.