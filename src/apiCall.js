const agent = require('superagent');

const uniqueRules = [];

/**
 * Adds a string in our list of strings if it does not previously exist
 * @param  str 
 */
function addIfUnique(str) {
  const index = uniqueRules.find((elem) => elem === str);

  if (!index) {
    uniqueRules.push(str);
  }
  return;
}

/**
 * Fetches a random string from github zen api
 */
function fetchRandomString() {
  return new Promise((resolve, reject) => {
    agent
    .get('https://api.github.com/zen')
    .then( resp => {
      resolve(resp.text);
    })
    .catch( e => {
      reject();
    })
    
  }); 

}


/**
 * Repetedly fetches data from fetchRandomString function until it has three unique strings
 */
async function fetch3Strings() {
  while (uniqueRules.length < 3) {
    try {
      let rule = await fetchRandomString();
      addIfUnique(rule);
    }
    catch(e) {
      console.error('Error in fetching from API', e);
    }
  }
}

fetch3Strings()
  .then( () => {
    console.log('The three unique strings are - ', uniqueRules);
  })