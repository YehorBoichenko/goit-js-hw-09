import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const spans = document.querySelectorAll('.value');
const startBtn = document.querySelector('button[data-start]');
const choosenDate = document.querySelector('#datetime-picker');
const dayRef = document.querySelector('[data-days]');
const hourRef = document.querySelector('[data-hours]');
const minuteRef = document.querySelector('[data-minutes]');
const secondRef = document.querySelector('[data-seconds]');

let timer = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    if (selectedDate[0] <= new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;

      startBtn.addEventListener('click', countdownTime);
      spans.forEach(item => item.classList.toggle('end'));

      function countdownTime() {
        timer = setInterval(() => {
          startBtn.disabled = true;

          const dateChoosen = new Date(choosenDate.value).getTime();
          const currentTime = new Date().getTime();
          const timeLeft = dateChoosen - currentTime;

          const data = convertMs(timeLeft);

          dayRef.textContent = addLeadingZero(data.days);
          hourRef.textContent = addLeadingZero(data.hours);
          minuteRef.textContent = addLeadingZero(data.minutes);
          secondRef.textContent = addLeadingZero(data.seconds);

          if (timeLeft < 1000) {
            spans.forEach(item => item.classList.toggle('end'));
            clearInterval(timer);
            startBtn.disabled = false;
          }
        }, 1000);
      }

      function addLeadingZero(value) {
        const stringValue = String(value);
        return stringValue.padStart(2, '0');
      }
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  console.log(ms);
  return { days, hours, minutes, seconds };
}
flatpickr(choosenDate, options);
