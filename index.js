class Item {
	constructor(name,id,bp){
		this.name = name;
		this.id = id;
		this.bp = bp;
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
	new Item("Assualt Gear", "1423", "9800")
];


items.forEach((item) => {
	item.priceApiUrl = 'https://pokemmoprices.com/api/v2/items/graph/min/'+item.id+'/1';
});

function fetchPrice(item) {
  return fetch(item.priceApiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON response
    })
    .then(data => {
			// console.log(data);
      return { ...item, price: data.data.pop().y }; // Add price to the item object
    });
}

const fetchPromises = items.map(item => fetchPrice(item));

Promise.all(fetchPromises)
  .then(itemsWithPrice => {
		console.log('fetched');
    // Once all fetches are completed, populate the table
    loadTable(itemsWithPrice);
  })
  .catch(error => {
    console.error('Error fetching price data:', error);
  });


document.addEventListener("DOMContentLoaded", function(event) {
	console.log("DOM loaded");


});

function getItemPrices(items){
	let itemsWithPrices = [];

	// items.forEach((item) => {
	// 	fetch('https://pokemmoprices.com/api/v2/items/graph/min/' + item.id + '/0')
	// 		.then(response => {
	// 			if (!response.ok) {
	// 				throw new Error('Network response was not ok');
	// 			}
	// 			console.log(response.json());
	// 		})
	// 		.then(data => {
	// 			// Do something with the fetched data
	// 			console.log(data);
	// 			console.log("Call data: " + data.data[0])
	// 			item.price = priceLessGTLFee(data.pop().y);
	// 			console.log(price);
	// 			itemsWithPrices.push(item);
	// 			if(itemsWithPrices.length = items.length) {
	// 				loadTable(itemsWithPrices);
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.error('There was a problem with your fetch operation:', error);
	// 		});
	// });
	items.forEach((item) => {
		fetch('https://pokemmoprices.com/api/v2/items/graph/min/' + item.id + '/0')
		  .then(response => {
		    if (!response.ok) {
		      throw new Error('Network response was not ok');
		    }
		    return response.json(); // Parse the JSON response
		  })
		  .then(data => {
		    console.log('Data received:', data);
				item.price = priceLessGTLFee(data.data.pop().y);

				itemsWithPrices.push(item);
				if(itemsWithPrices.length = items.length) {
					loadTable(itemsWithPrices);
				}
		  })
		  .catch(error => {
		    console.error('There was a problem with the fetch operation:', error);
		  });

		});


}

function loadTable(items) {
	document.getElementById("loading").style.display='none';
	items.forEach(item => {
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
