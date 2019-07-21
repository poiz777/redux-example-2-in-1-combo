import React            from 'react';
import CounterUI from "./components/CounterUI";

import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayUI from "./components/DisplayUI";
import TodoForm from "./components/TodoForm";


import './assets/css/font-awesome.min.css';
import './assets/css/app-base-styles.css';


class App extends React.Component{
  
  render(){
    return (
      <div className="container">
        <div className="row">
          
          <div className="col">
            <CounterUI />
          </div>
          
          <div className="col">
            <DisplayUI />
          </div>
          
        </div>
        
        <div className="row">
          <div className="col">
            <div className="spacer"/>
            <div className="card card-body bg-light">
              <TodoForm />
            </div>
          </div>
        </div>
      </div>
    );
    
  }
}
export default App;
