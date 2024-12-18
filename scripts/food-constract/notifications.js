import { busket } from "./index.js";

const submit = document.getElementById('form');

//блок уведомления
const notif = document.createElement('div');
notif.id = 'notif';
const notifP = document.createElement('p');
notifP.id = 'notifP';
const notifBTN = document.createElement('button');
notifBTN.id = 'notif.btn';
notifBTN.innerHTML = 'ок';
notif.appendChild(notifP);
notif.appendChild(notifBTN);
document.getElementsByTagName('body')[0].appendChild(notif);

notifBTN.addEventListener('click', (e) => {
	notif.style.display = 'none';
})


submit.addEventListener('submit', (e) => {

	let lunchs = [
		['soup', 'main-course', 'salad', 'drink'],
		['soup', 'main-course', 'drink'],
		['soup', 'salad', 'drink'],
		['main-course', 'salad', 'drink'],
		['main-course', 'drink']
	];

	let dishes = [];

	for (const key in busket) {
		if (busket[`${key}`].price) dishes.push(key);
	}

	console.log('dishes', dishes);

	dishes = dishes.filter(el => el !== 'dessert');

	lunchs = lunchs
  .filter(lunch => {
    return dishes.every(dish => lunch.includes(dish));
  })
  .map(lunch => {
    return lunch.filter(item => !dishes.includes(item));
  });

	console.log('lunchs', lunchs);

	const minLength = Math.min(...lunchs.map(lunch => lunch.length));
	const result = lunchs.filter(lunch => lunch.length === minLength);

	console.log(result);

	const names = {
		'main-course': 'главное блюдо',
		'soup': 'суп',
		'salad': 'салат/стартер',
		'drink': 'напиток',
		'dessert': 'десерт',
	}

	if(result[0].length > 0) {
		let answer = '';

		if (result.length === 1) {
			answer = result[0].map((el) => names[`${el}`]).join(' и ')
		} else {
			answer = result
				.map(el => el.map((elem) => names[`${elem}`]).join(' и '))
				.join(' или ');
		}
		e.preventDefault();
		notifP.innerHTML = `выберите еще ${answer}`;
		notif.style.display = 'flex';
	}
})