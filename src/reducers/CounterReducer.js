import  BC from '../constants/BaseConstants';

class CounterReducer {
  
  static initialState = 0;
  
  static counterReduction(state = CounterReducer.initialState, action){
    let newState;
    const factor = action.payload ? action.payload : 1;
    
    switch (action.type){
      case BC.INCREMENT_NUM_VAL:
        newState  = state+parseInt(factor);
        break;
  
      case BC.DECREMENT_NUM_VAL:
        const val = (state - parseInt(factor));
        newState  = state <= 0 || val <= 0 ? 0 : val;
        break;
  
      case BC.INITIALIZE_NUM_VAL:
        newState  =  CounterReducer.initialState;
        break;
        
      default:
        newState  = state;
    }
    return newState;
  }
}

export const FncCounterReducer  = CounterReducer.counterReduction;