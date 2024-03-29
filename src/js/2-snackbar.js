'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
let delay = 0;

form.addEventListener('submit', event => {
  event.preventDefault();
  delay = event.target.elements.delay.value;
  if (event.target.elements.state.value === 'fulfilled') {
    setTimeout(() => {
      Promise.resolve('value').then(value =>
        iziToast.success({
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#59a10d',
          maxWidth: '383px',
          progressBar: false,
          messageColor: '#fff',
        })
      );
    }, delay);
  } else {
    setTimeout(() => {
      Promise.reject('error').catch(error =>
        iziToast.error({
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#ef4040',
          maxWidth: '302px',
          progressBar: false,
          messageColor: '#fff',
        })
      );
    }, delay);
  }
  form.reset();
});
