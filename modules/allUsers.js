const baseURL = "http://localhost:3000/users";

let wrapper = document.querySelector('ul');
let newNameInp = document.querySelector('#newUserName')
let newSalaryInp = document.querySelector('#newSalary')
let addButton = document.querySelector('#addUserBtn')
let allUserBtn = document.querySelector('.left-btn')
let increasBtn = document.querySelector('.middle-btn')
let btn1000 = document.querySelector('.right-btn')
let starred = false
let award = document.querySelector('#award')
let searchInp = document.querySelector('#search')

export function allUsers() {
    allUserBtn.addEventListener('click', () => {
        fetch(baseURL)
          .then((response) => response.json())
          .then((data) => {
            wrapper.innerHTML = '';
            data.forEach((user) => {
              let userDiv = document.createElement('li');
              userDiv.setAttribute('data-id', user.id);
              let rightLi = document.createElement('div')
              let names = document.createElement('h2')
              let leftLi = document.createElement('div')
              let salary = document.createElement('h2')
              let starSpace = document.createElement('span')
              let imgs = document.createElement('div')
              let deleteImg = document.createElement('img')
              let increaseImg = document.createElement('img')
              let star = document.createElement('img')
              let userPage = document.createElement('a')
              
              userPage.href = `/pages/worker.html?id=${user.id}`
      
              star.classList.add('star')
              rightLi.classList.add('right-li')
              leftLi.classList.add('left-li')
              imgs.classList.add('imgs')
              deleteImg.classList.add('deleteImg')
              increaseImg.classList.add('increaseImg')
      
              starSpace.innerHTML = '........................................'
              names.innerHTML = user.fullname
              salary.innerHTML = user.salary + '$'
      
              star.src = './public/icons/star.svg'
              deleteImg.src = './public/icons/trash.svg'
              increaseImg.src = './public/icons/activity.svg'
      
              rightLi.append(starSpace)
              userPage.append(names)
              leftLi.append(salary,imgs,increaseImg,deleteImg,star)
              userDiv.append(userPage,rightLi,leftLi)
              wrapper.append(userDiv);


          if (user.starred === true) {
            star.classList.remove('star');
            star.classList.add('star-active');
          }
          rightLi.onclick = () => {
            const userId = user.id;
            const updatedUser = { ...user, starred: !user.starred };
            fetch(`${baseURL}/${userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedUser)
            })
              .then(() => {
                user.starred = !user.starred;
                if (user.starred) {
                  star.classList.add('star-active');
                } else {
                  star.classList.remove('star-active');
                  star.classList.add('star')
                }
              })
              .catch((error) => console.log(error));
          };
    
          function filterUsers() {
            const searchText = searchInp.value.toLowerCase();
            const users = wrapper.querySelectorAll('li');
            users.forEach(user => {
              const name = user.querySelector('h2').textContent.toLowerCase();
              if (name.includes(searchText)) {
                user.style.display = '';
              } else {
                user.style.display = 'none';
              }
            });
          }
    
          searchInp.addEventListener('input', filterUsers);
    
          searchInp.addEventListener('keyup', function (event) {
            if (event.key === 'Backspace' || event.key === 'Delete') {
              if (searchInp.value === '') {
                wrapper.querySelectorAll('li').forEach(user => user.style.display = '');
              }
            }
          });
          
    
          deleteImg.onclick = () => {
            const userId = user.id;
            fetch(`${baseURL}/${userId}`, { method: 'DELETE' })
              .then(() => {
                userDiv.remove();
                const increaseUsers = data.filter(user => user.increase);
                award.innerText = `Премию получат: ${increaseUsers.length}`;
              })
              .catch((error) => console.log(error));
          }
          
          if (user.increase) {
            names.classList.add('h2-active');
            salary.classList.add('h2-active');
            increaseImg.dataset.active = true;
          }
          increaseImg.onclick = () => {
            const userId = user.id;
            const userSalary = user.salary;
            const updatedUser = { ...user, increase: !user.increase };
            fetch(`${baseURL}/${userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedUser)
            })
            .then(() => {
              user.increase = !user.increase;
              if (user.increase) {
                names.classList.add('h2-active');
                salary.classList.add('h2-active');
              } else {
                names.classList.remove('h2-active');
                salary.classList.remove('h2-active');
              }
            })
            .catch((error) => console.log(error));
          };
    
          
          
    
          salary.onclick = () => {
            const oldSalary = user.salary;
            const salaryInput = document.createElement('input');
            salaryInput.type = 'number';
            salaryInput.value = oldSalary;
            salary.replaceWith(salaryInput);
    
            salaryInput.onblur = () => {
              const newSalary = salaryInput.value;
              if (newSalary !== oldSalary) {
                const updatedUser = { ...user, salary: newSalary };
                fetch(`${baseURL}/${user.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedUser)
                })
                .then(() => {
                  salaryInput.replaceWith(salary);
                  salary.innerHTML = newSalary + '$';
                  user.salary = newSalary;
                  newNameInp.value = '';
                  newSalaryInp.value = '';
                })
                .catch((error) => console.log(error));
              } else {
                salaryInput.replaceWith(salary);
              }
            };
          }
    
    
    
    
           addButton.onclick = () => {
        const name = newNameInp.value;
        const salary = newSalaryInp.value;
      
        const newUser = { 
          fullname: name, salary: salary, increase: false
        };
      
        fetch(baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
        .then((response) => response.json())
        .then((data) => {
          let userDiv = document.createElement('li');
          userDiv.setAttribute('data-id', data.id); 
          let rightLi = document.createElement('div')
          let names = document.createElement('h2')
          let leftLi = document.createElement('div')
          let salary = document.createElement('h2')
          let imgs = document.createElement('div')
          let deleteImg = document.createElement('img')
          let increaseImg = document.createElement('img')
          let star = document.createElement('img')
      
          star.classList.add('star')
          rightLi.classList.add('right-li')
          leftLi.classList.add('left-li')
          imgs.classList.add('imgs')
          deleteImg.classList.add('deleteImg')
          increaseImg.classList.add('increaseImg')
      
          names.innerHTML = data.fullname
          salary.innerHTML = data.salary + '$'
      
          star.src = './public/icons/star.svg'
          deleteImg.src = './public/icons/trash.svg'
          increaseImg.src = './public/icons/activity.svg'
      
      
          rightLi.append(names)
          leftLi.append(salary,imgs,increaseImg,deleteImg,star)
          userDiv.append(rightLi,leftLi)
          wrapper.append(userDiv);
      
          newNameInp.value = '';
          newSalaryInp.value = '';
    
          leftLi.onclick = () => {
            const userId = user.id;
            const updatedUser = { ...user, starred: !user.starred };
            fetch(`${baseURL}/${userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedUser)
            })
              .then(() => {
                user.starred = !user.starred;
                if (user.starred) {
                  star.classList.add('star-active');
                } else {
                  star.classList.remove('star-active');
                  star.classList.add('star')
                }
              })
              .catch((error) => console.log(error));
          };
      
          deleteImg.onclick = () => {
            const userId = data.id;
            fetch(`${baseURL}/${userId}`, { method: 'DELETE' })
              .then(() => {
                userDiv.remove(); 
              })
              .catch((error) => console.log(error));
          }
          
        })
      }
        });
      })
    
          .catch((error) => console.log(error));
          
      });
}
