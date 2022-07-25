import {request} from "./ajax.js"

const addToCartBtns = document.querySelectorAll('.add-to-cart-btn')

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
            request(`/add_to_cart${btn.getAttribute('data-prodId')}`, 'GET').then(res => {
                new Toast({
                    title: false,
                    text: res.msg,
                    theme: 'light',
                    autohide: true,
                    interval: 10000
                });
                btn.textContent = "Добавлено!";
            }).catch(() => {
                new Toast({
                    title: false,
                    text: 'Вам необходимо войти в систему',
                    theme: 'light',
                    autohide: true,
                    interval: 10000
                });
            })
        })
    })