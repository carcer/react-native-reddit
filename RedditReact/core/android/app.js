import React, { Component, PropTypes, Text, View, TouchableHighlight, StyleSheet, ListView } from 'react-native';

import { fetchSubreddit, finishedLoading, clearSubreddit } from '../actions/Reddit';
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
		subreddit: PropTypes.string
	}

	componentDidMount() {
		this.refresh();
	}

	renderLoading(text) {
		return (<Loading
			text={text}
		/>);
	}

	renderLogin() {
		return (<Login />);
	}

	refresh = (e) => {
		const subreddit = this.props.subreddit;

		this.props.dispatch(clearSubreddit());
		this.props.dispatch(fetchSubreddit({
			subreddit,
			after: ''
		}));
	}

	pageListings = (data) => {
		this.props.dispatch(fetchSubreddit(Object.assign({}, data, {subreddit:this.props.subreddit})));
	}

	render() {
		if (this.props.isLoading) return this.renderLoading('Loading...');

		if (this.props.isLoggingIn) {
			return this.renderLogin();
		}

		return (
			<View style={styles.container}>
				<View>
				<TouchableHighlight
					underlayColor="#dddddd"
					onPress={this.refresh}
				>
					<Text style={styles.refreshText}>Refresh {this.props.subreddit}</Text>
				</TouchableHighlight>
				</View>
				<RedditList {...this.props.result} subreddit={this.props.subreddit} onPage={this.pageListings} />
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
	console.log(state);
	return state.default || state;
}

export default connect(select)(RedditReact);
