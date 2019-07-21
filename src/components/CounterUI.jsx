import React from 'react';
import {connect} from 'react-redux';
import BAC from "../action-creators/BaseActionCreator";
import {bindActionCreators} from 'redux';

class CounterUI extends React.Component {
  constructor(props){
    super(props);
    this.factorRef = React.createRef();
  }
  
  increment(){
    let factor =  parseInt(this.factorRef.current.value.trim()) ? parseInt(this.factorRef.current.value.trim()) : 1;
    this.props.increment(factor);
  }
  
  decrement(){
    let factor =  parseInt(this.factorRef.current.value.trim()) ? parseInt(this.factorRef.current.value.trim()) : 1;
    this.props.decrement(factor);
  }
  
  reset(){
    document.querySelector("#modificationFactor").value = "1";
    this.props.reset(this.props.todo);
  }
  
  initTodo(){
    this.props.initTodo(this.props.todo);
  }
  
  render() {
    return (
      <div className="card card-body bg-light">
        <div className="row min-vh-57px">
  
          <div className="col col-3">
            <input type="number" id="modificationFactor" className="form-control" min="1" ref={this.factorRef} />
          </div>
          
  
          <div className="col col-3">
            <button type="button" className="btn btn-primary" onClick={(e)=>this.decrement(e)}><span className="fa fa-minus"/></button>
          </div>
          
          <div className="col col-3">
            <button type="button" className="btn btn-success" onClick={(e)=>this.increment(e)}><span className="fa fa-plus"/></button>
          </div>
          
          <div className="col col-3">
            <button type="button" className="btn btn-danger" onClick={(e)=>{ this.reset(e);  this.initTodo(e); }}><span className="fa fa-recycle"/></button>
          </div>
    
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    countVal: state,
    todo: state.todo
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    increment : BAC.createIncrementAction,
    decrement : BAC.createDecrementAction,
    reset     : BAC.createInitializeAction,
    initTodo  : BAC.createInitializeTodoAction,
  }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CounterUI);