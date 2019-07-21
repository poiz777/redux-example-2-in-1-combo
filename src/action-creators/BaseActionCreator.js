import  BC from '../constants/BaseConstants';

class BaseActionCreator {
  
  static createIncrementAction(payload){
    return {
      type    : BC.INCREMENT_NUM_VAL,
      payload,
    }
  }
  
  static createDecrementAction(payload){
    return {
      type    : BC.DECREMENT_NUM_VAL,
      payload,
    }
  }
  
  static createInitializeAction(payload){
    return {
      type    : BC.INITIALIZE_NUM_VAL,
      payload,
    }
  }
  
  static createTodoAction(payload){
    return {
      type    : BC.CREATE_NEW_TODO_ITEM,
      payload,
    }
  }
  
  static manageTodoTask(payload){
    return {
      type  : payload.task,
      id    : payload.id,
    }
  }
  
  static createInitializeTodoAction(payload){
    return {
      type    : BC.INITIALIZE_TODO_LIST,
      payload,
    }
  }
  
}

export default BaseActionCreator;