import menu from "./data.js";

const sortedMenu = menu.sort((a, b) => a.name > b.name ? 1 : -1);

const addToBusket = () => {
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
}

const render = (dataMenu = sortedMenu, category = '') => {
	for (let i = 0; i < dataMenu.length; i++) {
		//создаем блок dish_elem
		let dishElem = document.createElement("div");
		dishElem.classList.add('food-elem');
		dishElem.dataset.keyword = dataMenu[i].keyword;
		// создаем картинку
		let img = document.createElement('img');
		img.src = dataMenu[i].img;
		img.alt = dataMenu[i].category;
		dishElem.appendChild(img);
	
		// создаем описание
		let price = document.createElement('p');
		price.classList.add('price');
		price.innerHTML = `${dataMenu[i].price} &#8381`;
		dishElem.appendChild(price);
	
		let name = document.createElement('p');
		name.classList.add('name');
		name.innerHTML = dataMenu[i].name;
		dishElem.appendChild(name);
	
		let weight = document.createElement('span');
		weight.classList.add('weight');
		weight.innerHTML = dataMenu[i].weight;
		dishElem.appendChild(weight);
	
		// создаем кнопку
		let button = document.createElement('button');
		button.classList.add('add_dish');
		button.innerHTML = "Добавить";
		dishElem.appendChild(button);
	
		// добавляем dish_elem в dish
		let parent = document.getElementById(`${category === '' ? dataMenu[i].category : category}`);
		parent.appendChild(dishElem);
	}
	addToBusket();
}

render();


const orderPrice = document.getElementById('order_price');

let busket = {
	soup: {name: '', price: 0},
	main_dish: {name: '', price: 0},
	juice: {name: '', price: 0},
	salad_starter: {name: '', price: 0},
	dessert: {name: '', price: 0},
	price: function () {
		return this.soup.price + this.main_dish.price + this.juice.price + this.salad_starter.price + this.dessert.price;
	}
};

// filters

for(const elem of document.getElementsByClassName('filter')) {
	elem.addEventListener('click', () => {
		const kind = elem.dataset.kind;
		const isActive = elem.dataset.isactive;
		const category = elem.parentElement.parentElement.getElementsByClassName('food')[0].id;
		const foodBlock = document.getElementById(`${category}`);
		let filteredMenu;
		if ( isActive === "false" ) {
			filteredMenu = sortedMenu.filter((el) => el.kind === kind && el.category === category);
			Array.from(elem.parentElement.children).forEach((el) => {
				el.dataset.isactive = "false";
				el.classList.remove('active-filter')
			});
			elem.classList.add('active-filter');
			elem.dataset.isactive = "true";
		} else {
			filteredMenu = sortedMenu.filter((el) => el.category === category);
			elem.classList.remove('active-filter');
			elem.dataset.isactive = "false";
		}
		Array.from(foodBlock.getElementsByClassName('food-elem')).forEach((el) => {
			foodBlock.removeChild(el);
		});
		render(filteredMenu, category);
	})
}