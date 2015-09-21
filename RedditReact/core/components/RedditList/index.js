import React, { Component, ListView, PropTypes } from 'react-native';

var RedditListItem = require('../RedditListItem');

export default class RedditList extends Component {
	static propTypes = { listings: PropTypes.array }

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

	render() {
		console.log(this.state.dataSource);
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderArticle}
				onEnd
			/>
		);
	}
};
