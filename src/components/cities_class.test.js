import {City, CityController} from './cities_class.js';

const testCities = [
  {name: 'aname', lat: -1, lon: 0, pop: 1, size: 'hamlet'},
  {name: 'cityname', lat: 90, lon: 180, pop: 100.001*1000, size: 'city'},
  {name: 'ltownname', lat: -90, lon: -180, pop: 100*1000, size: 'large town'},
  {name: 'ltownname2', lat: -90, lon: 180, pop: 20.001*1000, size: 'large town'},
  {name: 'townname', lat: 90, lon: -180, pop: 20*1000, size: 'town'},
  {name: 'townname2', lat: 90, lon: -180, pop: 1001, size: 'town'},
  {name: 'villagename', lat: 0, lon: 0, pop: 1000, size: 'village'},
  {name: 'villagename2', lat: 90, lon: -180, pop: 101, size: 'village'},
  {name: 'hamletname', lat: 0, lon: 0, pop: 100, size: 'hamlet'},
  {name: 'hamletname2', lat: 0.5, lon: -0.5, pop: 1, size: 'hamlet'},
];

describe('city class', () => {
  test('city constructor', () => {
    const city = new City('aname', -1, 0, 1);
    expect(city.name).toBe('aname');
    expect(city.lat).toBe(-1);
    expect(city.lon).toBe(0);
    expect(city.pop).toBe(1);
  });
  test('city constructor no pop', () => {
    const city = new City('aname', -1, 1);
    expect(city.name).toBe('aname');
    expect(city.lat).toBe(-1);
    expect(city.lon).toBe(1);
    expect(city.pop).toBe(0);
  });
  test('city constructor missing info', () => {
    try {
      new City('aname');
    } catch (error) {
      expect(error).toBeTruthy();
    };
  });
  // test('city show', () => {
  //   const city = new City('aname', -1, 0, 1);
  //   const result = city.show();
  //   expect(result).toBe('aname,-1,0,1');
  // });
  test('city movedIn', () => {
    const city = new City('aname', -1, 0, 1);
    const result = city.movedIn(2);
    expect(result).toBe(3);
  });
  test('city movedIn no num', () => {
    const city = new City('aname', -1, 0, 1);
    const result = city.movedIn();
    expect(result).toBe(1);
  });
  test('city movedOut', () => {
    const city = new City('aname', -1, 0, 2);
    const result = city.movedIn(-2);
    expect(result).toBe(0);
  });
  test('city howBig', () => {
    testCities.forEach((v,i) => {
      let city = new City(v.name, v.lat, v.lon, v.pop);
      let result = city.howBig();
      expect(result).toBe(v.size);
    });
  });
  test('city sphere', () => {
    let city;

    city = new City('northcity', 1, 0, 0);
    expect(city.whichSphere()).toEqual('Northern Hemisphere');

    city = new City('southcity', -1, 0, 0);
    expect(city.whichSphere()).toEqual('Southern Hemisphere');

    city = new City('equatorcity', 0, 0, 0);
    expect(city.whichSphere()).toEqual('Equator');
  });

});

describe('controller class', () => {

  test('controller constructor', () => {
    const controller = new CityController();
    expect(controller.cities).toEqual({});
  });

  test('controller create', () => {
    const controller = new CityController();
    controller.add('springfield', 90, 180, 100*1000);
    controller.add('shelbyville', -90, -180, 20*1000);
    const key1 = Object.keys(controller.cities).find(
      key => controller.cities[key].name === 'springfield'
    );
    const key2 = Object.keys(controller.cities).find(
      key => controller.cities[key].name === 'shelbyville'
    );
    expect(+key2).toBe(+key1+1);
  });

  test('controller create blank, catch error', () => {
    const controller = new CityController();
    try {
      controller.add();
    } catch(error) {
      expect(error).toBeTruthy();
    }
  });

  test('controller delete', () => {
    const controller = new CityController();
    controller.add('springfield', 90, 180, 100*1000);
    controller.add('shelbyville', -90, -180, 20*1000);
    const key = Object.keys(controller.cities).find(
      key => controller.cities[key].name === 'shelbyville'
    );
    controller.remove(key);
    expect(Object.keys(controller.cities).length).toBe(1);
    expect(Object.keys(controller.cities).find(
      key => controller.cities[key].name === 'springfield'))
      .toBeTruthy();
  });
  
  test('controller delete non-existing', () => {
    const controller = new CityController();
    try { controller.remove(0);
    } catch (error) {
      expect(error).toBeTruthy();
    };
  });

  test('controller northern southern', () => {
    const controller = new CityController();
    controller.add('springfield', 90, -180, 100*1000);
    controller.add('shelbyville', -90, 180, 20*1000);
    controller.add('springfield2', 90, -180, 100*1000);
    controller.add('shelbyville2', -90, 180, 20*1000);
    controller.add('shelbyville3', -90, 180, 20*1000);
    let result;

    result = controller.getMost('N');
    expect(result).toBe('springfield and springfield2');

    result = controller.getMost('S');
    expect(result).toBe('shelbyville, shelbyville2, and shelbyville3');

    try { controller.getMost()
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  test('controller getMost no cities', () => {
    const controller = new CityController();
    try {
      controller.getMost('north');
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  test('controller getMost no direction', () => {
    const controller = new CityController();
    try {
      controller.getMost();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  test('controller total population', () => {
    const controller = new CityController();
    controller.add('springfield', 90, -180, 100*1000);
    controller.add('shelbyville', -90, 180, 20*1000);
    let result = controller.getPopulation();
    expect(result).toBe(120000);
  });

  test('controller no population', () => {
    const controller = new CityController();
    let result = controller.getPopulation();
    expect(result).toBe(0);
  });
});
