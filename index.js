class Item {
	constructor(name,id,bp){
		this.name = name;
		this.id = id;
		this.bp = bp
	}
}

const items = [
	new Item("Mental Herb", "5219", "85"),
	new Item("White Herb", "5214", "100"),
	new Item("Power Herb", "5271", "100"),
	new Item("Cell Battery", "5546", "100"),
	new Item("Red Card", "5542", "100"),
	new Item("Eject Button", "5547", "100"),
	new Item("Air Balloon", "5541", "100"),
	new Item("Focus Sash", "5275", "100"),
	new Item("Life Orb", "5270", "6400"),
	new Item("Toxic Orb", "5272", "6400"),
	new Item("Flame Orb", "5273", "6400"),
	new Item("Leftovers", "5234", "4800"),
	new Item("Wise Glasses", "5267", "4800"),
	new Item("Scope Lens", "5232", "4800"),
	new Item("Muscle Band", "5266", "4800"),
	new Item("Rocky Helmet", "5540", "4800"),
	new Item("Focus Band", "5230", "3200"),
	new Item("Choice Band", "5220", "9800"),
	new Item("Choice Scarf", "5287", "9800"),
	new Item("Choice Specs", "5297", "9800"),
	new Item("Eviolite", "5538", "9800"),
	new Item("Assualt Gear", "1423", "9800"),
	new Item("Reinforced Boots", 1426, 9800),
	new Item("Punching Gloves", 1506, 6400),
	new Item("Covert Mantle", 1508, 6400),
	new Item("Loaded Dice", 1509, 4800),
	new Item("Safety Goggles", 1510, 4800),
	new Item("Protective Pads", 1516, 4800),
	new Item("Type Policy", 1511, 100),
	new Item("Room Service", 1517, 100),
	new Item("Glowing Moss", 1521, 100),
	new Item("Throat Spray", 1514, 100),
	new Item("Snowball", 1520, 100),
];

getItemPrices(items);


function getItemPrices(items){
	let itemsWithPrices = [];

	fetch('https://pokemmoprices.com/api/v2/items/table')
	  .then(response => {
	    if (!response.ok) {
	      throw new Error('Network response was not ok');
	    }
	    return response.json(); // Parse the JSON response
	  })
	  .then(data => {
	    console.log('Data received:', data);
			// item.price = priceLessGTLFee(data.data.pop().y);
			for (let item of items) {
				let searchId = item.id;
				let foundItem = null;
				let itemPriceArray = data.data;
				console.log(itemPriceArray)
				for (let j = 0; j < itemPriceArray.length; j++) {
				  if (itemPriceArray[j].i == searchId) {
				    foundItem = itemPriceArray[j];
				    break;
				  }
				}
				if (foundItem) {
				  console.log(foundItem);
					let price = priceLessGTLFee(foundItem.p);
					item.price = price;
					itemsWithPrices.push(item)
				} else {
				  console.log('Object not found');
				}
				// console.log(itemPriceObj);
			  //console.log(obj.name);
			}

				if(itemsWithPrices.length = items.length) {
					loadTable(itemsWithPrices);
				}
	  })
	  .catch(error => {
	    console.error('There was a problem with the fetch operation:', error);
	  });
}

function loadTable(items) {
	document.getElementById("loading").style.display='none';
	items.forEach(item => {
		item.price = priceLessGTLFee(item.price);
		item.ratio = Math.round(item.price/item.bp*100)/100;
		item.price = currencyFormat(item.price);
	});

	items.sort((a, b) => b.ratio - a.ratio);
	let itemTableBody = document.querySelector('#items-table tbody');
	items.forEach(item =>{
		const row = document.createElement("tr");
		row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.bp}</td>
        <td>${item.price}</td>
				<td>${item.ratio}</td>
      `;
		itemTableBody.appendChild(row);
	});
}

function currencyFormat(x) {
	return x.toLocaleString("en", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});
};

function priceLessGTLFee(price){
	if(price*.05>25000){
		return price-25000;
	} else if (price*.05<100){
		return price - 100;
	} else {
		return price - price*.05;
	}
}
