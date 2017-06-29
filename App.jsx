import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  render() {
    return (
      <div>
        <div style={{ backgroundColor: 'black', height: '50px', color: 'white' }} className="col-md-12">
          <h4><center>Welcome</center></h4>
        </div>
        <div style={{ marginTop: '5px' }} className="col-md-2">
          <ul>
            <li><a className="active" href="/#/home">Home</a></li>
            <li><a href="/#/message">Message</a></li>
            <li><a href="/#/http">HTTPs</a></li>
            <li><a href="/#/about">About</a></li>
            <li><a href="/#/contact">Contact</a></li>
          </ul>
        </div>

        <div style={{ border: 'solid lightGrey 1px', marginTop: '5px'}} className="col-md-8">
          {this.props.children}
           <div className="col-md-12">&nbsp;</div>
        </div>
      </div>

    )
  }
}
export default App;


























      /*  <div>
          <button className="btn btn-primary">Button</button>
           <ul>
              <li><a href="/#/home">Home</a></li>
              <li><a href="/#/about">About</a></li>
              <li><a href="/#/contact">Contact</a></li>
           </ul>
     	
          {this.props.children}
        </div>*/