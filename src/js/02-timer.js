import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import {Notify} from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const start = document.querySelector('[data-start]');

const timer = {
	days: document.querySelector('[data-days]'),
	hours: document.querySelector('[data-hours]'),
	minutes: document.querySelector('[data-minutes]'),
	seconds: document.querySelector('[data-seconds]'),
};

start.disabled = 'true';

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		if(selectedDates[0] < options.defaultDate) {
			Notify.failure("Please choose a date in the future");
			return
		}
		console.log(selectedDates[0]);
		start.removeAttribute('disabled');
		start.addEventListener('click', () => {
			start.disabled = 'true';
			const timerId = setInterval(() => {
				const timeToDate = convertMs(selectedDates[0] - new Date());
				console.log(timeToDate)

				timer.days.textContent = timeToDate.days;
				timer.hours.textContent = addLeadingZero(timeToDate.hours);
				timer.minutes.textContent = addLeadingZero(timeToDate.minutes);
				timer.seconds.textContent = addLeadingZero(timeToDate.seconds);

			if(timeToDate.days < 10) {
				timer.days.textContent = addLeadingZero(timeToDate.days);
			}

			if (timeToDate.days === 0 &
				timeToDate.hours === 0 &
				timeToDate.minutes === 0 &
				timeToDate.seconds === 0
			) {
				clearInterval (timerId)
			};
			}, 1000);

			
			
		});		
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
  
	return { days, hours, minutes, seconds };
  }

 flatpickr("#datetime-picker", options);


  function addLeadingZero (value) {
	return value.toString().padStart(2, '0');
  };

  