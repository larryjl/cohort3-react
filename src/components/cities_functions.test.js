import functions from './cities_functions.js';

test('cities functions idcounter', () => {
  let id = functions.idCounter();
  expect(functions.idCounter()).toBe(+id+1);
  expect(functions.idCounter()).toBe(+id+2);
});

test('cities functions arrayToSentence', () => {
  let array = [];
  try {
    functions.arrayToSentence(array);
  } catch(error) {
    expect(error.message).toBe('no values')
  };

  array.push('a');
  expect(functions.arrayToSentence(array)).toBe('a');

  array.push('b');
  expect(functions.arrayToSentence(array)).toBe('a and b');

  array.push('c');
  expect(functions.arrayToSentence(array)).toBe('a, b, and c');
});
describe('cities functions equalObjectValues', () => {
  test('cities functions equalObjectValues 1', () => {
    let itemsObj = {
      1: {name: 'a', lat: -1},
      2: {name: 'b', lat: 0}
    };
    const reference = {name: 'z', lat: 0}
    const measure = 'lat'
    const name = 'name'
    let equalItemsArr = functions.equalObjectValues(
      itemsObj, 
      reference, 
      measure, 
      name
    );
    expect(equalItemsArr).toEqual(['b']);
  });
  test('cities functions equalObjectValues 3', () => {
    let itemsObj = {
      1: {name: 'a', lat: -1},
      2: {name: 'b', lat: 0},
      3: {name: 'c', lat: 0}, 
      4: {name: 'd', lat: 1},
      5: {name: 'e', lat: 0}
    };
    const reference = {name: 'z', lat: 0}
    const measure = 'lat'
    const name = 'name'
    let equalItemsArr = functions.equalObjectValues(
      itemsObj, 
      reference, 
      measure, 
      name
    );
    expect(equalItemsArr).toEqual(['b', 'c', 'e']);
  });
});

test('cities functions objKeyByValue', () => {
  const obj = {0:10, 1:11, 2:12}
  expect(+functions.objKeyByValue(obj, 10)).toBe(0);
  expect(+functions.objKeyByValue(obj, 11)).toBe(1);
  expect(+functions.objKeyByValue(obj, 12)).toBe(2);
})

test('cities functions roundDown', () => {
  expect(functions.roundDown(99.999,2)).toBe(99.99);
  expect(functions.roundDown(99.999,1)).toBe(99.9);
  expect(functions.roundDown(99.999,0)).toBe(99);
})