'use strict';

var React = require('react-native');

var {
	ListView,
} = React;

var RedditListItem = require('../RedditListItem');

let RedditList = React.createClass({
	renderArticle: function(article) {
	    return (<RedditListItem article={article} />);
	},

	render: function() {
		return (
			<ListView
		        dataSource={this.props.listings}
		        renderRow={this.renderArticle}
		        onEnd
	      	/>
		);
	}
});

module.exports = RedditList;
