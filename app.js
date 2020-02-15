//логику работы с данными и логику работы с домом нужно разбивать на отдельные функции
//e.preventDefault()
//

const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  }
];

let doc = document;
(function(arrOfTasks) {
  const object = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});
  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  //doc.forms возвращает коллекцию форм, где по имени можно получить нужную
  const form = doc.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];

  renderAllTasks(object);
  form.addEventListener("submit", onFormSubmitHandler);

  function renderAllTasks(tasksList) {
    // в этой функции создаётся фрагмент списка, так как циклом проходить "дорого"
    const fragment = doc.createDocumentFragment();
    Object.values(tasksList).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    console.log(fragment);
    listContainer.appendChild(fragment);
  }
  //передаём объект, генерируем один элемент li
  function listItemTemplate({ _id, title, body } = {}) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    li.setAttribute('data-task-id',_id)
    console.log(li);
    const span = doc.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";
    if (object[_id].completed) {
      li.style.backgroundColor = "wheat";
    } else {
      li.style.backgroundColor = "floralwhite";
    }
    const btn = doc.createElement("button");
    btn.textContent = "Delete";
    btn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");
    const completed = doc.createElement("button");
    if (object[_id].completed) {
      completed.textContent = "Готово";
    } else {
      completed.textContent = "!Готово";
    }
    completed.classList.add("btn", "btn-primary", "complete");
    const article = doc.createElement("p");
    article.textContent = body;
    article.classList.add("mt-2", "w-100");
    ///если бы элементов было много чтобы не заниматься копипастой, можно создать массив, и перебирать массив(правда не знаю что быстрее)
    li.appendChild(span);
    li.appendChild(btn);
    li.appendChild(completed);
    li.appendChild(article);
    return li;
  }

  function onFormSubmitHandler(e) {
    //ууураааааа, нет перезагрузок)
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    console.log(inputTitle, bodyValue, "HERE");
    if (!titleValue || !bodyValue) {
      alert("Input Data");
      return;
    }
    //создаём функцию для манипуляции данными и отдельно для дома
    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    //insertAdjacentElement позволяет вставить элемент в одну из 4 позиций
    listContainer.insertAdjacentElement("afterbegin", listItem);
    form.reset()
  }
  function createNewTask(title, body) {
    console.log(object, "OBJECT");
    console.log(title);
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task+${Math.random()}`
    };
    console.log(newTask, "newTask");
    object[newTask._id] = newTask;
    return { ...newTask };
  }
  // const deleteBtn = doc.querySelectorAll(".delete-btn");
  // deleteBtn.addEventListener("click",deleteItem)
  ////// вообще способ снизу самый простой, но на деле нет, + он затратный так как надо на каждый батон навесить прослушку
  // console.log(listContainer,'listik');
  // const ul = doc.getElementsByClassName(".list-group");
  listContainer.addEventListener('click',changeCompleteButton)

  function changeCompleteButton(e) {
    if(e.target.closest('button')){
      // listContainer.remove(e.target.closest('li'))
      if(e.target.textContent=='Delete'){
        console.log(e.target);
        console.log(e.target.parentElement);
        listContainer.removeChild(e.target.parentElement)// или же closest
        delete object[e.target.parentElement.dataset.taskId]
      }
      else{
        
        if(e.target.textContent=='Готово'){
          console.log('READ');
          e.target.textContent='!Готово'
          e.target.parentElement.style.backgroundColor="floralwhite"
          console.log(object,'do');
          object[e.target.parentElement.dataset.taskId].completed=false
          console.log(object,'posle');
        }
        else{
          e.target.textContent='Готово'
          e.target.parentElement.style.backgroundColor="wheat"
        }
      }

    }
  }


  function deleteItem(e) {
    console.log(ul);
    console.log("HELLOBUDDY");
    console.log(e);
    console.log(this.parentElement);

  }
})(tasks);