import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import RootReducer from 'Reducers/root';

export default createStore(RootReducer, applyMiddleware(thunkMiddleware));
