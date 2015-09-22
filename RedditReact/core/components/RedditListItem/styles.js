import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
	scoreContainer: {
		position: 'absolute',
		padding: 5,
		paddingTop: 5,
		paddingBottom: 0,
		top: 0,
		right: 0,
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.6)',
	},
	title: {
		fontSize: 12,
		marginBottom: 8,
		textAlign: 'left',
		color: 'white'
	},
	thumbnail: {
		flex: 1,
		height: 140,
	},
	listView: {
		backgroundColor: '#F5FCFF',
	},
});
