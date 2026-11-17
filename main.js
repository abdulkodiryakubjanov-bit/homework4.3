const holidayName = 'Новый год';

const dateInput = document.getElementById('dateInput');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const countdownEl = document.getElementById('countdown');
const clockEl = document.getElementById('clock');

let timerId = null;

const weekDays = [
  'воскресенье',
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота'
];

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${h}:${m}:${s}`;
}

updateClock();
setInterval(updateClock, 1000);

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  if (!dateInput.value) {
    countdownEl.textContent = 'Сначала выберите дату!';
    countdownEl.style.color = '';
    return;
  }

  stopTimer();

  const targetDate = new Date(dateInput.value);
  const dayOfWeek = weekDays[targetDate.getDay()];

  function tick() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownEl.textContent = 'Дата уже прошла';
      countdownEl.style.color = 'red';
      stopTimer();
      return;
    }

    const oneDayMs = 24 * 60 * 60 * 1000;
    if (diff < oneDayMs) {
      countdownEl.style.color = 'red';
    } else {
      countdownEl.style.color = '';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.innerHTML = `
      Праздник: <strong>${holidayName}</strong> (${dayOfWeek})<br>
      Дней: ${days}, часов: ${hours}, минут: ${minutes}, секунд: ${seconds}
    `;
  }

  tick();
  timerId = setInterval(tick, 1000);
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
