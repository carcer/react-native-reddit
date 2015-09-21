var { createStore } = (require('redux'));
var redditApp = require('./reducers');

let store = createStore(redditApp);

module.exports = store;
