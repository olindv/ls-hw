/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
/* Блок с надписью "Загрузка" */
const loadingBlock = document.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = document.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = document.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = document.querySelector('#filter-result');
let cityArr = [];

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    const fullRegister = full.toLowerCase();
    const chunkRegister = chunk.toLowerCase();

    if (fullRegister.includes(chunkRegister)) {
        return true;
    }

    return false;    
}

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
            .then(response => response.json())
            .then(towns => {
                towns.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                })
                resolve(towns);
            })
            .catch(() => {
                reject();
            })
            
    });
}

function preLoad() {
    
    loadTowns().then(response => {
        cityArr = response;
        filterBlock.style.display = 'block';
        loadingBlock.style.display = 'none';
    }).catch(() => {
        let button = document.createElement('button');

        loadingBlock.innerHTML = 'Не удалось загрузить города';
        button.textContent = 'Повторить';
        button.addEventListener('click', preLoad);
        if (!document.querySelector('button')) {
            homeworkContainer.append(button);
        }
    });
}

filterInput.addEventListener('keyup', function() {
    filterResult.innerHTML = '';

    let getValue = filterInput.value;

    if (getValue.length) {
        for (let item of cityArr) {
            if (isMatching(item.name, getValue)) {
                const newDiv = document.createElement('div');

                newDiv.textContent = item.name;
                filterResult.append(newDiv);
            }
        }
    }
});

preLoad();

export {
    loadTowns,
    isMatching
};
