import Immutable from 'immutable';

export const FETCH_SUBREDDIT = 'FETCH_SUBREDDIT';
export const REQUEST_SUBREDDIT = 'REQUEST_SUBREDDIT';
export const RECIEVE_SUBREDDIT = 'RECIEVE_SUBREDDIT';
export const CLEAR_SUBREDDIT = 'CLEAR_SUBREDDIT';
export const LOADED = 'LOADED';

const URL_BASE = 'https://www.reddit.com/';

export function requestSubreddit(opts) {
	return {
		type: REQUEST_SUBREDDIT,
		...opts
	};
}

export function recieveListing(response) {
	console.log(response);
	return {
		type: RECIEVE_SUBREDDIT,
		result: {
			listings: response.data.children.map(i => Immutable.fromJS(i.data)),
			after: response.data.after,
			before: response.data.before,
		},
		fetchedAt: Date.now()
	};
}

export function fetchSubreddit(opts) {
	return dispatch => {
		dispatch(requestSubreddit({subreddit: opts.subreddit}));
		let fetchUrl = `${URL_BASE}${opts.subreddit}.json?count=2&after=${opts.after || ''}`;
		console.info(fetchUrl);

		return fetch(fetchUrl)
			.then(response => {
				console.info(response);
				return response.json()})
			.then((response) => dispatch(recieveListing(response))).done();
	};
}

export function clearSubreddit() {
	return {
		type: CLEAR_SUBREDDIT
	};
}

export function finishedLoading() {
	return {
		type: LOADED
	};
}
