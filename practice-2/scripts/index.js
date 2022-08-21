
async function renderData () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  const tableBody = document.querySelector(".table__body");
  data.forEach((el, i) => {
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

renderData();