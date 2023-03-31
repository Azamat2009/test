const baseURL = "http://localhost:3000/users";
let about = document.querySelector('h1')
let salary = document.querySelector('h2')
let id = location.search
fetch(baseURL + id)
    .then(res => res.json())
    .then(user => {
        user = user[0]
        about.innerHTML = 'Про ученика ' + user.fullname
        salary.innerHTML = 'Зарплата ' + user.salary + '$'
    })