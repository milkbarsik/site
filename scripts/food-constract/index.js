import menu from "./data.js";

const sortedMenu = menu.sort((a, b) => a.name > b.name ? 1 : -1);

for (let i = 0; i < sortedMenu.length; i++) {
  //создаем блок dish_elem
  let dishElem = document.createElement("div");
  dishElem.classList.add('food-elem');
  dishElem.dataset.keyword = sortedMenu[i].keyword;
  // создаем картинку
  let img = document.createElement('img');
  img.src = sortedMenu[i].img;
  img.alt = sortedMenu[i].category;
  dishElem.appendChild(img);

  // создаем описание
  let price = document.createElement('p');
  price.classList.add('price');
  price.innerHTML = `${sortedMenu[i].price} &#8381`;
  dishElem.appendChild(price);

  let name = document.createElement('p');
  name.classList.add('name');
  name.innerHTML = sortedMenu[i].name;
  dishElem.appendChild(name);

  let weight = document.createElement('span');
  weight.classList.add('weight');
  weight.innerHTML = sortedMenu[i].weight;
  dishElem.appendChild(weight);

  // создаем кнопку
  let button = document.createElement('button');
  button.classList.add('add_dish');
  button.innerHTML = "Добавить";
  dishElem.appendChild(button);

  // добавляем dish_elem в dish
  let parent = document.getElementById(`${sortedMenu[i].category}`);
  parent.appendChild(dishElem);
}


const orderPrice = document.getElementById('order_price');

let busket = {
	soup: {name: '', price: 0},
	main_dish: {name: '', price: 0},
	juice: {name: '', price: 0},
	price: function () {
		return this.soup.price + this.main_dish.price + this.juice.price;
	}
};

// вешаем слушатели событий

for(const elem of document.getElementsByClassName('add_dish')) {
  elem.addEventListener('click', () => {
		const keyword = elem.parentElement.dataset.keyword;
		const dish = sortedMenu.find(el => el.keyword === keyword);
		busket[dish.category] = { name: dish.name, price: dish.price }

		const orderElem = document.getElementById(`${dish.category}_order`);
		orderElem.getElementsByClassName('order-type-description')[0]
		.innerHTML = `${busket[dish.category].name} ${busket[dish.category].price}&#8381`;

		orderElem.getElementsByClassName('order-type-description')[1].value = keyword;

		orderElem.style.display = 'block';
		
		orderPrice.style.display = 'block';
		orderPrice
		.getElementsByClassName('order-type-description')[0]
		.innerHTML = `${busket.price()}&#8381`;
		orderPrice
		.getElementsByClassName('order-type-description')[1]
		.value = busket.price();
  })
};