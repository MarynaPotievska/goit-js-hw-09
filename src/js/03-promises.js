import {Notify} from 'notiflix/build/notiflix-notify-aio';

import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  form: document.querySelector('.form'),
  delay: Number(document.querySelector('[name="delay"]').value),
  step: Number(document.querySelector('[name="step"]').value),
  amount: Number(document.querySelector('[name="amount"]').value),
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
    

  for (let i = 0; i < refs.amount; i += 1) {
    createPromise (i, refs.delay).then(onSucces).catch(onError);  
    refs.delay += refs.step;
  }

}