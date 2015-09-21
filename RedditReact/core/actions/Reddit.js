import Immutable from 'immutable';

export const FETCH_SUBREDDIT = 'FETCH_SUBREDDIT';
export const REQUEST_SUBREDDIT = 'REQUEST_SUBREDDIT';
export const RECIEVE_SUBREDDIT = 'RECIEVE_SUBREDDIT';
export const LOADED = 'LOADED';

export function requestSubreddit() {
	return {
		type: REQUEST_SUBREDDIT
	};
}

export function recieveListing(response) {
	return {
		type: RECIEVE_SUBREDDIT,
		listings: response.data.children.map(i => Immutable.fromJS(i.data)),
		fetchedAt: Date.now()
	};
}

export function fetchSubreddit(subreddit) {
	return dispatch => {
		dispatch(requestSubreddit());

		return fetch(`https://www.reddit.com/${subreddit}.json`)
			.then(response => response.json())
			.then((response) => dispatch(recieveListing(response))).done();
	};
}

export function finishedLoading() {
	return {
		type: LOADED
	};
}
