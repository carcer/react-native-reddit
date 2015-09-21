import { RECIEVE_SUBREDDIT, REQUEST_SUBREDDIT, LOADED } from '../actions/Reddit';

function redditApp(state = {isFetching: false,  isLoading: true}, action) {
	switch (action.type) {
		case RECIEVE_SUBREDDIT:
			return Object.assign({}, state, {
				isFetching: false,
				isLoading: false,
				listings: action.listings,
				fetchedAt: action.fetchedAt
			});
		case REQUEST_SUBREDDIT:
			return Object.assign({}, state, { isFetching: true })
		//case LOADED:
		//	return Object.assign({}, state, { isLoading: false })
		default:
			return state;
	}
}

export default redditApp;
