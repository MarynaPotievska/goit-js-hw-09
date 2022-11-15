import {Notify} from 'notiflix/build/notiflix-notify-aio';

import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

console.log(refs);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  setTimeout (() => {
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  }, delay)
  
}

function onSucces (position, delay) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
}

function onError (position, delay) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
}


refs.form.addEventListener('submit', onSubmitForm)

function onSubmitForm (event) {
  event.preventDefault();    

  const delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);

  console.log(delay, step, amount);
  for (let i = 0; i < amount; i += 1) {
    createPromise(i, delay).then(onSucces).catch(onError);  
    delay += step;
  }

}