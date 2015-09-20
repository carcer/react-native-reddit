/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');

var {
  BackAndroid,
  Navigator,
  ToolbarAndroid,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableHighlight,
  ProgressBarAndroid,
  WebView
} = React;

var Loading = require('./components/Loading');
var RedditList = require('../components/RedditList');

var request = require('superagent');
var Immutable = require('immutable');
var normalizr = require('normalizr');

var {
	normalize,
	Schema,
	arrayOf
} = normalizr;

var WEBVIEW_REF = 'webview';

var RedditReact = React.createClass({
	getInitialState: function() {
		return {
			listings: new ListView.DataSource({
	    	    rowHasChanged: (row1, row2) => row1 !== row2,
	      	}),
			isFetching: false
		}
	},

	renderLoading: function() {
		return (<Loading />);
	},

	renderLogin: function() {
		console.log(this.state.authUrl);
		return (<View>
				<Text>
					{this.state.authUrl}
				</Text>
	        </View>
			);
	},

	onNavigationStateChange: function(...args){
		console.log(args);
	},

	login: function(e){
		const apiUrl = 'https://www.reddit.com/api/v1';
		const requestId = new Date().getTime();
		const scope = 'read';
		const redirectUri='http://e4ums.co.uk/auth'
		const authorizeUrl = `${apiUrl}/authorize?client_id=RedditApp&response_type=token&
state=${requestId}&redirect_uri=${redirectUri}&scope=${scope}`;
console.log('logging in...')
		this.setState({
			isLoggingIn: true,
			authUrl: authorizeUrl
		});
	},

	render: function() {
		if (this.state.isFetching) {
			return this.renderLoading();
		}

		if(this.state.isLoggingIn) {
			return this.renderLogin();
		}

		return (
			<View style={styles.container}>
				<View>
				<TouchableHighlight
					underlayColor="#dddddd"
					onPress={this.login}
				>
					<Text style={styles.loginText}>Login </Text>
				</TouchableHighlight>
				</View>
				<RedditList listings={this.state.listings} />
			</View>
		);
	},

	componentDidMount: function() {
		this.setState({
			isFetch: true
		});

		fetch('https://www.reddit.com/.json')
			.then(response => response.json())
			.then((response) => {
				console.log('fetched');
				const data = response.data.children.map(i => Immutable.fromJS(i.data));
				const state = {
					listings: this.state.listings.cloneWithRows(data),
					isFetching: false
				};

				this.setState(state);
			})
			.done();
	}
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    position: 'absolute',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    bottom: 0,
    left: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'left',
    color: 'white'
  },
  description: {
    fontSize: 9,
    textAlign: 'left',
  },
  thumbnail: {
    flex: 1,
    height: 140,
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
});

module.exports = RedditReact;
