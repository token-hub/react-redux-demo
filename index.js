const redux = require('redux');
const combineReducers = redux.combineReducers;
const createStore = redux.createStore;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger;

// param : logger
const applyMiddleware = redux.applyMiddleware;

// action creator
const BUY_CAKE = {
	type: 'BUY_CAKE'
}

const BUY_ICE_CREAM = {
	type: 'BUY_ICE_CREAM'
}

// initial state
const cakeInitialState = {
	numCake: 10
}

const iceCreamInitialState = {
	numIceCream: 20
}

// reducer | returns new state
const cakeReducer = (state = cakeInitialState, action) => {
	switch(action.type) {
		case 'BUY_CAKE':
			return { numCake: state.numCake - 1 }
		default:
			return state;
	}
}

const iceCreamReducer = (state = iceCreamInitialState, action) => {
	switch(action.type) {
		case 'BUY_ICE_CREAM':
			return { numIceCream: state.numIceCream - 1 }
		default: 
			return state;
	}
}

const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer
})

// param : (func, middleware) | returns funcs
const store = createStore(rootReducer, applyMiddleware(logger()) );

// returns {}
console.log('initial state', store.getState());

// returns unsubscribe() | param func
const unsubscribe = store.subscribe( () => {} ) 
store.dispatch(BUY_CAKE);
store.dispatch(BUY_CAKE);
store.dispatch(BUY_CAKE);
store.dispatch(BUY_ICE_CREAM);
store.dispatch(BUY_ICE_CREAM);
unsubscribe();