const BASE_URL = 'http://localhost:3000/monsters'
const monstersContainer = document.getElementById('monster-container')
const monsterFormHolder = document.getElementById('create-monster')
const prevPageBtn = document.getElementById('back')
const nextPageBtn = document.getElementById('forward')

const renderMonsterForm = () => {
  let monsterForm = document.createElement('form')
  monsterForm.id = "monster-form"
  monsterForm.innerHTML = `
  <input id="name" type="text" placeholder="name...">
  <input id="age" type="number" placeholder="age...">
  <input id="description" placeholder="description...">
  <button>Create</button>
  `
  monsterForm.addEventListener('submit', addMonster)
  monsterFormHolder.appendChild(monsterForm)
}

const addMonster = (e) => {
  e.preventDefault()
  const monsterName = e.target.querySelector('#name').value
  const monsterAge = e.target.querySelector('#age').value
  const monsterDescription = e.target.querySelector('#description').value

  return fetch(BASE_URL, {
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    // data: JSON.stringify({name: monsterName, age: Number(monsterAge), description: monsterDescription})
    body: JSON.stringify({name: monsterName, age: Number(monsterAge), description: monsterDescription})
  })
  .then(res => res.json())
  .then(wat => console.log(wat))
}

const getMonsters = (n) => {
  currentMonsters = []
  fetch(`${BASE_URL}/?_limit=50&_page=${n}`)
  .then(resp => resp.json())
  .then(data => {
    monstersContainer.innerHTML = ''
    data.forEach(monster => {
      currentMonsters.push(monster)
      renderMonster(monster)
    });
  })
}

const renderMonster = (monster) => {
  let monsterDiv = document.createElement('div')
  monsterDiv.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>${monster.age}</h4>
    <p>${monster.description}</p>
  `
  monstersContainer.appendChild(monsterDiv)
}

const nextPage = () => {
  console.log(getMonsters(++page))
  // if(currentMonsters.length < 1) {
  //   setTimeout(() => {
  //     monstersContainer.innerHTML = "<br>No monsters here..."
  //   }, 2000);
  // }
}
const prevPage = () => {
  if (page >= 1) {
    getMonsters(--page)
  }
}

let page = 1;
let currentMonsters = []
renderMonsterForm()
getMonsters(page)

prevPageBtn.addEventListener('click', prevPage)
nextPageBtn.addEventListener('click', nextPage)