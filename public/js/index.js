const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let msg1 = document.querySelector('.message-1');
  let msg2 = document.querySelector('.message-2');
  msg1.textContent = 'Loading ...';
  msg2.textContent = '';
  fetch('http://localhost:3000/weather/?loc=' + input.value)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.weather;
      }
    })
    .catch((err) => {
      msg1.textContent = 'please enter a valid location ...';
    });
});
