export const LoadDishes = async () => {
	try {
		const res = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
		const data = await res.json();
		return data;
	} catch (e) {
		console.log(e);
	}
}