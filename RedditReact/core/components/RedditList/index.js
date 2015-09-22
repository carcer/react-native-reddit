import React, { Component, ListView, PropTypes } from 'react-native';

import RedditListItem from '../RedditListItem';

export default class RedditList extends Component {
	static propTypes = {
		listings: PropTypes.array,
		onPage: PropTypes.func,
		before: PropTypes.string,
		after: PropTypes.string,
	}

	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}).cloneWithRows(props.listings),
		};
	}

	componentWillReceiveProps(nextProps) {
		if ( nextProps.listings )
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.listings),
			});
	}

	renderArticle(article) {
		return (<RedditListItem article={article} />);
	}

	endReached = () => {
		this.props.onPage({
			subreddit: 'hot',
			before: this.props.before,
			after: this.props.after,
		});
	}

	render() {
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderArticle}
				onEndReached={this.endReached}
				pageSize={this.state.dataSource.length}
				style={this.props.style}
			/>
		);
	}
};
