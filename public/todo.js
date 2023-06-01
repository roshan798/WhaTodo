let todoListSection = document.getElementById("todo-list");
let currentEditableTodoId = null;

function toggleClass(destId) {
  document.getElementById(destId)
      .classList
      .toggle('hidden');
}

const addParentEventListener = (parentElement) => {
  parentElement.addEventListener("click", (event) => {
    let targetElement = (event.target.matches('.fa-trash')) ? event.target.parentElement : event.target;

    if (targetElement.matches(".delete-btn")) {
      deleteEventHandler(targetElement);
    } else if (targetElement.matches(".edit-btn")) {
      console.log(targetElement)
      editEventHandler(targetElement)
    } else if (targetElement.matches("input[type='checkbox']")) {
      checkboxEventHandler(targetElement);
    }
  });
};
const editEventHandler = (btn) => {
  let todoElement = btn.parentElement.parentElement.parentElement;
  currentEditableTodoId = todoElement.id.substring(5);
  let titleElement = document.getElementById('title');
  let descriptionElement = document.getElementById('description');
  console.log(titleElement, descriptionElement);
  let todoTitle = todoElement.querySelector('.todo-title')
  let todoDescription = todoElement.querySelector('.todo-description')
  // console.log(todoTitle, todoDescription)
  titleElement.value = todoTitle.innerText;
  descriptionElement.innerText = todoDescription.innerText;
  toggleClass('add-todo-form');
  document.getElementById('_method').value = 'PUT';


}

const deleteEventHandler = async (btn) => {
  let todoElement = btn.parentElement.parentElement.parentElement;
  let todoId = todoElement.id.substring(5);
  try {
    let response = await fetch(`/user/:${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(todoElement.parentElement);
    todoElement = document.getElementById(`todo-${todoId}`);
    todoElement.remove();
    let section = document.getElementById('todo-list');
    if (section.childElementCount == 0) {
      addNotodoElement(section);
    }
  } catch (error) {
    console.log("error");
  }
};

function addSectionElement() {
  let todoListSection = document.createElement("section");
  todoListSection.classList =
    "m-6 p-4 flex flex-col content-center items-center gap-y-2 mx-auto max-w-2xl";
  todoListSection.id = "todo-list";

  let navbar = document.getElementById("navbar");
  navbar.insertAdjacentElement("afterend", todoListSection);
  addParentEventListener(todoListSection);
  document.getElementById("no-todo").remove();
}

function addNotodoElement(section) {
  section.remove();
  let div = document.createElement('div')
  div.classList = 'text-3xl text-center text-violet-800';
  div.id = 'no-todo';
  div.innerHTML = '<p>No Todos available</p>';
  let navbar = document.getElementById("navbar");
  navbar.insertAdjacentElement("afterend", div);
}

const checkboxEventHandler = async (checkbox) => {
  let todo = {
    id: checkbox.id,
    status: checkbox.checked,
  };
  try {
    let response = await fetch("/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const spanElement = checkbox.parentElement.querySelector(".status");
    if (todo.status == false) {
      spanElement.innerHTML = 'Completed'
    }
    else {
      spanElement.innerHTML = 'Pending'
    }
  } catch (error) {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
    else {
      checkbox.checked = true;
    }
  }
}

// *******************//

let form = document.getElementById("new-todo-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  var todo = {
    title: form.elements.title.value,
    description: form.elements.description.value,

  };

  let _method = document.getElementById('_method').value;
  if (_method == 'PUT') {
    todo.id = currentEditableTodoId;
  }
  try {
    const response = await fetch("/user/new", {
      method: _method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    const html = await response.text();
    form.reset();
    if (_method == 'PUT') {
      let todoElement = document.getElementById('todo-' + todo.id)
      let todoTitle = todoElement.querySelector('.todo-title')
      let todoDescription = todoElement.querySelector('.todo-description')
      document.getElementById('description').innerText = "";

      console.log('inside');
      console.log(todoElement, todoTitle, todoDescription)
      todoTitle.innerText = todo.title;
      todoDescription.innerText = todo.description;
    }
    else {
      appendTodoList(html);
    }
    document.getElementById("add-todo-form").classList.toggle("hidden");
  } catch (error) {
    console.error(error);
  }
  finally {
    document.getElementById('_method').value = 'POST';
  }

});

const appendTodoList = (html) => {
  let todoList = document.getElementById("todo-list");
  if (todoList) {
    todoList.insertAdjacentHTML("afterbegin", html);
  } else {
    addSectionElement();
    appendTodoList(html);
  }
};
if (todoListSection != undefined) addParentEventListener(todoListSection);