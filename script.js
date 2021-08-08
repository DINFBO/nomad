
function img_set(){
  const img_arr= ['a1.jpg' , 'a2.jpg' , 'a3.jpg' , 'a4.jpg'];
  const back_img = img_arr[Math.floor(Math.random()*4)];
  document.querySelector('body').style.backgroundImage  =`url(./img/${back_img})`;
}

const API_KEY = '8a4fcbef39045efde0ed3bd441d34a04';

function onGeo(position){
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
 
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const location = data.name;
    const weather = data.weather[0].description;
    document.querySelector('#weather span:first-child').innerHTML=location;
    document.querySelector('#weather span:last-child').innerHTML=weather;
  });

}

function onGeoError(){
  alert('날씨정보를 불러올수 없습니다.');
}

function getClock(){
  const date = new Date();
  const hour = String(date.getHours()).padStart(2,"0");
  const minutes = String(date.getMinutes()).padStart(2,"0");
  const seconds = String(date.getSeconds()).padStart(2,"0");
  document.querySelector('#clock').innerHTML=`NOW <br> ${hour} : ${minutes} : ${seconds} `;

}

let todos =[];
let todoText = document.querySelector('#todoText');
const todoForm = document.querySelector('form');
const todoList = document.querySelector('#todoList');


function ToDoSubmit(event){
  event.preventDefault();
  const newTodo = {
    id : Date.now() ,
    value : todoText.value
  };
  todoText.value = '';
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  viewTodos(newTodo);
}

function deleteTodo(event){
  const li = event.target.parentElement;
  todos = todos.filter( item =>  item.id !== parseInt(li.id));
  li.remove();
  localStorage.setItem("todos", JSON.stringify(todos));

}

function viewTodos(newTodo){
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');
  button.innerHTML='X';
  button.addEventListener("click", deleteTodo);

  li.id = newTodo.id;
  li.appendChild(span);
  li.appendChild(button);
  span.innerText = newTodo.value;
  todoList.appendChild(li);

}

img_set();

navigator.geolocation.getCurrentPosition(onGeo,onGeoError);
setInterval(getClock , 1000);



const savedTodos = localStorage.getItem('todos');
if(savedTodos !== null){
  const oldTodos = JSON.parse(savedTodos);
  todos = oldTodos;
  todos.forEach(viewTodos);
}

todoForm.addEventListener("submit", ToDoSubmit);

const savedUsername = localStorage.getItem('userName');
if(savedUsername === null){
  document.querySelector('#userName').classList.remove('hidden');
  todoForm.addEventListener("submit", userSubmit);
}
else{
  document.querySelector('#userH1').innerHTML=`welcome ${savedUsername}`;
  document.querySelector('#userH1').classList.remove('hidden');
}


function userSubmit(){
  event.preventDefault();
  document.querySelector('#userName').classList.add('hidden');
  const userName = document.querySelector('#userName').value;
  localStorage.setItem('userName', userName);
  document.querySelector('#userH1').innerHTML=`welcome ${userName}`;
  document.querySelector('#userH1').classList.remove('hidden');
}