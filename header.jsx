import React from 'react';
import ReactDOM from 'react-dom';


class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light navbar-fixed-top custom-row-well"
          style={{ backgroundColor: "#3C6EB4", fontSize: "17px", fontWeight: "normal", fontFamily: "Arial", color: "#CFD0D1" }}>
          <div className="container-fluid">

            <div className="navbar-header">
              <a className="navbar-brand" href="" style={{ color: "#fff", fontSize: "19px" }}><b>LMS</b></a>
            </div>

            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li> <a href="#/lms/manage_users">Manage Users</a>  </li>
               {/* <li> <a href="#/lms/manage_books">Manage Library Books</a> </li>
                <li> <a href="#/lms/issue_return_books">Issue/Return Library Books</a>  </li>
                <li> <a href="#/lms/library_transactions">Manage Library Transactions</a>  </li>*/}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
              </ul>
            </div>

          </div>
        </nav>
        <br />
        <br />
        <br />
        <br />
        {this.props.children}
      </div>
    )
  }
}
export default Header;






{/*<section className="content">
            <section  style={{ border:"1px solid #3C6EB4", backgroundColor: '#fff', height: '60px', color: 'black', padding:'18'}} className="container">
                <b className=""> <a className="text-primary" href="#!/superadminlogin">Dashboard</a> / Manage Library Books</b>
            <b className="pull-right"><a href=""title="Add a book" >Add Book</a> ?</b>
            </section>
        </section>*/}