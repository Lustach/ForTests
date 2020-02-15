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










///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
//ЗДЕСЬ НАЧИНАЕТСЯ УЛЫБКА
// var wiz = Array(1,2)
// wiz[-2]='opa'
// console.log(wiz,'wiz')
// console.log(typeof (wiz));
// console.log(wiz.length);

// function alphabetPosition(text) {
//     if(text)
//     return text;
//   }

////// Чтобы не ебаться с округлением числа (0,1+0,2=0,3000000004) юзать obj.toFixed(число(количество цифр после запятой))
// console.log(61/10);

// function alphabetPosition(text) {
//     let result = '';
//     for(i=0;i<text.length;i++) {
//         if(text[i].charCodeAt(0)>=97&&text.charCodeAt(0)<=127){
//             result += ` ${text[i].charCodeAt(0)-96}`;
//         }
//         else if(text[i].charCodeAt(0)>=65 && text[i].charCodeAt(0)<=97){
//             result += ` ${text[i].charCodeAt(0)-64}`;
//         }
//     }
//     return result
//   }

//   console.log('Z'.charCodeAt(0));
//   console.log(alphabetPosition('The sunset sets at twelve o\' clock.'));

// ///////////
// let name ="jhon"
// function first() {
//     console.log('1')
//     second()
//     console.log('2')
// }
// function second() {
//     console.log('21')
//     third()
//     console.log('22')
// }
// function third() {
//     console.log('third');
// }
// first()

// let value = 0.6 +0.7
// value=Number(value.toFixed(1))
// console.log(value);
// obj={
// }
// obj.product='iphone'
// obj.price=1000
// obj.currency='dollar'
// obj.details={model:'',color:''}
// console.log(obj);

/////

// camelize("list-style-image") == 'listStyleImage';
// camelize("-webkit-transition") == 'WebkitTransition';
// console.log("list-style-image".split(''));

// Здесь начинается список функций

// 1.из кебаба в верблюда)
let result = function camelize(text) {

  return text.split('-').map((item,index,array)=>{
    return index ==0? item : item[0].toUpperCase()+ item.slice(1)
  }).join('')

};
// console.log(result("my-short-string"));

// 2.обрезает всё до first и всё после second
let array = [2,5,1,123,4,5,5,7,78,5,2]
function filtered(array,first,second) {
    return array.slice(first,second)
}
// console.log(filtered(array,1,array.length-1))
/////////////////

// 3. обрезает всё вне диапазона ЗНАЧЕНИЙ(поиск значений == start && end)
function filterWithDelete(array,start,end) {
    return array.filter((item,index)=>{
        return item>=start && item <=end
    })
}
// console.log(filterWithDelete(array,2,5));
// 4. Сортировка по убыванию
function sortByLess(array) {
    return array.sort((a,b)=>{
        return b - a
    })
}
// console.log(sortByLess(array))
// let arr = ["HTML", "JavaScript", "CSS"];

// arr=arr.sort()
// console.log(arr);
// 5. Калькулятор с возможностью добавления функций(недописан)
function Calculator(str){
    this.string = null
    this.calculate=(str)=>{
        // console.log(str.includes('+'));
        let result = null;
        try {
            switch (str.includes('+')) {
                case true:
                    str = str.split('+')
                    result = str.reduce((sum, current) => parseInt(sum) + parseInt(current),0)
                    break;
                case false:
                    str = str.split('+')
                    result = str.reduce((sum, current) => parseInt(sum) - parseInt(current),0)
                    break;
            }
        }
        catch(err) {
            console.log(err);
            return err
        }
        return result
    }
    this.addMethod=(name, func)=>{
        
        return
    }
}

// const calc = new Calculator()
// console.log(calc.calculate('1-2'))
// calc.addMethod('*')

// 6. Выборка определённых полей объекта(позже решить через деструктурирование)
let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let users = [ vasya, petya, masha ];

let names= users.map((item,index)=>{
    return item.name
    // return {name:item.name,ages:item.name+item.age}
})
console.log(names);

// 7. Трансформировать массив объектов в другой массив объектов(с другими ключами)
// смотреть решение выше в коментах
//8. https://learn.javascript.ru/array-methods#tasks


function minus(first){
    return function ret(second) {
        return first - second
    }
}
console.log(minus(10)(6));
let result1 = function multiplyMaker(params) {
    return function hell(params1) {
        console.log(params);
    }
}

result1(1)

// console.log(document.querySelector('div').children);//первый див и его доч узлы
// let tuple = null
// if(document.querySelector('div').children==document.querySelector('div').firstElementChild)
// console.log('a');

// if (document.body.children) {
//     const children = document.body.children;
  
//     for (var i = 1; i < children.length - 1; ++i) {
//       console.log(children[i])
//     }
//   }
// multiplyMaker(2)
let btnMsg=document.querySelector('#btn-msg')
// btnMsg.addEventListener('mouseenter',(e)=>{
//     // preventdefault()
//     // console.log(e);
//     console.log(btnMsg.textContent);
//     // alert(btnMsg.textContent)
//     // btnMsg.style.color='red'
//     // btnMsg.classList.add('changeColor')
//     btnMsg.classList.add('color')

// },)
// const elem = document.querySelector('#tag').textContent
// document.body.addEventListener('click',(e)=>{
//     console.log(e.srcElement.tagName);//srcElement==target
//     document.querySelector('#tag').textContent= elem + e.srcElement.tagName
// })

// let btnGenerate = document.querySelector('#btn-generate')
// btnGenerate.addEventListener('click',(e)=>{
//     let ul = document.querySelector('ul')
//     let allLi= document.querySelectorAll('li')
//     let node = document.createElement("li");                 // Create a <li> node
//     let textnode = document.createTextNode(`Item ${allLi.length+1}`); 
//     console.log(node);
//     node.appendChild(textnode)
//     ul.appendChild(node)
// })


let ulElem = document.querySelector('ul')
console.log(ulElem);

ulElem.addEventListener('click',(e)=>{
    console.log(e.target.parentNode);
    let li = e.target.parentNode.children
    console.log(li);
    
    li[1].classList.toggle('d-none')
    // console.log(e.target.classList.contains('dropdown-item'),'aaaaaaa');
    // let li = document.getElementsByClassName('dropdown-item ')
    // console.log(li,'tut');


})