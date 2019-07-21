import React                from 'react';
import ReactDOM             from 'react-dom';
import App                  from './App';
import {Provider}           from 'react-redux';
import {createStore}        from 'redux';
import {combineReducers}    from 'redux';
import {FncCounterReducer}  from './reducers/CounterReducer';
import {FncTodoReducer}     from './reducers/TodoReducer';

const combinedReducers  = combineReducers({
  counter : FncCounterReducer,
  todo    : FncTodoReducer,
});


const store = createStore(combinedReducers,
  {
    counter : 0,
    todo    : []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);