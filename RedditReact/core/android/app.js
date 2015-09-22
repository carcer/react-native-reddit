import React, { Component, PropTypes, } from 'react-native';

import { fetchSubreddit, clearSubreddit } from '../actions/Reddit';
import { connect } from 'react-redux/native';

import Loading from './components/Loading';
import Subreddit from '../components/Subreddit';
import Login from '../components/Login';

class RedditReact extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		isLoading: PropTypes.bool,
		isFetching: PropTypes.bool,
		isLoggingIn: PropTypes.bool,
		result: PropTypes.object,
		subreddit: PropTypes.string,
	}

	componentDidMount() {
		this.refresh();
	}

	renderLoading(text) {
		return (<Loading
			text={text}
		/>);
	}

	renderLogin() {
		return (<Login />);
	}

	refresh = () => {
		const subreddit = this.props.subreddit;

		this.props.dispatch(clearSubreddit());

		this.page({
			subreddit,
			after: ''
		});
	}

	page = (data) => {
		const opts = Object.assign({}, data, {
			subreddit:this.props.subreddit
		});

		this.props.dispatch(fetchSubreddit(opts));
	}

	render() {
		if (this.props.isLoading) return this.renderLoading('Loading...');

		if (this.props.isLoggingIn) return this.renderLogin();

		return (<Subreddit
					subreddit={this.props.subreddit}
					result={this.props.result}
					onFresh={this.refresh}
					onPage={this.page}
				/>);
	}
};

function select(state) {
	console.log(state);
	return state.default || state;
}

export default connect(select)(RedditReact);
