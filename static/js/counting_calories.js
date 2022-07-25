import {request} from "./ajax.js";

const getCalorieNormBtn = document.querySelector('.get-calorie-norm-btn')
const addEatenDishBtn = document.querySelector('.add-product')
const userResultTable = document.querySelector('.user-result-tbody')


getCalorieNormBtn.addEventListener('click', () => {
    getCalorieNorm()
})

addEatenDishBtn.addEventListener('click', () => {
    const name = prompt("Введите название блюда")
    const calories = prompt("Введите калорийность блюда")
    const eaten = document.querySelector('.eaten').textContent
    request('/add_dish', 'POST', {name, calories, eaten}).then(result => {
            new Toast({
                title: false,
                text: result.msg,
                theme: 'light',
                autohide: true,
                interval: 10000
            });
    document.querySelector('.eaten').textContent = result.eaten;
    document.querySelector('.remains').textContent = result.remains;
    userResultTable.insertAdjacentHTML("beforeend", `
            <tr>
                 <td>${result.name}</td>
                 <td>${result.calories}</td>
            </tr>
       `)
   })
})

function getCalorieNorm() {
    const weight = +prompt("Введите свой вес в килограммах")
    const height = +prompt("Введите свой рост в см")
    const age = +prompt("Введите свой возраст в годах")
    const gender = +prompt("Если вы женщина, то введите 0, если мужчина, то 1.")
    const target = +prompt("Какой цели вы хотите достичь? 1 - похудеть, 2 - поддерживать вес, 3 - набрать")
    const activity = +prompt("Какой у вас образ жизни? 1 - сидячий, 2 - тренировки  1-3 раза в неделю," +
        " 3 - тренировки  3-5 раза в неделю, 4 - интенсивные тренировки 6-7 раз в неделю, 5 - несколько тренировок в день")
    let result;
    if (gender) {
        result = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
        result = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }
    if (target == 1) {
        result *= 0.85
    } else if (target == 3) {
        result *= 1.15
    }
    switch (activity) {
        case 1:
            result *= 1.2;
            break;
        case 2:
            result *= 1.375;
            break;
        case 3:
            result *= 1.55;
            break;
        case 4:
            result *= 1.725;
            break;
        case 5:
            result *= 1.9;
            break;
    }
    result = Math.round(result)
    alert("Ваша норма калорий " + result)
    request('/set_norm', 'POST', {norm: result}).then(result => {
        new Toast({
            title: false,
            text: result.msg,
            theme: 'light',
            autohide: true,
            interval: 10000
        });
        document.querySelector('.calorie-norm').textContent = result.norm;
        document.querySelector('.eaten').textContent = result.eaten;
        document.querySelector('.remains').textContent = result.remains;
    })
}

