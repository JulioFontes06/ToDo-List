/* 

const submitBtn = document.getElementById("submit");
*/

let abstractPlan = {
  todo: [],
  doing: [],
  done: [],
};

/* Adicionar task */

const addNewTask = () => {
  const ipt = document.getElementById("toDoTaskCadaster");
  const toDo = document.getElementById("toDo");
  const task = document.querySelectorAll(".task");

  task.forEach((item) => {
    item?.remove("li");
  });

  if (ipt.value) {
    abstractPlan.todo.unshift(ipt.value);
    console.clear();
    console.log(abstractPlan);
    display(ipt.value);
  }
};

/* Mostrar na tela */

const showOnScreen = () => {
  const toDo = document.getElementById("toDo");
  const doing = document.getElementById("doing");
  const done = document.getElementById("done");
  updateLocalStorage();
  let localStorageDatabase = localStorage.getItem("dataBase");
  localStorageDatabase = JSON.parse(localStorageDatabase);
  localStorageDatabase.todo.forEach((task) => {
    newLi(toDo, task, 'todo');
  });
  localStorageDatabase.doing.forEach((task) => {
    newLi(doing, task, 'doing')
  })
  localStorageDatabase.done.forEach((task) => {
    newLi(done, task, 'done')
  })
};

const display = (task) => {
  newLi(toDo, task, 'todo');
}

/* Criar a LI */

const newLi = (data, content, localState) => {
  const li = document.createElement("li");
  const img = document.createElement("img");

  li.className = `task-${localState}`;
  li.innerText = content;
  img.src = "./src/trash3-fill.svg";
  img.addEventListener("click", (e) => remove(e));
  li.addEventListener('click', (e) => toggle(e))

  li.append(img);

  data.append(li);
};

/* Remover a li */

const remove = (e) => {
  e.target.parentElement.remove();

  let indexToDo = abstractPlan.todo.findIndex(
    (i) => i === e.target.parentElement.innerText
  );

  console.log(indexToDo);
  if (indexToDo !== -1) {
    abstractPlan.todo.splice(indexToDo, 1);
  }

  let indexDoing = abstractPlan.doing.findIndex(
    (i) => i === e.target.parentElement.innerText
  );

  console.log(indexDoing);
  if(indexDoing !== -1) {
    abstractPlan.doing.splice(indexDoing, 1)
  }

  let indexDone = abstractPlan.done.findIndex(
    (i) => i === e.target.parentElement.innerText
  );

  console.log(indexDone);
  if(indexDone !== -1) {
    abstractPlan.done.splice(indexDone, 1)
  }

  updateLocalStorage();
};

const start = () => {
  let localStorageData = localStorage.getItem("dataBase");
  localStorageData = JSON.parse(localStorageData);

  if (
    localStorageData.todo ||
    localStorageData.doing ||
    localStorageData.done
  ) {
    abstractPlan = localStorageData;
  }
};

const updateLocalStorage = () => {
  let localStorageData = JSON.stringify(abstractPlan);
  console.log(localStorageData);

  localStorage.setItem("dataBase", localStorageData);
};

const toggle = (e) => {
    const toDo = document.getElementById('toDo')
    const doing = document.getElementById('doing')
    const done = document.getElementById('done')
    let event = e.target

    const indexToDo = abstractPlan.todo.findIndex(i => i === event.innerText)

    if(event.className === 'task-todo' && indexToDo !== -1) {
        abstractPlan.todo.splice(indexToDo, 1)
        abstractPlan.doing.unshift(event.innerText)
        event.classList = 'task-doing' 
        event.remove()
        doing.appendChild(event)
        updateLocalStorage()
        return
    }

    const indexDoing = abstractPlan.doing.findIndex(i => i === event.innerText)
    
    if(event.className === 'task-doing' && indexDoing !== -1) {
        abstractPlan.doing.splice(indexDoing, 1)
        abstractPlan.done.unshift(event.innerText)
        event.classList = 'task-done'
        event.remove()
        done.appendChild(event)
        updateLocalStorage()
        return
    }

    const indexDone = abstractPlan.done.findIndex(i => i === event.innerText)

    if(event.className === 'task-done' && indexDone !== -1) {
        abstractPlan.done.splice(indexDone, 1)
        abstractPlan.todo.unshift(event.innerText)
        event.classList = 'task-todo'
        event.remove()
        toDo.appendChild(event)
        updateLocalStorage()
        return
    }
}



start();
showOnScreen();

