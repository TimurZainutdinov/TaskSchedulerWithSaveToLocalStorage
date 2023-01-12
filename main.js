const form = document.getElementById("addForm");
const itemsList = document.getElementById("items");
const filter = document.getElementById("filter");

// *Добавление новой задачи прослушка события
// *Adding a new event listener task
form.addEventListener("submit", addItem);

// *Удаление элемента - прослушка клика
// *Deleting an element - listening for a click
itemsList.addEventListener("click", removeItem);

// *Фильтрация списка дел - прослушка ввода
// *To-Do List Filtering - Input Listening
filter.addEventListener("keyup", filterItems);

// *Запись данных в localStorage
// *Writing data to localStorage
let itemStorage = [];

// *Загрузка задач при старте страницы
// *Loading tasks on page start
if (localStorage.getItem('itemStorage')) {
    itemStorage = JSON.parse(localStorage.getItem('itemStorage'));
}

itemStorage.forEach(function (item) {

    const newItemText = item;

     let newElement = document.createElement("li");
     newElement.className = "list-group-item";
 
     let newTextNode = document.createTextNode(newItemText);
     newElement.appendChild(newTextNode);
 
     let deleteBtn = document.createElement("button");
     deleteBtn.appendChild(document.createTextNode("Удалить"));

     deleteBtn.className = "btn btn-light btn-sm float-right";
     deleteBtn.dataset.action = "delete";
 
     newElement.appendChild(deleteBtn);
     console.log("addItem -> newElement", newElement);
 
     itemsList.prepend(newElement);
});


// *Добавление новой задачи функция
// *Adding a new task feature
function addItem(e) {
    // *Отменяем отправку формы
    // *Cancel form submission
    e.preventDefault();

    // *Находим инпут с текстом для новой задачи
    // *Finding an input with text for a new task
    let newItemInput = document.getElementById("newItemText");
    // *Получаем текст из инпута
    // *Get text from input
    let newItemText = newItemInput.value;

    // *Создаем элемент для новой задачи
    // *Create an element for a new task
    let newElement = document.createElement("li");
    newElement.className = "list-group-item";

    // *Добавим текст в новый элемент
    // *Adding text to a new element
    let newTextNode = document.createTextNode(newItemText);
    newElement.appendChild(newTextNode);

    // *Создаем кнопку
    // *Create a button
    let deleteBtn = document.createElement("button");
    // *Добавляем текст
    // *Adding text
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    // *Добавляем CSS class
    // *Add CSS class
    deleteBtn.className = "btn btn-light btn-sm float-right";
    // *Добавляем data атрибут
    // *Adding the data attribute
    deleteBtn.dataset.action = "delete";

    // *Помещаем кнопку внутрь тега li
    // *Putting the button inside the li tag
    newElement.appendChild(deleteBtn);

    // *Добавляем новую задачу в список со всеми задачами
    // *Add a new task to the list with all tasks
    itemsList.prepend(newElement);

    // *Добавляю элементы в localStorage
    // *add items to localStorage
    itemStorage.push(newItemText)

    const elementInStorage = JSON.stringify(itemStorage);
    localStorage.setItem('itemStorage', elementInStorage);

    // *Очистим поле добавления новой задачи
    // *Clear the field for adding a new task
    newItemInput.value = "";
}

// *Удаление элемента - ф-я
// *Deleting an element - f-th
function removeItem(e) {
    if (
        e.target.hasAttribute("data-action") &&
        e.target.getAttribute("data-action") == "delete"
    ) {
        if (confirm("Удалить задачу?")) {
            e.target.parentNode.remove();
        } else {
            return confirm
        }

        // *Удаление из массива из списка задач
        // *Removing from an array from the list of tasks
        const itemStorageText = e.target.closest('.list-group-item').firstChild.textContent;

        const indexStorage = itemStorage.findIndex(function (item){
            if (itemStorageText === item) {
                return true
            }
        });
        // *Удаление задачи из массива itemStorage
        // *Removing a task from the itemStorage array
        if (indexStorage !== -1) {
            itemStorage.splice(indexStorage, 1)
        }
        // *Обновляем localStorage
        // *Update localStorage
        localStorage.setItem('itemStorage', JSON.stringify(itemStorage));

    }
}


// *Фильтрация списка дел ф-я
// *To-do list filtering
function filterItems(e) {
    // *Получаем фразу для поиска и переводим ее в нижний регистр
    // *Получаем фразу для поиска и переводим ее в нижний регистр
    let searchedText = e.target.value.toLowerCase();

    // *1. Получаем списко всех задач
    // *1. Get a list of all tasks
    let items = itemsList.querySelectorAll("li");

    // *2. Перебираем циклом все найденные теги li с задачами
    // *2. Loop through all found li tags with tasks
    items.forEach(function(item) {
        // *Получаем текст задачи из списка и переводим его в нижний регистр
        // *We get the text of the task from the list and translate it into lowercase
        let itemText = item.firstChild.textContent.toLowerCase();

        // *Проверяем вхождение искомой подстроки в текст задачи
        // *We check the occurrence of the desired substring in the text of the task
        if (itemText.indexOf(searchedText) != -1) {
            // *Если вхождение есть - показываем элемент с задачей
            // *If there is an entry, we show the element with the task
            item.style.display = "block";
        } else {
            // *Если вхождения нет - скрываем элемент с задачей
            // *If there is no entry, hide the element with the task
            item.style.display = "none";
        }
    });
}