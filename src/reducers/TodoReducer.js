import  BC from '../constants/BaseConstants';

class TodoReducer {
  static initialState = [];
  
  static deleteItemById(items, id){
    let itemsClone = [...items];  // STATE IS NOT MODIFIED, RATHER CLONED...
    if(itemsClone.length){
      for(let iKey in itemsClone){
        const item = itemsClone[iKey];
        if(parseInt(item.id) === parseInt(id)){
          delete(itemsClone[iKey]);
          break;
        }
      }
    }
    return itemsClone.filter( item => { return !!item; });
  }
 
  static addOrUpdateNewItem(stateClone, action){
    if(action.payload.task === BC.CREATE_NEW_TODO_ITEM){
      stateClone.unshift(action.payload);
    }else if(action.payload.task === BC.UPDATE_TODO_ITEM){
      // LOOP THROUGH `stateClone` TO SEE IF YOU FIND A PAYLOAD THAT MATCHES THE GIVEN ID...
      // IF YOU DO, JUST UPDATE IT...
      for(let iKey in stateClone){
        const itemObj = stateClone[iKey];
        if(parseInt(itemObj.id) === parseInt(action.payload.id)){
          stateClone[iKey]  = action.payload;
        }
      }
    }
    return stateClone;
  }
  
  static markItemAsComplete(stateClone, action){
    let stateCopy = [...stateClone];
    let completed = [];
    // LOOP THROUGH `stateClone` TO SEE IF YOU FIND A PAYLOAD THAT MATCHES THE
    // ID OF THE ITEM TO MARK AS COMPLETE -- IF YOU DO, JUST RESET THE `done` FLAG TO BOOLEAN TRUE...
    for(let iKey in stateClone){
      const itemObj = stateCopy[iKey];
      if(parseInt(itemObj.id) === parseInt(action.id)){
        stateCopy[iKey]['done']  = true;
        completed.push(stateClone[iKey]);
        delete(stateCopy[iKey]);
      }
    }
    return stateCopy.filter((obj)=>{ return !!obj; }).concat(completed);
  }
  
  static todoReduction(state = TodoReducer.initialState, action){
    let newState;
    let stateClone  = [...state];
    
    switch (action.type){
      
      case BC.CREATE_NEW_TODO_ITEM:
        if(action.payload.id !== undefined){
          stateClone    = TodoReducer.addOrUpdateNewItem(stateClone, action)
        }
        newState        = stateClone;
        break;
  
        
      case BC.INITIALIZE_TODO_LIST:
        newState  =  TodoReducer.initialState;
        break;
        
      case BC.MANAGE_EDIT_TASK:
        newState  = state;
        break;
  
      case BC.MANAGE_DELETE_TASK:
        newState  = TodoReducer.deleteItemById(state, action.id);
        break;
  
      case BC.MANAGE_COMPLETE_TASK:
        if(action.id !== undefined){
          stateClone    = TodoReducer.markItemAsComplete(stateClone, action);
        }
        newState        = stateClone;
        break;
        
      default:
        newState        = state;
    }
    return newState;
  }
}

export const FncTodoReducer     = TodoReducer.todoReduction;