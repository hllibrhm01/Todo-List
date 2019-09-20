
// localStorage. kontrol noktasi.
const data =  (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: []
};

// resimler
let removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 457.503 457.503" style="enable-background:new 0 0 457.503 457.503;" xml:space="preserve"><g><g><path d="M381.575,57.067h-90.231C288.404,25.111,261.461,0,228.752,0C196.043,0,169.1,25.111,166.16,57.067H75.929c-26.667,0-48.362,21.695-48.362,48.362c0,26.018,20.655,47.292,46.427,48.313v246.694c0,31.467,25.6,57.067,57.067,57.067h195.381c31.467,0,57.067-25.6,57.067-57.067V153.741c25.772-1.02,46.427-22.294,46.427-48.313C429.936,78.761,408.242,57.067,381.575,57.067z M165.841,376.817c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.508-6.496-14.508-14.509V186.113c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z M243.26,376.817c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.508-6.496-14.508-14.509V186.113c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z M320.679,376.817c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.509-6.496-14.509-14.509V186.113c0-8.013,6.496-14.508,14.509-14.508s14.508,6.496,14.508,14.508V376.817z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';

let completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2"> <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/> <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/></svg>';

//let getText = document.querySelector('#item').value;

/*class addItem{ // bu class gorev yazdirmamizi sagliyor.
  constructor(){
    //let btnAdd = document.querySelector('#add');
    //btnAdd.addEventListener('click', () => {
      let value = document.querySelector('#item').value;
      if(value) console.log(value);
  //  });
  }
}*/

class createTask{
  constructor(text, completed){
    //let ulTodo = document.querySelector('#todo');

      let taskList = (completed) ? document.querySelector('#completed') : document.querySelector('#todo');

      let item = document.createElement("li");
      item.innerHTML = text;

      let buttons = document.createElement("div");
      buttons.classList.add('buttons');

      let remove = document.createElement('button');
      remove.classList.add('remove');
      remove.innerHTML = removeSVG;
      remove.addEventListener('click', () => {
      let value = item.innerText;
      let li = remove.parentNode.parentNode;
      let parent = li.parentNode;
      let id = parent.id;
      //console.log(li);
      //console.log(data.completed.length);

      //if(id === 'todo'){
      //  console.log(complete.id);
        data.todo.splice(data.todo.indexOf(value), 1);
        //data.completed.push(value);
        contStorage(); // bu fonk eklemezsek localStorage silme islemleri duzgun calismaz.
        //console.log(data);
        if(data.length === 1) delete localStorage.todoList; // data'da tek girdi kalinca remove butonuna tiklandiginda == butun localStorage temizlenme islemi
    //  }
      //let d = data.completed.splice(data.completed.indexOf(value), 1);
      data.completed.splice(data.completed.indexOf(value), 1);
      parent.removeChild(li);
      });

      let complete = document.createElement('button');
      complete.classList.add('complete');
      complete.innerHTML = completeSVG;
      complete.addEventListener('click', () =>{
      let item = complete.parentNode.parentNode;
      let parent = item.parentNode;
      let id = parent.getAttribute('id');
      let value = item.innerText;
    //  console.log(id);

      if(id === 'todo'){
        complete.style.display = "none";
        item.style.background = "rgba(37, 185, 154, 0.75)";
        complete.id = "completed";
      //  console.log(complete.id);
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
        contStorage();
      }
      });

      buttons.appendChild(remove);
      buttons.appendChild(complete);
      item.appendChild(buttons);

      taskList.insertBefore(item, taskList.childNodes[0]);
    //  console.log(item);
  }
}

const btnAdd = document.querySelector('#add').addEventListener('click', () =>{
  let value = document.querySelector('#item').value;
  console.log(data.completed.length);
    if(value) {
      new createTask(value);
      document.getElementById('item').value = "";
      data.todo.push(value);
      console.log(data);
      contStorage();
    }
});

function contStorage(){
  localStorage.setItem('todoList', JSON.stringify(data));
}
renderTodoList();

function renderTodoList() { //localStorage'dekileri ekrana yazdirma kismi
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    new createTask(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    new createTask(value, true);
  }
}
