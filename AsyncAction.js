const redux = require('redux');
const createStore = redux.createStore;

const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default;
const applyMiddleware = redux.applyMiddleware;

// initial state
const initialState = {
	loading: false,
	data: [],
	error: ''
}

// action creators
const FETCH_USER_REQUEST = () => {
	return {
		type: 'FETCH_USER_REQUEST',
	}
}

const FETCH_USER_SUCCESS = users => {
	return {
		type: 'FETCH_USER_SUCCESS',
		payload: users
	}
}

const FETCH_USER_FAILURE = users => {
	return {
		type: 'FETCH_USER_FAILURE',
		payload: users
	}
}

// reducer 
const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'FETCH_USER_REQUEST':
			return {
				...state,
				loading: true
			}

		case 'FETCH_USER_SUCCESS':
			return {
				loading: false,
				data: action.payload,
				error: ''
			}

		case 'FETCH_USER_FAILURE':
			return {
				loading: false,
				data: [],
				error: action.payload
			}

		default:
			return state
	}
}

const fetchUser = () => {
	return dispatch => {
		dispatch(FETCH_USER_REQUEST());
		axios.get('https://jsonplaceholder.typi2code.com/users')
		.then( response => {
			dispatch(FETCH_USER_SUCCESS(response.data.map(user => user.id)));
		} )
		.catch( error => {
			dispatch(FETCH_USER_FAILURE(error.message))
		})
	}
}

// param (reducer, middleware) | returns func
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
console.log('initial state', store.getState());
store.subscribe( () => console.log( 'update state', store.getState() ) )
store.dispatch( fetchUser() );