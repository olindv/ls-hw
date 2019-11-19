/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {

        fn(array[i], i, array) 
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArr = [];

    for (let i = 0; i < array.length; i++) {
        
        newArr.push(fn(array[i], i, array));
    }

    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let i = 0;
    let accamulator = initial || array[i++];

    for (i; i<array.length; i++) {
        accamulator = fn(accamulator, array[i], i, array);
    }

    return accamulator;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let newArr = [];

    // eslint-disable-next-line guard-for-in
    for (var prop in obj) {
        newArr.push(prop.toUpperCase());
    }

    return newArr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let newArr = [];
    let firstValue = 0;
    let arrLength = array.length;
    let lastValue = arrLength;

    if (from === 0 && to === 0 || from >= arrLength) {
        return []
    }
    if (to > arrLength) {
        to = arrLength;
    }
    if (Math.abs(from) >= arrLength) {
        from = 0;
    }
    if (from < 0) {
        firstValue = arrLength - Math.abs(from);
    } else if (from > 0) {
        firstValue = Math.abs(from);
    } else if (from === 0) {
        firstValue = 0;
    } 
    if (to < 0) {
        lastValue = arrLength - Math.abs(to);
    } else if (to > 0) {
        lastValue = Math.abs(to);
    } else if (to === 0) {
        lastValue = 0;
    } 
    for (let i = firstValue; i < lastValue; i++) {
        newArr.push(array[i]);
    }
  
    return newArr;
    
}
  
// var arr = [1, 5, 464, 22, 8, 'jbubu', 343, 66, 32, 35];

// slice(arr, 1, 5);
//   console.log(slice(arr, 1, 5));

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
// eslint-disable-next-line no-unused-vars
let newObj = {};

function createProxy(obj) {
    obj = new Proxy(obj, {
        set(target, prop, val) {
            if (typeof val == 'number') {
                target[prop] = val * val;

                return true;
            } 
            
        }
    });

    return obj;
}
newObj = createProxy(newObj);

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};