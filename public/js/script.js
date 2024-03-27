

  const ipt = document.getElementById("toDoTaskCadaster");
  const toDo = document.getElementById("toDo");
  const doing = document.getElementById("doing");
  const done = document.getElementById("done");
  const submutBtn = document.getElementById('submit')

  let abstractPlan = {
    todo: [],
    doing: [],
    done: [],
  };

  let toDoTaskNumber =
    abstractPlan.todo.length +
    abstractPlan.doing.length +
    abstractPlan.done.length;

  startToDoList();


  function addTask() {
    if (ipt.value) {
      createLi(ipt.value);
      ipt.value = "";
    }
  }

  submutBtn.addEventListener('click', () => {
    addTask()
  })

  function createLi(content) {
    const li = document.createElement("li");
    const h1 = document.createElement("h1");
    const img = document.createElement("img");

    li.id = `tsk-${toDoTaskNumber}-li`;
    img.id = `tsk-${toDoTaskNumber}-img`;
    li.className = "task";

    h1.innerText = content;
    img.src = "./src/trash3-fill.svg";
    img.className = "trash";

    abstractPlan.todo.unshift(content);
    li.append(h1, img);
    toDo.append(li);
    toDoTaskNumber++;

    img.addEventListener("click", (e) => {
      const word = e.target.parentNode.firstChild;
      excludePlan(word, e);
      console.log(word.innerText);
      e.target.parentNode.remove();
      const currentAbstractPlanString = JSON.stringify(abstractPlan);
      localStorage.setItem("abstractPlan", currentAbstractPlanString);
    });

    const abstractPlanString = JSON.stringify(abstractPlan);
    localStorage.setItem("abstractPlan", abstractPlanString);
    li.addEventListener("click", (e) => {
      const task = e.target.parentNode;

      if (e?.target?.parentNode?.parentNode?.id) {
        if (e.target.parentNode.parentNode.id === "toDo") {
          toDoForDoing(e.target.innerText);
          task.remove();
          doing.appendChild(task);
          // console.table(abstractPlan)
          const currentAbstractPlanString = JSON.stringify(abstractPlan);
          localStorage.setItem("abstractPlan", currentAbstractPlanString);
        } else if (e.target.parentNode.parentNode.id === "doing") {
          doingForDone(e.target.innerText);
          task.remove();
          done.appendChild(task);
          // console.table(abstractPlan)
          const currentAbstractPlanString = JSON.stringify(abstractPlan);
          localStorage.setItem("abstractPlan", currentAbstractPlanString);
        } else if (e.target.parentNode.parentNode.id === "done") {
          doneForToDo(e.target.innerText);
          task.remove();
          toDo.appendChild(task);
          // console.table(abstractPlan)
          const currentAbstractPlanString = JSON.stringify(abstractPlan);
          localStorage.setItem("abstractPlan", currentAbstractPlanString);
        }
      }
    });
  }

  function excludePlan(word) {
    const indexTodo = abstractPlan.todo.indexOf(word.innerText);
    if (indexTodo !== -1) {
      abstractPlan.todo.splice(indexTodo, 1);
    }

    const indexDoing = abstractPlan.doing.indexOf(word.innerText);
    if (indexDoing !== -1) {
      abstractPlan.doing.splice(indexDoing, 1);
    }

    const indexDone = abstractPlan.done.indexOf(word.innerText);
    if (indexDone !== -1) {
      abstractPlan.done.splice(indexDone, 1);
    }
  }

  // bug para corrigir no abstractPlan

  function startToDoList() {
    let abstractPlanLocal = localStorage.getItem("abstractPlan");
    abstractPlanLocalStorage = JSON.parse(abstractPlanLocal);
    abstractPlan = abstractPlanLocalStorage;
    console.log(abstractPlanLocal);

    if (abstractPlan) {
      // const currentAbstractPlan = JSON.stringify(abstractPlan)
      // localStorage.setItem("abstractPlan", currentAbstractPlan)
      abstractPlan.todo.forEach((task, i) => {
        const li = document.createElement("li");
        const h1 = document.createElement("h1");
        const img = document.createElement("img");

        li.id = `tsk-${i}-li`;
        img.id = `tsk-${i}-img`;
        li.className = "task";

        h1.innerText = task;
        img.src = "./src/trash3-fill.svg";
        img.className = "trash";

        toDo.appendChild(li);
        li.append(h1, img);

        const abstractPlanString = JSON.stringify(abstractPlan);
        localStorage.setItem("abstractPlan", abstractPlanString);
        li.addEventListener("click", (e) => {
          const task = e.target.parentNode;

          if (e?.target?.parentNode?.parentNode?.id) {
            if (e.target.parentNode.parentNode.id === "toDo") {
              toDoForDoing(e.target.innerText);
              task.remove();
              doing.appendChild(task);
              // console.table(abstractPlan)
              const currentAbstractPlanString = JSON.stringify(abstractPlan);
              localStorage.setItem("abstractPlan", currentAbstractPlanString);
            }
          }
        });

        img.addEventListener("click", (e) => {
          const word = e.target.parentNode.firstChild;
          excludePlan(word);
          console.log(word.innerText);
          e.target.parentNode.remove();
          const currentAbstractPlanString = JSON.stringify(abstractPlan);
          localStorage.setItem("abstractPlan", currentAbstractPlanString);
        });
      });

      abstractPlan.doing.forEach((task, i) => {
        const li = document.createElement("li");
        const h1 = document.createElement("h1");
        const img = document.createElement("img");

        li.id = `tsk-${i}-li`;
        img.id = `tsk-${i}-img`;
        li.className = "task";

        h1.innerText = task;
        img.src = "./src/trash3-fill.svg";
        img.className = "trash";

        doing.appendChild(li);
        li.append(h1, img);

        const abstractPlanString = JSON.stringify(abstractPlan);
        localStorage.setItem("abstractPlan", abstractPlanString);
        li.addEventListener("click", (e) => {
          const task = e.target.parentNode;

          if (e?.target?.parentNode?.parentNode?.id) {
            if (e.target.parentNode.parentNode.id === "doing") {
              doingForDone(e.target.innerText);
              task.remove();
              done.appendChild(task);
              // console.table(abstractPlan)
              const currentAbstractPlanString = JSON.stringify(abstractPlan);
              localStorage.setItem("abstractPlan", currentAbstractPlanString);
            }
          }
        });

        img.addEventListener("click", (e) => {
          const word = e.target.parentNode.firstChild;
          excludePlan(word);
          console.log(word.innerText);
          e.target.parentNode.remove();
          const currentAbstractPlanString = JSON.stringify(abstractPlan);
          localStorage.setItem("abstractPlan", currentAbstractPlanString);
        });
      });

      abstractPlan.done.forEach((task, i) => {
        const li = document.createElement("li");
        const h1 = document.createElement("h1");
        const img = document.createElement("img");

        li.id = `tsk-${i}-li`;
        img.id = `tsk-${i}-img`;
        li.className = "task";

        h1.innerText = task;
        img.src = "./src/trash3-fill.svg";
        img.className = "trash";

        done.appendChild(li);
        li.append(h1, img);

        const abstractPlanString = JSON.stringify(abstractPlan);
        localStorage.setItem("abstractPlan", abstractPlanString);
        li.addEventListener("click", (e) => {
          const task = e.target.parentNode;

          if (e?.target?.parentNode?.parentNode?.id) {
            if (e.target.parentNode.parentNode.id === "done") {
              doneForToDo(e.target.innerText);
              task.remove();
              toDo.appendChild(task);
              // console.table(abstractPlan)
              const currentAbstractPlanString = JSON.stringify(abstractPlan);
              localStorage.setItem("abstractPlan", currentAbstractPlanString);
            }
          }
        });

        img.addEventListener("click", (e) => {
          const word = e.target.parentNode.firstChild;
          excludePlan(word);
          console.log(word.innerText);
          e.target.parentNode.remove();
          const currentAbstractPlanString = JSON.stringify(abstractPlan);
          localStorage.setItem("abstractPlan", currentAbstractPlanString);
        });
      });
    }
  }

  function toDoForDoing(value) {
    const index = abstractPlan.todo.findIndex((i) => i === value);
    abstractPlan.todo.splice(index, 1);
    abstractPlan.doing.push(value);
  }

  function doingForDone(value) {
    const index = abstractPlan.doing.findIndex((i) => i === value);
    abstractPlan.doing.splice(index, 1);
    abstractPlan.done.push(value);
  }

  function doneForToDo(value) {
    const index = abstractPlan.done.findIndex((i) => i === value);
    abstractPlan.done.splice(index, 1);
    abstractPlan.todo.push(value);
  }

