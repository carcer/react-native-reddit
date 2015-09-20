'use strict';

var React = require('react-native');
var {
	View,
	TouchableHighlight,
	Text,
	Image,
	StyleSheet,
} = React;

let RedditListItem = React.createClass({
	render: function() {
		const { article } = this.props;
		return (
	      <TouchableHighlight
          underlayColor="#dddddd">
	          <View style={styles.container}>
	            <Image
	              source={{uri: article.get('thumbnail')}}
	              style={styles.thumbnail}
	            />
	            <View style={styles.rightContainer}>
	              <Text style={styles.title}>
	              	{article.get('title')}
	              	{this.props.title}!
              	</Text>
	            </View>
	          </View>
          </TouchableHighlight>
	    );
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

module.exports = RedditListItem;
