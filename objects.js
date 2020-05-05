// The Plant Class

class Plant {
  constructor(
    type,
    isPerennial,
    leafDescription,
    leafColor,
    flowerColor,
    flowerDescription,
    gallonsWaterPerWeek,
    amountOfSunNeeded
  ) {
    this.type = type;
    this.isPerennial = isPerennial;
    this.leafDescription = leafDescription;
    this.leafColor = leafColor;
    this.flowerColor = flowerColor;
    this.flowerDescription = flowerDescription;
    this.gallonsWaterPerWeek = gallonsWaterPerWeek;
    this.amountOfSunNeeded = amountOfSunNeeded;
  }

  describe = () => {
    let description = `A ${this.type} which has ${this.leafColor} leaves that are ${this.leafDescription}.  The flowers are ${this.flowerColor} ${this.flowerDescription}.`;
    return description;
  };
  changeColor() {
    let newColors = [
      "Amber",
      "Crimson",
      "Aqua",
      "Cerulean Blue",
      "Flamingo",
      "Gun Smoke",
      "Jade",
      "Merigold",
      "Mustard",
      "Periwinkle",
    ];
    // ~~ Magic Genetic Engineering ~~
    let randIndex = Math.floor(Math.random() * newColors.length);
    if (this.isFlawed) {
      this.flowerDescription = "wilted sad buds with no pedals.";
      this.flowerColor = null;
    } else {
      this.flowerColor = newColors[randIndex];
    }
    let randomChance = Math.floor(Math.random() * 3);
    if (randomChance < 1) {
      this.isFlawed = true;
    }
  }

  clone() {
    let clone = new Plant();
    for (let key in this) {
      clone[key] = this[key];
    }
    this.changeColor();
    return clone;
  }
}

// The Garden Class

class Garden {
  constructor(name) {
    this.name = name;
    this.plants = [];
  }
  describe() {
    let description = `The ${this.name} has ${this.plants} types of plants in it.  It contains: `;
    for (let plant of this.plants) {
      description += "\n" + plant.describe();
    }
    return description;
  }

  addPlant(plant) {
    this.plants.push(plant);
  }
}

// The Estate Class

class Estate {
  constructor() {
    this.roseArbor = new Garden("Rose Arbor");
    this.perennialGarden = new Garden("Perennial Garden");
    this.slopePlanters = new Garden("Slope Planters");
  }

  addPlant(plant) {
    if (plant.type === "rose") {
      this.roseArbor.plants.push(plant);
    } else if (plant.isPerennial && plant.amountOfSunNeeded <= 5) {
      this.perennialGarden.plants.push(plant);
    } else {
      this.slopePlanters.plants.push(plant);
    }
  }

  describe() {
    const estateLength = this.length;
    let description = `The estate has ${estateLength} gardens.`;
    for (let gardenName in this) {
      let garden = this[gardenName];
      description += "\n" + garden.describe();
    }
    return description;
  }

  calculateWaterUsagePerWeek() {
    let numGallons = 0;
    this.roseArbor.plants.forEach(function (plant) {
      numGallons += plant.gallonsWaterPerWeek;
    });
    this.perennialGarden.plants.forEach(function (plant) {
      numGallons += plant.gallonsWaterPerWeek;
    });
    this.slopePlanters.plants.forEach(function (plant) {
      numGallons += plant.gallonsWaterPerWeek;
    });
    console.log(numGallons);
    return Math.round(numGallons);
  }

  cloneAllTheRosesAndChangeTheirColors() {
    let newRoses = [];
    this.roseArbor.plants.forEach(function (rose) {
      let newPlant = rose.clone();
      if (!newPlant.isFlawed) {
        newRoses.push(newPlant);
      }
    });
    this.roseArbor.plants = this.roseArbor.plants.concat(newRoses);
  }
}

let myEstate = new Estate();

let firstPlant = new Plant(
  "rose",
  true,
  "rounded with a point",
  "green",
  "red",
  "concentric circles of pedals",
  0.8,
  4
);
myEstate.addPlant(firstPlant);

let secondPlant = new Plant(
  "orchid",
  true,
  "long and wide with a point at the end",
  "green",
  "fuscia",
  "pedals surrounding a central mouth",
  1.2,
  2
);
myEstate.addPlant(secondPlant);

let thirdPlant = new Plant(
  "marigold",
  false,
  "thin and jagged along branches",
  "green",
  "yellow and orange",
  "rounded pedals in groups of five with a darker orange center",
  0.8,
  4
);
myEstate.addPlant(thirdPlant);

myEstate.describe(); // This should print the whole description of the estate.

myEstate.calculateWaterUsagePerWeek(); // This should print 2.8

myEstate.cloneAllTheRosesAndChangeTheirColors(); // This should clone the rose and make a second one.
console.log(myEstate);
console.log(myEstate.roseArbor.plants.length == 2);
