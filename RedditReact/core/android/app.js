'use strict';

import React, { Component, Text, View, TouchableHighlight, StyleSheet, ListView } from 'react-native';

import { fetchSubreddit, finishedLoading } from '../actions/Reddit';
import { connect } from 'react-redux/native';

import Loading from './components/Loading';
import RedditList from '../components/RedditList';
import Login from '../components/Login';

class RedditReact extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
			listings: new ListView.DataSource({
	    	    rowHasChanged: (row1, row2) => row1 !== row2,
	      	}),
			isFetching: false
		}
  	}

	componentWillReceiveProps(nextProps) {
		if ( nextProps.listings )
			this.setState({
				listings: this.state.listings.cloneWithRows(nextProps.listings),
			});
	}

	renderLoading(text) {
		return (<Loading
			text={text}
		/>);
	}

	renderLogin() {
		return (<Login />);
	}

	login(e) {
		this.props.dispatch(fetchSubreddit('hot'));
	}

	render() {
		if (this.props.isLoading) return this.renderLoading('Loading...');
		if (this.props.isFetching) return this.renderLoading('Fetching subreddit...');

		if (this.props.isLoggingIn) {
			return this.renderLogin();
		}

		return (
			<View style={styles.container}>
				<View>
				<TouchableHighlight
					underlayColor="#dddddd"
					onPress={(e) => this.login(e)}
				>
					<Text style={styles.loginText}>Login </Text>
				</TouchableHighlight>
				</View>
				<RedditList listings={this.state.listings} />
			</View>
		);
	}

	componentDidMount() {
		this.props.dispatch(finishedLoading());
		this.props.dispatch(fetchSubreddit(''));
	}
};

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

function select(state) {
	console.log(state);
	return state.default || state;
}

export default connect(select)(RedditReact);
