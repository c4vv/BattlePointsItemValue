
class Item {
	constructor(name,id,bp){
		this.name = name;
		this.id = id;
		this.bp = bp;
	}
}

const ITEMS = [
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
];


export { ITEMS };
