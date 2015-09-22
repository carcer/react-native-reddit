import React, { Component, View, TouchableHighlight, TextInput, PropTypes, Text } from 'react-native';

import RedditList from '../RedditList';

import styles from './styles';

export default class Subreddit extends Component {
	static propTypes = {
		result: PropTypes.object,
		subreddit: PropTypes.string,
		onRefresh: PropTypes.func,
		onPage: PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			subreddit: props.subreddit
		};
	}

	componentWillRecieveProps(nextProps) {
		this.setState({
			subreddit: nextProps.subreddit
		});
	}

	pageListings = (data) => {
		this.props.onPage(Object.assign({}, data, {
			subreddit: this.props.subreddit
		}));
	}

	refresh = () => {
		this.props.onRefresh(Object.assign({}, data, {
			subreddit:this.state.subreddit
		}));
	}

	render() {
		return (<View style={styles.container}>
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
				<RedditList
					{...this.props.result}
					style={styles.listView}
					subreddit={this.props.subreddit}
					onPage={this.pageListings}
				/>
			</View>);
	}
}
