const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if(toggle) toggle.addEventListener('click', () => nav.classList.toggle('open'));