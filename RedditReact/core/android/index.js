'use strict';

var React = require('react-native');
var {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ListView
} = React;

var Loading = require('./components/Loading');
var RedditList = require('../components/RedditList');
var Login = require('../components/Login');

var Immutable = require('immutable');

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
		return (<Login />);
	},

	onNavigationStateChange: function(...args){
		console.log(args);
	},

	login: function(e){
		this.setState({
			isLoggingIn: true,
		});
	},

	render: function() {
		if (this.state.isFetching) {
			return this.renderLoading();
		}

		if (this.state.isLoggingIn) {
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
