import React, { Component, PropTypes, Text, View, TouchableHighlight, StyleSheet, ListView } from 'react-native';

import { fetchSubreddit, finishedLoading } from '../actions/Reddit';
import { connect } from 'react-redux/native';

import Loading from './components/Loading';
import RedditList from '../components/RedditList';
import Login from '../components/Login';

class RedditReact extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		isLoading: PropTypes.bool,
		isFetching: PropTypes.bool,
		isLoggingIn: PropTypes.bool,
		listings: PropTypes.array,
	}

	componentDidMount() {
		this.props.dispatch(finishedLoading());
		this.props.dispatch(fetchSubreddit(''));
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
				<RedditList listings={this.props.listings} />
			</View>
		);
	}
};

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#F5FCFF',
	}
});

function select(state) {
	return state.default || state;
}

export default connect(select)(RedditReact);
