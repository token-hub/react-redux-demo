const redux = require('redux');
const createStore = redux.createStore;

// create action creator
const BUY_CAKE = {
	type: 'buy_cake',
	info: 'first redux'
}

// initial state
const initialState = {
	numCakes: 10
}

// reducer
const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'buy_cake':
			return { numCakes: state.numCakes - 1 }
		default:
			return state;
	}
}

// param = func
const store = createStore(reducer);

// getState returns {}
console.log('initial state', store.getState());

// param = func && returns unsubscribe func
const unsubscribe = store.subscribe( () => console.log('updated state', store.getState() ) );

for (i = 0; i < 5; i++) {
	// param {}
	store.dispatch(BUY_CAKE);
}

unsubscribe()