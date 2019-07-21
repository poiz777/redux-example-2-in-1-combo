import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import BC from '../constants/BaseConstants';

import BAC from "../action-creators/BaseActionCreator";

// import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";
// import DateTimePicker from 'react-datetime-picker';


class TodoForm extends React.Component {
  
  constructor(props){
    super(props);
    this.apiKey = "c8d4dpgrwvomrx4urjmgcxxygchv7tqpo7o845hrj24lq66l";
    this.now    = new Date();
    this.state  = {
      addText : 'Add'
    };
    this.todoBtn    = React.createRef();
    this.todoDate   = React.createRef();
    this.todoField  = React.createRef();
  }
  
  updateDueDate(e){
    
  }
  
  addToDoItem(e){
    const rawDate   = (this.todoDate.current.value.trim()) ? new Date( this.todoDate.current.value.trim()) : new Date();
    const dueDate   = moment(rawDate).fromNow() + " -- " + moment(rawDate).format("dddd, Do MMMM YYYYTHH:mm:ss");      // (new Date()).toUTCString();
    const btnText   = this.todoBtn.current.innerHTML.trim();
    const todoText  = this.todoField.current.value.trim();
    const id        = this.todoField.current.getAttribute('data-active-item-id');
    
    const checkDKey = e.type.toLowerCase() === 'keydown' || e.type.toLowerCase() === 'click';
    if(!checkDKey){
      return false;
    }else if(e.type.toLowerCase() === 'keydown'){   // USE ENTER AS KEYBOARD-SHORT-CUT FOR ADD BUTTON.
      const keyCode       = (e.keyCode ? e.keyCode : e.which);
      const enterPressed  = (parseInt(keyCode) === 13);
      if(!enterPressed){
        return false;
      }
    }
    
    if(!todoText){
      alert("You must enter some action to do...");
      return false;
    }
    
    let payload     = {
      date    : dueDate,
      rawDate : moment(rawDate).format(moment.HTML5_FMT.DATETIME_LOCAL),
      todo    : todoText,
      id      : (btnText.toLowerCase() === 'update') ? id : Math.floor(Math.random()*13978),
      task    : (btnText.toLowerCase() === 'update') ? BC.UPDATE_TODO_ITEM  : BC.CREATE_NEW_TODO_ITEM,
      done    : false,
    };
    
    this.props.addToDoItem(payload);
    this.todoField.current.value  = '';
    this.todoDate.current.value   = '';
    this.setState({addText : 'Add'});
  }
  
  manageTodoTask(e, task){
    this.todoField.current.value  = '';
    this.todoDate.current.value   = '';
    const id    = e.currentTarget.getAttribute('data-id');
    const text  = e.currentTarget.getAttribute('data-txt');
    const dDate = e.currentTarget.getAttribute('data-due-date');
    this.todoField.current.setAttribute('data-active-item-id', id);
    let payload =  {
      id    : id,
      task  : task,
    };
    this.setState({addText: 'Add'});    // RESET THE ADD TEXT TO DEFAULT STRING: 'Add'
    
    if(task === BC.MANAGE_EDIT_TASK){
      this.setState({addText: 'Update'});
      this.todoField.current.value  = text;
      this.todoDate.current.value   = dDate;
    }
    this.props.manageTodoTask(payload);
  }
  
  
  renderTodoLists(){
    let tabbedPanels  = '';
  
    if(this.props.todo && this.props.todo.length){
      tabbedPanels  = (
        <div className="row">
          <div className="col col-2 panel">
            <strong className="tab-pane">View All</strong>
          </div>
    
          <div className="col col-2 panel">
            <strong className="tab-pane">View Completed</strong>
          </div>
        </div>
      );
      tabbedPanels  = '';
      let rayTodoItems = this.props.todo.map((todoItem, iKey) => {
        const doneTaskClass = todoItem.done ? 'task-done' : '';
        const manage        = !todoItem.done;
        return (todoItem.id === undefined) ? null : (
          <li className={ `list-group-item todo-list-item ${doneTaskClass}`} key={todoItem.id}>
            <div className="row">
              <div className="pz-task pz-item-inner col col-10">
                
                <div className="todo-date"><span className="due-for">Due:</span> {todoItem.date}</div>
  
                <div className="row">
                  <div className="col col-1">
                    <span className="badge badge-dark">{iKey+1}</span>
                  </div>
                  <div className="col col-11">
                    <span className="todo-info">{todoItem.todo}</span>
                  </div>
                </div>
                
              </div>
              
              <div className="pz-actions pz-item-inner col col-2">
                <span className="btn btn-success" data-txt={todoItem.todo} data-due-date={todoItem.rawDate} data-id={todoItem.id} onClick={ (e, manage)=>{ if(!manage) this.manageTodoTask(e, BC.MANAGE_COMPLETE_TASK);} }><span className="fa fa-check" /></span>
                <span className="btn btn-primary" data-txt={todoItem.todo} data-due-date={todoItem.rawDate} data-id={todoItem.id} onClick={ (e)=>{ if(manage) this.manageTodoTask(e, BC.MANAGE_EDIT_TASK) ;} }><span className="fa fa-pencil" /></span>
                <span className="btn btn-danger"  data-txt={todoItem.todo} data-due-date={todoItem.rawDate} data-id={todoItem.id} onClick={ (e)=>{ this.manageTodoTask(e, BC.MANAGE_DELETE_TASK);} }><span className="fa fa-trash" /></span>
              </div>
            </div>
          </li>
        );
      });
      return (
        <div className="">
          {tabbedPanels}
          <ul className="list-group list-unstyled">
            {rayTodoItems}
          </ul>
        </div>
      )
    }
    return '';
  }
  
  render() {
    return (
      <section className='pz-TodoForm'>
        <div className="row">
          
          <div className="col col-6">
            <div className="form-group">
              <small className="mock-label">Task:</small>
              <input type="text" className="form-control" id="todoText" ref={this.todoField} placeholder="I'd like to..." onKeyDown={e=>{ this.addToDoItem(e)}} />
            </div>
          </div>
          
          <div className="col col-6">
            <div className="form-group">
              <small className="mock-label">Due Date:</small>
              <input type="datetime-local" className="form-control" id="todoDate" ref={this.todoDate} placeholder="I'd like to..." onChange={e=>{ this.updateDueDate(e)}} />
            </div>
          </div>
          
        </div>
        <div className="form-group">
          <button type='button' ref={this.todoBtn} className="btn btn-success"  onClick={e=>{this.addToDoItem(e)}}>{this.state.addText}</button>
        </div>
        <div className="spacer" />
        <div className="todo-lists">
          {this.renderTodoLists()}
        </div>
      </section>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    todo: state.todo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addToDoItem     : BAC.createTodoAction,
    manageTodoTask  : BAC.manageTodoTask,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
