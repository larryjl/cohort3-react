import postData from './fetch.js';
// import {postData} from '~/code/reference/src/api/javascript/api.test.js';

const url = 'http://localhost:5000/';
const cities = [
    {key:1, name:"Calgary"},
    {key:2, name:"Edmonton"},
];

beforeEach(async () => {
  // Check that the server is running and clear any data
  await postData(url + 'clear');
})

test('test that the fetch works?', async () => {

  let data = {};

  data = await postData(url + 'all');
  expect(data.status).toEqual(200);
  expect(data.length).toBe(0);

  data = await postData(url + 'add', cities[0]);
  expect(data.status).toEqual(200);

  data = await postData(url + 'all');
  expect(data.status).toEqual(200);
  expect(data.length).toBe(1);
  expect(data[0].name).toBe("Calgary");

  // add a second with the same key which should be an error
  data = await postData(url + 'add', cities[0]);
  expect(data.status).toEqual(400);

  // add a second which should be ok
  data = await postData(url + 'add', cities[1]);
  expect(data.status).toEqual(200);

  data = await postData(url + 'all');
  expect(data.status).toEqual(200);
  expect(data.length).toBe(2);
  expect(data[1].name).toBe("Edmonton");

  data = await postData(url + 'read', {key:1});
  expect(data.status).toEqual(200);
  expect(data.length).toBe(1);
  expect(data[0].name).toBe("Calgary");

  data = await postData(url + 'update', {key:1, name:"Cowtown"});
  expect(data.status).toEqual(200);

  data = await postData(url + 'read', {key:1});
  expect(data.status).toEqual(200);
  expect(data.length).toBe(1);
  expect(data[0].name).toBe("Cowtown");

  data = await postData(url + 'delete', {key:1});
  expect(data.status).toEqual(200);

  data = await postData(url + 'read', {key:1});
  expect(data.status).toEqual(400);

  await postData(url + 'clear');
});

test('test save/load', async () => {
    let data = {};

    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toBe(0);
  
    data = await postData(url + 'add', cities[0]);
    expect(data.status).toEqual(200);
  
    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Calgary");

    data = await postData(url + 'save');
    expect(data.status).toEqual(200);

    data = await postData(url + 'clear');
    expect(data.status).toEqual(200);

    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toBe(0);

    data = await postData(url + 'load');
    expect(data.status).toEqual(200);

    data = await postData(url + 'all');
    expect(data.status).toEqual(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Calgary");
})

test('test blank url', async () => {
  try {
    const data = await postData();
  } catch(error) {
    expect(error).toBeTruthy();
  };
})