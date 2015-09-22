import React, { Component, PropTypes, View, Text, TouchableHighlight, Image, } from 'react-native';

import styles from './styles';

export default class RedditListItem extends Component {
	static propTypes = { article: PropTypes.object }

	render() {
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
					</Text>
				</View>
				<View style={styles.scoreContainer}>
				  <Text style={styles.title}>
						{article.get('score')}
					</Text>
				</View>
			  </View>
		  </TouchableHighlight>
		);
	}
};
