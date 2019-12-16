import functions from './functions.js'

const City = class {
  constructor(nameStr, latNum, lonNum, popNum=0) {
    if (lonNum === undefined) {
      throw Error('missing city info');
    };
    this.name = nameStr;
    this.lat = latNum;
    this.lon = lonNum;
    this.pop = popNum; 
  }
  show() {
    return `${this.name},${this.lat},${this.lon},${this.pop}`;
  }
  movedIn(num=0) {
    this.pop += num;
    return this.pop;
  }
  movedOut(num=0) {
    this.pop -= num;
    return this.pop;
  }
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
};

const Controller = class {
  constructor() {
    this.cities = {};
  }
  whichSphere(keyNum) {
    if (this.cities[keyNum]) {
      return (this.cities[keyNum].lat > 0)
        ? "Northern Hemisphere"
        : (this.cities[keyNum].lat < 0)
          ? "Southern Hemisphere"
          : 'Equator';
    } else {
      throw Error('city not found');
    };
  }
  getMost(pole) {
    if (Object.keys(this.cities).length===0) {
      throw Error('no cities');
    } else {
      const furthest = Object.values(this.cities).reduce(
        (a, b) => {
          switch (pole) {
            case 'north':
              return (a.lat > b.lat) ? a : b;
            case 'south':
              return (a.lat < b.lat) ? a : b;
            default:
              throw Error('desired hemisphere unknown');
          }
        }
      );
      // // check for equal cities
      const equalCitiesArr = [];
      for(let k in this.cities) {
        if (this.cities[k].lat === furthest.lat) {
          equalCitiesArr.push(this.cities[k].name);
        };
      };
      // // make sentence from array: 'a, b and c'
      let citiesStr;
      switch (equalCitiesArr.length) {
        case 1:
          citiesStr = equalCitiesArr[0];
          break;
        case 2:
          citiesStr = equalCitiesArr.join(' and ');
          break;
        default:
          citiesStr = equalCitiesArr.slice(0, equalCitiesArr.length - 1)
            .join(', ') + 
            ', and ' + equalCitiesArr.slice(-1);
      };
      return citiesStr;
    };
  }
  getMostNorthern() {
    return this.getMost('north');
  }
  getMostSouthern() {
    return this.getMost('south');
  }
  getPopulation() {
    if (Object.keys(this.cities).length === 0) {
      return 0;
    } else {
      const popArr= Object.values(this.cities).map(e => e.pop);
      return popArr.reduce((a, v) => a + v);
    };
  }
  createCity(nameStr, latNum, lonNum, popNum=0) {
    if (
        nameStr === undefined || 
        latNum === undefined || 
        lonNum === undefined
      ) {
      throw Error('missing city info');
    };
    const city = new City(nameStr, latNum, lonNum, popNum);
    const key = functions.idCounter(); // protected in closure
    this.cities[key]=city;
    return city;
  }
  deleteCity(keyNum) {
    if (this.cities[keyNum]) {
      delete this.cities[keyNum];
    } else {
      throw Error('city not found');
    };
  }
};

export {City, Controller};