export const inputAnimation = (result, id) => {
	const input = document.getElementById(id);
	console.log(id);
	console.log(result);
	if (result === true) {
		input.classList.add("input--success");
		setTimeout(() => {
			input.classList.remove("input--success");
		}, 1000);
	} else {
		input.classList.add("input--fail");
		setTimeout(() => {
			input.classList.remove("input--fail");
		}, 1000);
	}
};
