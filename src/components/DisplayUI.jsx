import React from 'react';
import {connect} from 'react-redux';

class DisplayUI extends React.Component {
  
  render() {
    const cVal = (!this.props.countVal) ? 0 : this.props.countVal;
    return (
      <div className="card card-body bg-light">
        <h1 style={{color:'gray', 'textAlign': 'center'}}>{cVal}</h1>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    countVal: state.counter,
    todo: state.todo
  };
};

export default connect(mapStateToProps, {})(DisplayUI);