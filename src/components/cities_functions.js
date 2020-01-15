const functions = {

  // // counter closure
  idCounter: (() => {
    let nextId = 0; // initialized only once
    return () => {
      nextId++; // nextId available from parent function
      return nextId;
    };
  })(), // call to initialize nextId when function is first read

  arrayToSentence: (array) => {
    // // make sentence from array: 'a, b and c'
    let sentence;
    switch (array.length) {
      case 0:
        throw Error('no values');
      case 1:
        sentence = array[0];
        break;
      case 2:
        sentence = array.join(' and ');
        break;
      default:
        sentence = array.slice(0, array.length - 1)
          .join(', ') + 
          ', and ' + array.slice(-1);
    };
    return sentence;
  },

  equalObjectValues: (itemsObj, reference, measure, name) => {
    // // get array of values of items with measure equal to reference item
    const equalItemsArr = [];
    for(let k in itemsObj) {
      if (itemsObj[k][measure] === reference[measure]) {
        equalItemsArr.push(itemsObj[k][name]);
      };
    };
    return equalItemsArr;
  },

  objKeyByValue: (object, value, property) => {
    return (Object.keys(object).find(key => 
      (property)
        ? object[key][property]
        : object[key] 
      === value
    ));
  },

  roundDown: (num, digits) => {
    return Math.floor(num * 10**digits) / 10**digits;
  }

};

export default functions;