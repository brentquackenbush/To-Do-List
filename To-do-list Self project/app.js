 
//select the elements
const list = document.getElementById("list");
const clear = document.querySelector(".clear");
const dataElement = document.getElementById("date");
const input = document.getElementById("input");

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id = 0;


//show today's date
const today = new Date();
const options = {weekday:'long',month:'short',day:'numeric'};

dataElement.innerHTML = today.toLocaleDateString("en-US",options);
//get item from localstroage
let data = localStorage.getItem("TODO");

if(data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the user interface
} else {
    //if data isn't empty
    LIST = [];
    id = 0;

}

function loadList(array) {
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash);
    });
}
clear.addEventListener('click',function() {
    localStorage.clear();
    location.reload();

});






//localStorage.setItem('key','value');
//let variable = localStorage.getItem('key');
//localStorage.setItem("TODO",JSON.stringify(LIST));


list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJOB = event.target.attributes.job.value;
    if (elementJOB == "complete") {
        completeToDo(element);
    } else if (elementJOB == "delete") {
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
})




function completeToDo(element) {

    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {

    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}


function addToDo(toDo, id, done, trash) {

    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const text = `<li class = "item"> 
        <i class = "fa ${DONE} co" job = "complete" id="${id}"></i>
        <p class = "text ${LINE}">${toDo}</p>
        <i class = "fa fa-trash-o delete" job = "delete" id="${id}></i>
        </li>`

    const position = "beforeend";

    list.insertAdjacentHTML(position, text);

}



document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        if (toDo) { //will not hit this if statement if the string is empty because it will return false
            addToDo(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });
                localStorage.setItem("TODO", JSON.stringify(LIST));
                id++;
        }
        input.value = "";
  
    }
});




