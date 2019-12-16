/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve()
            
        }, seconds * 1000);
    })

    return promise
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    const url =
        'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    // Способ №1
    // const promise = new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();

    //     xhr.open('GET', url);
    //     xhr.send();
    //     xhr.addEventListener('load', () => {
    //         if (xhr.status < 400) {
    //             let towns = JSON.parse(xhr.responseText);

    //             towns.sort((a, b) => {
    //                 if (a.name > b.name) {
    //                     return 1;
    //                 }
    //                 if (a.name < b.name) {
    //                     return -1;
    //                 }

    //                 return 0;
    //             });
    //             resolve(towns);
    //         } else {
    //             reject(new Error('ошибка'));
    //         }
    //     });
    // });

    // return promise;

    // Способ №2
    return new Promise(resolve => {
        fetch(url)
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
                });
                resolve(towns)
                
            });
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
