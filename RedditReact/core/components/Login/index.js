var React = require('react-native');

var {
	View,
	Text,
} = React;

const Login = React.createClass({
	render: function() {
		const apiUrl = 'https://www.reddit.com/api/v1';
		const requestId = new Date().getTime();
		const scope = 'read';
		const redirectUri='http://e4ums.co.uk/auth'
		const authorizeUrl = `${apiUrl}/authorize?client_id=RedditApp&response_type=token&
state=${requestId}&redirect_uri=${redirectUri}&scope=${scope}`;

		return (<View>
			<Text>
				{authorizeUrl}
			</Text>
        </View>
		);
	}
});

module.exports = Login;
