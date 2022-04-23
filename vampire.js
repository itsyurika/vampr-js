class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;

  }

  get numFromOriginal() {
    let counter = 0;
    if (this.creator) {
      counter = counter + 1 + this.creator.numFromOriginal;
    }
    return counter;
  }


  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  hasSameCreator(vampire) {
    return this.creator === vampire.creator;
  }


  vampireWithName(name) {
    // console.log("visiting : ", this.name);
    // console.log("looking for : ", name);
    let foundVampire = null;
    // let currentVampire = this;
    if (this.name === name) {
      foundVampire = this;
      // console.log("current vampire: ", currentVampire.name);
      // console.log("updating found Vampire");
      // console.log("found vampire: ", foundVampire.name);
      return foundVampire;
    } else {
      // console.log("line before for-loop");
      for (const offspring of this.offspring) {
        foundVampire = foundVampire || offspring.vampireWithName(name);
      }
    }
    // console.log("before final return: ", foundVampire);
    return foundVampire;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendents = 0;
    descendents += this.numberOfOffspring;
    for (const offspring of this.offspring) {
      descendents += offspring.totalDescendents;
    }

    return descendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let filteredVampire = [];

    if (this.yearConverted > 1900) {
      filteredVampire.push(this);
    }
    for (const offspring of this.offspring) {
      filteredVampire = filteredVampire.concat(offspring.allMillennialVampires);
    }
    return filteredVampire;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    if (!this.creator || !vampire.creator) {
      return rootVampire;
    }
    if (this.numberOfVampiresFromOriginal === 1) {
      return rootVampire;
    }
    if (this.name === vampire.name) {
      return vampire;
    }
    const vamp1Line = this.numberOfVampiresFromOriginal;
    const vamp2Line = vampire.numberOfVampiresFromOriginal;
    const degreeDifference = Number(Math.abs(vamp1Line - vamp2Line));
    console.log("this vampire degree: ", vamp1Line);
    console.log("argument vampire degree: ", vamp2Line);
    console.log("degreeDifference: ", degreeDifference);
    console.log(this.name);
    console.log(vampire.creator.name);

    if (degreeDifference === 1) {

      if (vampire.creator.name == this.name) () => {
        console.log(this);
        return this;
      };
      if (this.creator.name == vampire.name) () => {
        console.log(vampire);
        return vampire;
      };

      return ("didn't catch anything");
    }


    // if (vamp1Line < vamp2Line) {
    //   let currentVampire = vampire;
    //   if (currentVampire.creator) {
    //     console.log(currentVampire.creator.name);

    //     while (currentVampire.creator.name !== this.creator.name) {
    //       currentVampire = currentVampire.creator;
    //     }
    //     return currentVampire.creator;
    //   }
    //   return rootVampire;
    // }

  }
}

module.exports = Vampire;
let rootVampire = new Vampire("root");

let offspring1 = new Vampire("andrew");
let offspring2 = new Vampire("sarah");
let offspring3 = new Vampire("c");
let offspring4 = new Vampire("d");
let offspring5 = new Vampire("e");
let offspring6 = new Vampire("f");
let offspring7 = new Vampire("g");
let offspring8 = new Vampire("h");


rootVampire.addOffspring(offspring1);
rootVampire.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring3.addOffspring(offspring5);
offspring5.addOffspring(offspring6);
offspring6.addOffspring(offspring7);
offspring2.addOffspring(offspring8);


// console.log(offspring4.closestCommonAncestor(offspring7)); //offspring 3
console.log(offspring6.closestCommonAncestor(offspring7)); //offspring 3
// console.log(offspring1.closestCommonAncestor(offspring2).name);
/*

let offspring1, offspring2, offspring3, offspring4, offspring5, offspring6, offspring7, offspring8;
    beforeEach(() => {
      offspring1 = new Vampire("a");
      offspring2 = new Vampire("b");
      offspring3 = new Vampire("c");
      offspring4 = new Vampire("d");
      offspring5 = new Vampire("e");
      offspring6 = new Vampire("f");
      offspring7 = new Vampire("g");
      offspring8 = new Vampire("h");

      rootVampire.addOffspring(offspring1);
      rootVampire.addOffspring(offspring2);
      rootVampire.addOffspring(offspring3);
      offspring3.addOffspring(offspring4);
      offspring3.addOffspring(offspring5);
      offspring5.addOffspring(offspring6);
      offspring6.addOffspring(offspring7);
      offspring2.addOffspring(offspring8);
    });

    it("should be the root vampire for any vampire and the root vampire", () => {
      expect(rootVampire.closestCommonAncestor(offspring2).name).to.equal(rootVampire.name);
      expect(rootVampire.closestCommonAncestor(offspring7).name).to.equal(rootVampire.name);
    })

    it("should be the root vampire for first two offspring", () => {
      expect(offspring1.closestCommonAncestor(offspring2).name).to.equal(rootVampire.name);
    })

    it("should be offspring 3 for offspring 4 and 7", () => {
      expect(offspring4.closestCommonAncestor(offspring7).name).to.equal(offspring3.name);
      expect(offspring7.closestCommonAncestor(offspring4).name).to.equal(offspring3.name);
    })

    it("should be that vampire if same vampire is used", () => {
      expect(offspring4.closestCommonAncestor(offspring4).name).to.equal(offspring4.name);
    })

    it("should be the more senior vampire if a direct ancestor is used", () => {
      expect(offspring6.closestCommonAncestor(offspring7).name).to.equal(offspring6.name);
      expect(offspring7.closestCommonAncestor(offspring6).name).to.equal(offspring6.name);
    })

    it("should be root for offspring 8 and offspring 7", () => {
      expect(offspring7.closestCommonAncestor(offspring8).name).to.equal(rootVampire.name);
      expect(offspring8.closestCommonAncestor(offspring7).name).to.equal(rootVampire.name);
    })

  */
