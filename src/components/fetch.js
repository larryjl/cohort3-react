try {
  global.fetch = require('node-fetch'); // req for testing only
} catch {
};

async function postData(url = '', data = {}) {
  // // add get method to work with save and load
  const meth = (['save','load'].indexOf(url.slice(-4)) > -1) ? 'GET': 'POST';
  const fetchOptions = {
    method: meth,     // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',       // no-cors, *cors, same-origin
    cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',         // manual, *follow, error
    referrer: 'no-referrer',    // no-referrer, *client
    // body: JSON.stringify(data)  // body data type must match "Content-Type" header
  };
  if (meth==='POST') {
    fetchOptions.body = JSON.stringify(data);
  };
  // Default options are marked with *
  const response = await fetch(url, fetchOptions);
  try {
  const json = await response.json();    // parses JSON response into native JavaScript objects
  json.status = response.status;
  json.statusText = response.statusText;
  return json;
  } catch (error) {
    console.log(error);
    console.log(response);
  };
}

export default postData;