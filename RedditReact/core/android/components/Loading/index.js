import React, { Component, PropTypes, View, Text, ProgressBarAndroid } from 'react-native';

export default class Loading extends Component {
	static propTypes = {
		text: PropTypes.string.isRequired
	}

	render() {
		return (<View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
			<ProgressBarAndroid styleAttr="Small"/>
	        <Text style={{textAlign: 'center'}}>
	          {this.props.text}
	          </Text>
	      </View>);
	}

};
