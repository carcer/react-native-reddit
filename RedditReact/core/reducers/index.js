import { List } from 'immutable';

import { RECIEVE_SUBREDDIT, REQUEST_SUBREDDIT, CLEAR_SUBREDDIT,  } from '../actions/Reddit';

const initialState = {
	isFetching: false,
	isLoading: true,
	result: {
		listings: [],
		before: '',
		after: ''
	},
	subreddit: 'r/awww'
};

function redditApp(state = initialState, action) {
	switch (action.type) {
	case RECIEVE_SUBREDDIT:
		return Object.assign({}, state, {
			isFetching: false,
			isLoading: false,
			result: Object.assign({},
				action.result,
				{
					listings: state.result.listings.concat(action.result.listings)
				}
			),
			fetchedAt: action.fetchedAt
		});
	case REQUEST_SUBREDDIT:
		return Object.assign({}, state, {
			isFetching: true,
			subreddit: action.subreddit
		});
	case CLEAR_SUBREDDIT:
		return Object.assign({}, state, {
			result: initialState.result
		});
	default:
		return state;
	}
}

export default redditApp;
