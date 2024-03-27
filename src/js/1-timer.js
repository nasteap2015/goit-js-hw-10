'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('button');
btn.setAttribute('disabled', true);
let userSelectedDate = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
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
