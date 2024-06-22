// Maps
var map = document.getElementById("map");
function getOffset(el) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY,
	};
}

// Generate Order
var pizza = 0;
setInterval(generateOrder, 5000);
function generateOrder() {
	if (pizza < 5) {
		var newBtn = document.createElement("button");
		newBtn.id = "btnPizza" + pizza;

		// Position
		var x = getOffset(map).left;
		var y = getOffset(map).top;
		var randomX = Math.floor(Math.random() * 742) + x;
		var randomY = Math.floor(Math.random() * 588) + y;

		// Style
		newBtn.style.width = "120px";
		newBtn.style.height = "120px";
		newBtn.style.backgroundColor = "#d9d9d9";
		newBtn.style.border = "3px solid black";
		newBtn.style.borderRadius = "25px 25px 0px 25px";

		var pizzaType = Math.floor(Math.random() * 2) + 1;
		if (pizzaType == 1) {
			// Mushroom
			newBtn.style.backgroundImage = "url(assets/mushroom.png)";
			newBtn.value = "Mushroom";
		} else {
			// Pepperoni
			newBtn.style.backgroundImage = "url(assets/pepperoni.png)";
			newBtn.value = "Pepperoni";
		}

		newBtn.style.backgroundPosition = "center";
		newBtn.style.backgroundSize = "90px 90px";
		newBtn.style.backgroundRepeat = "no-repeat";

		newBtn.style.left = randomX + "px";
		newBtn.style.top = randomY + "px";
		newBtn.style.position = "absolute";
		newBtn.addEventListener("click", takeOrder);
		document.body.appendChild(newBtn);
		pizza += 1;
	}
}

// Take Order
var busy = false;
var order;
var activeOrder;
function takeOrder(customer) {
	if (busy) {
		alert("Currently Busy!");
	} else {
		order = customer.target;
		activeOrder = document.getElementById("activeOrder");

		if (order.value == "Mushroom") {
			activeOrder.style.backgroundImage = "url(assets/mushroom.png)";
		} else {
			activeOrder.style.backgroundImage = "url(assets/pepperoni.png)";
		}
		busy = true;

		order.remove();
		pizza -= 1;
	}
}

// Money
var spanCash = document.getElementById("cash");
var cash = parseInt(spanCash.innerText);

// Make Order
var pizzaMushroomPrice = 5;
var pizzaPepperoniPrice = 5;
function make(pizzaType) {
	if (activeOrder.style.backgroundImage != "none") {
		if (order.value == pizzaType) {
			if (pizzaType == "Mushroom") {
				cash += pizzaMushroomPrice;
			} else {
				cash += pizzaPepperoniPrice;
			}
		} else {
			cash /= 2;
		}

		cash = Math.round(cash * 100) / 100;
		if (cash < 0.01) {
			cash = 0;
		}
		spanCash.innerText = cash;
		activeOrder.style.backgroundImage = "none";
		busy = false;
	} else {
		alert("Now there are still no active orders!");
	}
}

// Upgrade
var upChanceMushroom = 3;
var upChancePepperoni = 3;
var upPriceMushroom = 10;
var upPricePepperoni = 10;

function upgrade(pizzaType) {
	if (pizzaType == "Mushroom") {
		// Mushroom
		if (upChanceMushroom != 0 && cash >= upPriceMushroom) {
			pizzaMushroomPrice += 2;
			cash -= upPriceMushroom;
			spanCash.innerText = cash;
			upPriceMushroom += 10;
			var labelPrice = document.getElementById("mushroomUpPrice");
			labelPrice.innerText = "$" + upPriceMushroom;
			var pb = document.getElementById("mushroomProgressBar" + upChanceMushroom);
			pb.style.backgroundColor = "#ebff00";
			upChanceMushroom -= 1;
		} else {
			if (upChanceMushroom == 0) {
				alert("Cannot upgrade more further!");
			} else if (cash < upPriceMushroom) {
				alert("Cash not enough to buy upgrade!");
			}
		}
	} else {
		// Pepperoni
		if (upChancePepperoni != 0 && cash >= upPricePepperoni) {
			pizzaPepperoniPrice += 2;
			cash -= upPricePepperoni;
			spanCash.innerText = cash;
			upPricePepperoni += 10;
			var labelPrice = document.getElementById("pepperoniUpPrice");
			labelPrice.innerText = "$" + upPricePepperoni;
			var pb = document.getElementById("pepperoniProgressBar" + upChancePepperoni);
			pb.style.backgroundColor = "#ebff00";
			upChancePepperoni -= 1;
		} else {
			if (upChancePepperoni == 0) {
				alert("Cannot upgrade more further!");
			} else if (cash < upPricePepperoni) {
				alert("Cash not enough to buy upgrade!");
			}
		}
	}
}

// Cheat
var cheatChance = 1;
function cheat() {
	if (cheatChance == 1) {
		cash += 100;
		cheatChance -= 1;
		spanCash.innerHTML = cash;
	} else {
		alert("Cheats have been used!");
	}
}
