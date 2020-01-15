import functions from './cities_functions';

const City = class {
  constructor(nameStr, latNum=0, lonNum=0, popNum=0) {
    this.name = nameStr;
    this.lat = latNum;
    this.lon = lonNum;
    this.pop = popNum; 
  }
  // show() {
  //   return `${this.name},${this.lat},${this.lon},${this.pop}`;
  // }
  movedIn(num=0) {
    this.pop += num;
    return this.pop;
  }
  // movedOut(num=0) {
  //   this.pop -= num;
  //   return this.pop;
  // }
  howBig() {
    const sizes = [ // -- modified values to not overlap
      {size: 'city', min: 100.001*1000, max:Infinity},
      {size: 'large town', min: 20.001*1000, max:100*1000},
      {size: 'town', min: 1001, max: 20*1000},
      {size: 'village', min: 101, max: 1000},
      {size: 'hamlet', min: 1, max: 100}
    ];
    for (let i in sizes) {
      if (this.pop >= sizes[i].min && this.pop <= sizes[i].max) {
        return sizes[i].size;
      };
    };
  }
  whichSphere() {
    if (this.lat || this.lat===0) {
      return (this.lat > 0)
        ? "Northern Hemisphere"
        : (this.lat < 0)
          ? "Southern Hemisphere"
          : 'Equator';
    } else {
      throw Error('city latitude not found');
    };
  }
};


const CityController = class {
  constructor() {
    this.cities = {};
  }
  getMost(pole) {
    if (Object.keys(this.cities).length) {
      const furthest = Object.values(this.cities).reduce(
        (a, b) => {
          if (pole==='N') {
              return (a.lat > b.lat) ? a : b;
          } else if (pole==='S') {
              return (a.lat < b.lat) ? a : b;
          } else {
              throw Error('desired hemisphere unknown');
          };
        }
      );
      // // get equal cities
      const equalCitiesArr = functions.equalObjectValues(this.cities, furthest, 'lat', 'name');
      
      // // make sentence from array: 'a, b and c'
      return functions.arrayToSentence(equalCitiesArr);
      
    } else {
      throw Error('no cities');
    };
  }
  // getMostNorthern() {
  //   return this.getMost('north');
  // }
  // getMostSouthern() {
  //   return this.getMost('south');
  // }
  getPopulation() {
    if (Object.keys(this.cities).length === 0) {
      return 0;
    } else {
      const popArr= Object.values(this.cities).map(e => e.pop);
      return popArr.reduce((a, v) => a + v);
    };
  }
  add(nameStr, latNum=0, lonNum=0, popNum=0) {
    if (!nameStr) {
      throw Error('Missing city info.');
    };
    const city = new City(nameStr, latNum, lonNum, popNum);
    const key = functions.idCounter(); // behind closure
    this.cities[key]=city;
    const cityClone = Object.assign({}, city);
    return {
      key: +key,
      info: cityClone
    };
  }
  remove(id, name) {
    const key = (id) ? id : functions.objKeyByValue(this.cities, name, 'name');
    const cityClone = Object.assign({}, this.cities[key]);
    delete this.cities[key];
    return {
      key: +key,
      info: cityClone
    };
  }
  migration(action, amount, id, name) {
    const key = (id) ? id : functions.objKeyByValue(this.cities, name, 'name');
    this.cities[key].movedIn(
      (action==='move in') ? amount : -amount
    );
    const cityClone = Object.assign({}, this.cities[key]);
    return {
      key: +key,
      info: cityClone
    };
  }
  // identify(name) {
  //   const key = +Object.keys(this.cities).find(
  //     key => this.cities[key].name === name
  //   );
  //   if (key) {
  //     return key;
  //   } else {
  //     throw Error('City not found.');
  //   };
  // }
};

export {
  City, 
  CityController
};