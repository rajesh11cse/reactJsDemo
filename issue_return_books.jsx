import React from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
class ManageUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalUsers: 0,
            searchuser: '',
            showTable: false,
            showErrorMessage: false,
            showUserDetails: false,
            userData: '',
        }
    }

    errorClass(dataLn, query) {
        if (dataLn <= 0) {
            return 'hidden';
        } else {
            if (query.length == 0) {
                return 'hidden';
            } else {
                return '';
            }
        }

    }


    showError(dataLn, query) {
        if (dataLn > 0) {
            return 'hidden';
        } else {
            if (query.length == 0) {
                return 'hidden';
            } else {
                return '';
            }
        }
    }

    searchUser() {
        var query = this.refs.searchuser.value.trim();
        if (query) {

            var mythis = this;

            mythis.setState({ searchuser: query });
            var getData = axios({
                method: 'GET',
                url: 'http://localhost:3000/api/lms/search_user?query=' + query,
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                responseType: 'application/json',
            })
            getData.then(function (response) {
                if (response.data.result == 'success' && response.data.data.length > 0) {
                    mythis.setState({ users: response.data.data, totalUsers: response.data.data.length });
                    mythis.setState({ showTable: true, showErrorMessage: false, showUserDetails: false });
                } else {
                    mythis.setState({ showTable: false, showErrorMessage: true, showUserDetails: false });
                }
            })
            getData.catch(function (error) {
                console.log(error);
            });
        }
    }

    selectUser(user) {
        this.refs.searchuser.value = null;
        this.setState({
            showTable: false,
            showErrorMessage: false,
            showUserDetails: true,
            userData: user
        });
    }

    render() {
        return (
            <div>
                <section className="content">
                    <section style={{
                        border: "1px solid #3C6EB4",
                        backgroundColor: '#fff', height: '55px', color: 'black', padding: 17
                    }} className="container">
                        <b className=""><a href="/#/" title="Home page" >Dashboard</a> / </b>
                        <b className="">Issue_Return Library Books</b>
                    </section>
                </section>
                <br />
                <section className="content">
                    <section style={{
                        border: "1px solid #3C6EB4", backgroundColor: '#fff',
                        color: 'black', padding: 18
                    }}
                        className="container">

                        <div className='form-group'>
                            <input ref="searchuser" defaultValue={this.state.searchuser} style={{ color: 'green', fontSize: '16px' }}
                                type="text" className="form-control" onChange={this.searchUser.bind(this)} placeholder='Search user by username or mobile number' />
                        </div>
                        <hr />

                        {this.state.showErrorMessage ?
                            <div style={{ color: 'red' }}>
                                <center>No record found for entry '<b>{this.state.searchuser}</b>'.</center>
                            </div>
                            : ''
                        }


                        {this.state.showTable ?
                            <table className='zceaTable'
                                summary="Sample Table" style={{ width: "100%" }}>
                                <thead style={{ border: "2px solid #1E90FF" }}>
                                    <tr>
                                        <th scope="col">Sl. No.</th>
                                        <th scope="col">User Id</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email Address</th>
                                        <th scope="col">Mobile Number</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.users.map((data, i) =>
                                        <tr key={i} scope="row">
                                            <td>{i + 1}</td>
                                            <td>{data.usrId}</td>
                                            <td>{data.usrName}</td>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.contactNumber}</td>
                                            <td>
                                                <button title="Select user to issue/return books" type="button" onClick={this.selectUser.bind(this, data)}
                                                    className="btn btn-info btn-xs">
                                                    <i className="glyphicon glyphicon-ok"></i> Select</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table> : ''
                        }

                        {this.state.showUserDetails ? <UsreDetail userData={this.state.userData} /> : null}
                    </section>
                </section>
            </div>
        )
    }
}

class UsreDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show_return_book_form: false,
            return_book_info: '',

            show_issue_book_form: false,
            issue_book_info: ''
        }
    }

    showBookIssueForm() {
        this.setState({ show_issue_book_form: !this.state.show_issue_book_form })
    }

    issue_books() {

    }

    showBookReturnForm() {
        this.setState({ show_return_book_form: !this.state.show_return_book_form })
    }
    return_books() {

    }

    render() {
        return (
            <div>
                <div className="col-md-6" style={{ fontSize: '14px', borderRight: '1px solid grey' }}>
                    <b> <span className="col-md-4">User Id</span><span className="col-md-1">:</span>
                        <span className="col-md-7" style={{ color: '#0950AD' }}>{this.props.userData.usrId}</span> </b><br />

                    <b> <span className="col-md-4">User Name</span><span className="col-md-1">:</span>
                        <span className="col-md-7" style={{ color: '#0950AD' }} >{this.props.userData.usrName}</span> </b><br />

                    <b> <span className="col-md-4">Name</span><span className="col-md-1">:</span>
                        <span className="col-md-7" style={{ color: '#0950AD' }} >{this.props.userData.name}</span></b><br />

                    <b> <span className="col-md-4">Email</span><span className="col-md-1">:</span>
                        <span className="col-md-7" style={{ color: '#0950AD' }} >{this.props.userData.email}</span></b><br />

                    <b><span className="col-md-4">Mobile Number.</span><span className="col-md-1">:</span>
                        <span className="col-md-7" style={{ color: '#0950AD' }}>{this.props.userData.contactNumber}</span></b><br />
                </div>
                <div className="col-md-6">
                    <div>You have been issued <b><span style={{ fontSize: '15px', color: 'red' }}>{this.props.userData.myBooks.length}</span>
                        &nbsp;books{/*<a href="">&nbsp;details</a>*/}</b></div>
                </div>
                <div className="col-md-12">
                    <hr />
                    {
                        !this.state.show_return_book_form ?
                            <button title="Retun books" className="btn btn-block btn-warning btn-sm"
                                onClick={this.showBookReturnForm.bind(this)}>Return books</button> :

                            <form name="rerun_book_form" className="col-md-12">
                                <div className="col-md-12">
                                    <b className="pull-right" style={{ color: 'green' }}><i>Return a book here !</i></b>
                                </div>

                                <div className="form-group">
                                    <label>Book Name/Book Id <em style={{ color: 'red' }}>*</em></label>
                                    <input type="text" name="return_book_info" ref="return_book_info" defaultValue={this.state.return_book_info} placeholder="Book Name/Book Id"
                                        className="form-control input-sm" />
                                </div>

                                <button type="submit" className="btn btn-sm btn-raised btn-success pull-right"
                                    onClick={this.return_books.bind()} disabled="">Submit</button>

                                <button type="submit" className="btn btn-sm btn-raised btn-danger pull-right"
                                    onClick={this.showBookReturnForm.bind(this)}>Cancel</button>
                                <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </form>
                    }

                    {
                        !this.state.show_issue_book_form ?
                            <button title="Issue books" className="btn btn-block btn-info btn-sm"
                                onClick={this.showBookIssueForm.bind(this)}>Issue books</button> :

                            <form name="rerun_book_form" className="col-md-12">
                                <div className="col-md-12">
                                    <b className="pull-right" style={{ color: 'green' }}><i>Issue a book here !</i></b>
                                </div>

                                <div className="form-group">
                                    <label>Book Name/Book Id <em style={{ color: 'red' }}>*</em></label>
                                    <input type="text" name="issue_book_info" ref="issue_book_info"
                                        defaultValue={this.state.issue_book_info} placeholder="Book Name/Book Id"
                                        className="form-control input-sm" />
                                </div>

                                <button type="submit" className="btn btn-sm btn-raised btn-success pull-right"
                                    onClick={this.issue_books.bind()} disabled="">Submit</button>

                                <button type="submit" className="btn btn-sm btn-raised btn-danger pull-right"
                                    onClick={this.showBookIssueForm.bind(this)}>Cancel</button>
                                <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </form>
                    }
                </div>
            </div>
        )
    }
}

export default ManageUsers;