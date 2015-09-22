import React, { Component, PropTypes, Text, View } from 'react-native';
import { TouchableHighlight, StyleSheet, ListView, TextInput } from 'react-native';

import { fetchSubreddit, finishedLoading, clearSubreddit } from '../actions/Reddit';
import { connect } from 'react-redux/native';

import Loading from './components/Loading';
import RedditList from '../components/RedditList';
import Login from '../components/Login';

import styles from './styles';

class RedditReact extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		isLoading: PropTypes.bool,
		isFetching: PropTypes.bool,
		isLoggingIn: PropTypes.bool,
		result: PropTypes.object,
		subreddit: PropTypes.string
	}

	constructor(props) {
		super(props);
		this.state = {
			subreddit: props.subreddit
		};
	}

	componentDidMount() {
		this.refresh();
	}

	componentWillRecieveProps(nextProps) {
		this.setState({
			subreddit: nextProps.subreddit
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

	refresh = (e) => {
		const subreddit = this.state.subreddit;

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
					<Text style={styles.refreshText}>Refresh</Text>
				</TouchableHighlight>
				<TextInput
					    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					    onChangeText={(subreddit) => this.setState({subreddit})}
					    value={this.state.subreddit}
					  />
				</View>
				<RedditList {...this.props.result} subreddit={this.props.subreddit} onPage={this.pageListings} />
			</View>
		);
	}
};

function select(state) {
	console.log(state);
	return state.default || state;
}

export default connect(select)(RedditReact);
