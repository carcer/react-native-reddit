/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');

var {
  AppRegistry
} = React;

var RedditReact = require('./core/android');

AppRegistry.registerComponent('RedditReact', () => RedditReact);
