/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    renderCookieList();
});

addButton.addEventListener('click', () => {
    try {
        if (!addNameInput.value.length || !addValueInput.value.length) {
            throw new Error ('поля: [имя cookie] и [значение cookie] должны быть заполнены');
        }
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        renderCookieList();
        
    } catch (error) {
        alert(error);
    }
});

function renderCookieList() {
    listTable.innerHTML = '';

    if (document.cookie) {
        let cookieObj = parseCookie();

        // eslint-disable-next-line guard-for-in
        for (let key in cookieObj) {
            filterFn (key, cookieObj[key]);
        }
    }
}

function filterFn (key, value) {
    if (filterNameInput.value) {

        if (isMatching(key, value)) {
            createCookieList(key, value);

            return;
        }

    } else {
        createCookieList(key, value);
    }
}

function createCookieList(key, value) {
    let tr = document.createElement('tr');
    let nameTd = document.createElement('td');
    let valueTd = document.createElement('td');
    let buttonDel = document.createElement('button');
    let fragment = document.createDocumentFragment();

    tr.appendChild(nameTd);
    tr.appendChild(valueTd);
    tr.appendChild(buttonDel);
    fragment.appendChild(tr);
    listTable.appendChild(fragment);

    nameTd.textContent = key;
    valueTd.textContent = value;
    buttonDel.textContent = 'Удалить';

    buttonDel.addEventListener('click', () => deleteCookie(key, value));
}
renderCookieList()

function deleteCookie(currentCookie, currentValue) {
    document.cookie = `${currentCookie}=${currentValue}; max-age=-1;`;
    
    let elem = homeworkContainer.querySelector('#list-table tbody tr');

    if (!currentValue) {
        elem.remove();
    }
    renderCookieList();
}

function parseCookie() {
    const cookieItem = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        
        prev[name] = value;

        return prev;
    }, {});

    return cookieItem;
}

function isMatching (param1, param2) {
    if (
        param1.includes(filterNameInput.value) ||
        param2.includes(filterNameInput.value)
    ) {
        return true;
    } 
    
}

