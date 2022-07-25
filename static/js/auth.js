import {request} from "./ajax.js";

const loginForm = document.querySelector('#login_form')
const regForm = document.querySelector('#registration_form')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        email: loginForm.email.value,
        password: loginForm.password.value,
    }
    request('/login', 'POST', data).then(result => {
        if (result.status === "Success") {
            window.location = result.redirect;
        } else {
            new Toast({
                title: false,
                text: result.msg,
                theme: 'light',
                autohide: true,
                interval: 10000
            });
        }
    })
})
regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        email: regForm.email.value,
        password: regForm.password.value,
    }
    request('/registration', 'POST', data).then(result => {
        if (result.status === "Success") {
            window.location = result.redirect;
        } else {
            new Toast({
                title: false,
                text: result.msg,
                theme: 'light',
                autohide: true,
                interval: 10000
            });
        }
    })
})