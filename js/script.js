const ContinentsData = [
	{
		name: `Continents`,
		data: `A continent is one of several large landmasses. Generally identified by convention rather than any strict criteria, up to seven regions are commonly regarded as continents. Ordered from largest in area to smallest, these seven regions are: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.Variations with fewer continents may merge some of these, for example some systems include Eurasia or America as single continents.`
	},
	{
		name: `Asia`,
		data: `Asia is Earth's largest and most populous continent, located primarily in the Eastern and Northern Hemispheres. It shares the continental landmass of Eurasia with the continent of Europe and the continental landmass of Afro-Eurasia with both Europe and Africa.`
	},
	{
		name: `Africa`,
		data: `Africa is the world's second-largest and second-most populous continent, after Asia in both cases. At about 30.3 million km2 (11.7 million square miles) including adjacent islands, it covers 6% of Earth's total surface area and 20% of its land area. With 1.3 billion people as of 2018, it accounts for about 16% of the world's human population. Africa's population is the youngest amongst all the continents.`
	},
	{
		name: `North America`,
		data: `North America is a continent entirely within the Northern Hemisphere and almost all within the Western Hemisphere. It can also be described as the northern subcontinent of the Americas. It is bordered to the north by the Arctic Ocean, to the east by the Atlantic Ocean, to the southeast by South America and the Caribbean Sea, and to the west and south by the Pacific Ocean. Because it is on the North American Tectonic Plate, Greenland is included as part of North America geographically.`
	},
	{
		name: `Europe`,
		data: `Europe is a continent located entirely in the Northern Hemisphere and mostly in the Eastern Hemisphere. It comprises the westernmost peninsulas of the continental landmass of Eurasia, and is bordered by the Arctic Ocean to the north, the Atlantic Ocean to the west, the Mediterranean Sea to the south, and Asia to the east. Europe is commonly considered to be separated from Asia by the watershed of the Ural Mountains, the Ural River, the Caspian Sea, the Greater Caucasus, the Black Sea, and the waterways of the Turkish Straits. Although much of this border is over land, Europe is generally accorded the status of a full continent because of its great physical size and the weight of its history and traditions.`
	},
	{
		name: `South America`,
		data: `South America is a continent entirely in the Western Hemisphere[note 7] and mostly in the Southern Hemisphere, with a relatively small portion in the Northern Hemisphere. It can also be described as a southern subcontinent of the Americas. The reference to South America instead of other regions (like Latin America or the Southern Cone) has increased in recent decades due to changing geopolitical dynamics (in particular, the rise of Brazil).`
	},
	{
		name: `Antarctica`,
		data: `Antarctica is Earth's southernmost continent. It contains the geographic South Pole and is situated in the Antarctic region of the Southern Hemisphere, almost entirely south of the Antarctic Circle, and is surrounded by the Southern Ocean. At 14,200,000 square kilometres (5,500,000 square miles), it is the fifth-largest continent and nearly twice the size of Australia. At 0.00008 people per square kilometre, it is by far the least densely populated continent. About 98% of Antarctica is covered by ice that averages 1.9 km (1.2 mi; 6,200 ft) in thickness, which extends to all but the northernmost reaches of the Antarctic Peninsula.`
	},
	{
		name: `Australia`,
		data: `The continent of Australia, sometimes known in technical contexts by the names Sahul, Australinea, or Meganesia to distinguish it from the country of Australia, consists of the landmasses which sit on Australia's continental plate. The name "Sahul" takes its name from the Sahul Shelf, which is part of the continental shelf of the Australian continent. The continent includes mainland Australia, Tasmania, and the island of New Guinea, which consists of Papua New Guinea and Western New Guinea (a province of Indonesia). Situated in the geographical region of Oceania, Australia is the smallest of the seven traditional continents.`
	}]

const accordionContinents = document.querySelector('#accordionContinents');
const continents_block = document.querySelector('#continents_block');
const wrapper = document.querySelector('#wrapper');

const continentClass = {
	Continents: data=> new Continents(data),
}

class ContinentsInfo {
	static createContinents(arr) {

		let continents = arr.map(continent => continentClass[continent.name.replace(" ","")] ? continentClass[continent.name.replace(" ","")](continent) : new Continent(continent))
			console.log(continents);

		let continentsAccordion = continents
			.map((continent,index) => continent.renderContinent(index))
			.join('');

			continents.map(continent=>continent.clickContinent());

			accordionContinents.innerHTML = continentsAccordion;
	}
}

class Continent {
	constructor(continent) {
		this.createContinent(continent);
	}

	createContinent(continent) {
		for (let key in continent) {
			this[key] = continent[key];
		}
	}

	renderContinent(index) {
		//console.log(this);
		return `<div class="accordion-item">
			<h2 class="accordion-header" id="heading${this.name.replace(" ","")}">
			  <button class="accordion-button ${index !=0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${this.name.replace(" ","")}" aria-expanded="${index !=0 ? 'false' : 'true'}" aria-controls="collapse${this.name.replace(" ","")}">
			  <img class="accordion-button_img" src="./images/${this.name.replace(' ','')}.jpg" width="45">
			  ${this.name}
			  </button>
			</h2>
			<div id="collapse${this.name.replace(" ","")}" class="accordion-collapse collapse ${index !=0 ? '' : 'show'}" aria-labelledby="heading${this.name.replace(" ","")}" data-bs-parent="#accordionContinents">
			  <div class="accordion-body">
				${this.data}
			  </div>
			</div>
		  </div>`
	}

	clickContinent(){
		let blockContinent = document.createElement('div');
		blockContinent.classList.add('render_continent');
		//console.log(this);
		let continent = document.createElement('img');
		continent.id = `render_${this.name.replace(" ","")}`;
		continent.src=`./images/${this.name.replace(' ','')}.jpg`;
		continent.alt = this.name;
		continent.width = 120;
		continent.title = this.name;
		
		console.log(continent.id);

		continent.addEventListener('click',this.buttonClick.bind(this));
		blockContinent.append(continent);

		continents_block.append(blockContinent);
		
	}

	buttonClick(){
		let btn  = document.querySelector(`button[aria-controls="collapse${this.name.replace(' ','')}"]`);
		btn.click();
	}
}


class Continents extends Continent{
	constructor(continent){
		super(continent);
	}

	clickContinent(){
		let continentTitle = document.createElement('h1');
		continentTitle.classList.add('continent_title');
		continentTitle.title = this.name;
		continentTitle.innerHTML = `${this.name} <img src="./images/${this.name.replace(" ","")}.jpg" alt=${this.name} width="170">`

		wrapper.prepend(continentTitle);
	}
}

ContinentsInfo.createContinents(ContinentsData);


