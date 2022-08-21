const form = document.querySelector(".form");
const formInput = document.querySelector(".form__input");
const submitBtn = document.querySelector(".form__button");
const tableBody = document.querySelector(".table__body");

const apiData = await fetch("https://jsonplaceholder.typicode.com/posts");
const initialList = await apiData.json(); //массив данных с сервера
let renderedList = initialList; //массив, который будет отрисован

let clickBySort = false; //переменная с кликом по заголовку сортировки

// отрисовка данных на страницу
function renderData (item) {
  item.forEach((el, i) => {
    //создали строку с нужными столбцами
    const rowElement = document.createElement('tr');
    const cellElementNumber = document.createElement('td');
    const cellElementTitle = document.createElement('td');
    const cellElementBody = document.createElement('td');

    //добавили класс стилей столбцам
    cellElementNumber.classList.add('table__column');
    cellElementTitle.classList.add('table__column');
    cellElementBody.classList.add('table__column');

    //записали данные в столбцы
    cellElementNumber.textContent = i + 1;
    cellElementTitle.textContent = el.title;
    cellElementBody.textContent = el.body;

    //отрисовали столбцы
    rowElement.appendChild(cellElementNumber);
    rowElement.appendChild(cellElementTitle);
    rowElement.appendChild(cellElementBody);

    // отрисовали строки
    tableBody.appendChild(rowElement);
  });
}

//поиск по слову
function search(text) {
  const result = initialList.filter((obj) => obj.title.toLowerCase().includes(text.toLowerCase().trim()));
  while (tableBody.firstChild) {
    tableBody.firstChild.remove();
  }
  renderedList = result;
  renderData(renderedList);
}

//сортировка по возрастанию
function sortElUpper() {
  const sortData = renderedList.sort(function(a, b){
    if(a.title < b.title) return -1;
    if(a.title > b.title) return 1;
  });
  clickBySort = true;
  renderData(sortData);
}

//сортировка по убыванию
function sortELower() {
  const sortData = renderedList.sort(function(a, b){
    if(a.title < b.title) return 1;
    if(a.title > b.title) return -1;
  });
  clickBySort = false;
  renderData(sortData);
};

//функция сортировки
function sort() {
  while (tableBody.firstChild) {
    tableBody.firstChild.remove()
  }

  if(clickBySort) {
    sortELower();
  } else {
    sortElUpper();
  }
};

//функция обработчиков слушателей
function setEventListener() {
  const tableHeading = Array.from(document.querySelectorAll('.table__row'));
  submitBtn.disabled = 'disabled';

  formInput.addEventListener('input', () => {
    if(!formInput.validity.valid) {
      submitBtn.disabled = 'disabled';
      submitBtn.removeEventListener('click', (e) => {
        e.preventDefault();
        search(formInput.value);
      })
    } else {
      submitBtn.disabled = false;
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        search(formInput.value);
      })
    }
  });

  tableHeading.forEach((heading) => {
    heading.addEventListener('click', () => sort())
  });
};

renderData(renderedList);
setEventListener();
