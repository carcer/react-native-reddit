'use strict';

var React = require('react-native');
var {
	View,
	ProgressBarAndroid,
	Text
} = React;

var Loading = React.createClass({
	render: function() {
		return (<View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
	        <ProgressBarAndroid styleAttr="Small"/>
	        <Text style={{textAlign: 'center'}}>
	          {this.props.text}
	        </Text>
	      </View>);
	}
});

module.exports = Loading;
