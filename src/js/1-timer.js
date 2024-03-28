'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours');
const timerMinutes = document.querySelector('[data-minutes');
const timerSeconds = document.querySelector('[data-seconds');

btn.setAttribute('disabled', true);

let userSelectedDate = 0;
let timeInterval = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    selectedDate();
  },
};
const calendar = flatpickr('#datetime-picker', options);

function selectedDate(selectedDates) {
  if (userSelectedDate <= new Date()) {
    iziToast.error({
      message: 'Please choose a date in the future',
      close: true,
      backgroundColor: '#ef4040',
      position: 'topRight',
      maxWidth: '302px',
      progressBar: false,
      messageColor: '#fff',
    });
  } else {
    btn.disabled = false;
  }
}

btn.addEventListener('click', event => {
  const repeatingCalculate = setInterval(() => {
    timeInterval = userSelectedDate - new Date();
    if (timeInterval < 0) {
      btn.disabled = false;
      input.disabled = false;
      clearInterval(repeatingCalculate);
      return;
    }
    input.setAttribute('disabled', true);
    btn.disabled = true;
    const timer = convertMs(timeInterval);
    timerDays.textContent = timer.days.toString().padStart(2, '0');
    timerHours.textContent = timer.hours.toString().padStart(2, '0');
    timerMinutes.textContent = timer.minutes.toString().padStart(2, '0');
    timerSeconds.textContent = timer.seconds.toString().padStart(2, '0');
  }, 1000);
});

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

  return { days, hours, minutes, seconds };
}
