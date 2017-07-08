import React from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
class ManageUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            uname: '',
            phone: '',
            email: '',
            formErrors: { name: '', uname: '', phone: '', email: '' },
            nameValid: false,
            phoneValid: false,
            emailValid: false,
            unameValid: false,
            formValid: false,
            showUserForm: false,
            users: [],
            totalUsers: 0,
            maxPageButton: 5,
            activePage: 1
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let phoneValid = this.state.phoneValid;
        let nameValid = this.state.nameValid;
        let unameValid = this.state.unameValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email address is invalid.';
                break;

            case 'name':
                nameValid = value.length >= 3;
                fieldValidationErrors.name = nameValid ? '' : 'Full name is required.';
                break;

            case 'uname':
                unameValid = value.length >= 3;
                fieldValidationErrors.uname = unameValid ? '' : 'User name is required.';
                break;

            case 'phone':
                phoneValid = value.length >= 10 && value.length <= 10;
                fieldValidationErrors.phone = phoneValid ? '' : 'Phone number is invalid.';
                break;

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            phoneValid: phoneValid,
            nameValid: nameValid,
            unameValid: unameValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.emailValid
            && this.state.phoneValid
            && this.state.nameValid
            && this.state.unameValid
        });
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    toggleShowForm() {
        this.setState({ showUserForm: !this.state.showUserForm });
    }

    createUser() {
        var myData = {
            usrName: this.state.uname,
            name: this.state.name,
            email: this.state.email,
            contactNumber: this.state.phone,
        }

        var mythis = this;
        var getData = axios({
            method: 'POST',
            url: 'http://localhost:3000/api/lms/add_usrs',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            responseType: 'application/json',
            data: myData
        })
        getData.then(function (response) {
            if (response.data.result == 'success') {
                mythis.setState({ showUserForm: !mythis.state.showUserForm });
                mythis.getUsers(mythis.state.activePage, mythis.state.maxPageButton);
            }
        })
        getData.catch(function (error) {
            console.log(error);
        });


    }


    componentDidMount() {
        this.getUsers(this.state.activePage, this.state.maxPageButton);
    }

    getUsers(pageNo, limit) {
        var myData = {
            pageNumber: pageNo,
            limit: limit,
        }

        var mythis = this;
        var getData = axios({
            method: 'POST',
            url: 'http://localhost:3000/api/lms/get_usrs',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            responseType: 'application/json',
            data: myData
        })
        getData.then(function (response) {
            mythis.setState({ users: response.data.data, totalUsers: response.data.count });
        })
        getData.catch(function (error) {
            console.log(error);
        });

    }


    removeUser(id) {

        if (window.confirm('Delete ?')) {
            var myData = {
                id: id,
            }

            var mythis = this;
            var getData = axios({
                method: 'DELETE',
                url: 'http://localhost:3000/api/lms/remove_usr',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                responseType: 'application/json',
                data: myData
            })
            getData.then(function (response) {
                if (response.data.result == 'success') {
                    console.log("Removed")
                    mythis.getUsers(mythis.state.activePage, mythis.state.maxPageButton);
                }
            })
            getData.catch(function (error) {
                console.log(error);
            });
        }

    }

    searchUser(query) {
        if (query.length >= 3) {

            var mythis = this;
            var getData = axios({
                method: 'GET',
                url: 'http://localhost:3000/api/lms/search_user?query=' + query,
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                responseType: 'application/json',
            })
            getData.then(function (response) {
                if (response.data.result == 'success') {
                    mythis.setState({ users: response.data.data, totalUsers: response.data.length });
                }
            })
            getData.catch(function (error) {
                console.log(error);
            });
        }
    }


    cancelSearch() {
        this.getUsers(this.state.activePage, this.state.maxPageButton);
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
                        <b className="">Manage Users</b>
                        <b className="pull-right">
                            {
                                !this.state.showUserForm ?
                                    <p onClick={this.toggleShowForm.bind(this)} title="Add a user" style={{ color: "green", cursor: "pointer" }}>Create?</p> :
                                    <p onClick={this.toggleShowForm.bind(this)} title="Cancel" style={{ color: "red", cursor: "pointer" }}>Cancel?</p>
                            }
                        </b>
                    </section>
                </section>
                <br />
                <section className="content">
                    <section style={{
                        border: "1px solid #3C6EB4", backgroundColor: '#fff',
                        color: 'black', padding: 18
                    }}
                        className="container">

                        {!this.state.showUserForm ? <UserTable
                            getUsers={this.getUsers.bind(this)}
                            removeUser={this.removeUser.bind(this)}
                            cancelSearch={this.cancelSearch.bind(this)}
                            searchUser={this.searchUser.bind(this)}
                            totalUsers={this.state.totalUsers} tableData={this.state.users} /> :

                            <div>

                                <p className="pull-right" style={{ color: 'red', fontStyle: 'italic' }}>
                                    (*) fileds are required.</p>
                                <h2>User Registration Form</h2>

                                {/*Error message*/}
                                <p className="col-md-12 pull-right" style={{ color: 'red' }}>
                                    {!this.state.formValid ? <FormErrors formErrors={this.state.formErrors} /> : ''}
                                </p>



                                <div className="row">
                                    {/*Full Name */}
                                    <div className={`form-group col-md-12 ${this.errorClass(this.state.formErrors.name)}`}>
                                        <label htmlFor="name">Full Name <em style={{ color: 'red' }}>*</em></label>
                                        <input type="text" value={this.state.name} className="form-control"
                                            name="name" onChange={(event) => this.handleUserInput(event)} />
                                    </div>

                                    {/*User Name */}
                                    <div className={`form-group col-md-12 ${this.errorClass(this.state.formErrors.uname)}`}>
                                        <label htmlFor="uname">User Name <em style={{ color: 'red' }}>*</em></label>
                                        <input type="text" value={this.state.uname} className="form-control"
                                            name="uname" onChange={(event) => this.handleUserInput(event)} />
                                    </div>

                                    {/*Mobile Number */}
                                    <div className={`form-group col-md-12 ${this.errorClass(this.state.formErrors.phone)}`}>
                                        <label htmlFor="email">Phone Number <em style={{ color: 'red' }}>*</em></label>
                                        <input type="number" value={this.state.phone} className="form-control"
                                            name="phone" onChange={(event) => this.handleUserInput(event)} />
                                    </div>

                                    {/*Email */}
                                    <div className={`form-group col-md-12 ${this.errorClass(this.state.formErrors.email)}`}>
                                        <label htmlFor="email">Email Address <em style={{ color: 'red' }}>*</em></label>
                                        <input type="email" value={this.state.email} className="form-control"
                                            name="email" onChange={(event) => this.handleUserInput(event)} />
                                    </div>


                                    {/*Submit */}
                                    <div className={`col-md-12`}>
                                        <button onClick={this.createUser.bind(this)} type="button" className=" col-md-12 btn btn-primary" disabled={!this.state.formValid}>
                                            Sign up
                                    </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </section>
                </section>
            </div>
        )
    }
}




class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxPageButton: 5,
            activePage: 1,
            searchuser: ''
        };

    }

    pageChange(pageNumber) {
        this.setState({ activePage: pageNumber })
        this.props.getUsers(pageNumber, this.state.maxPageButton)
    }

    removeUser(id) {
        this.setState({ activePage: 1 })
        this.props.removeUser(id)
    }


    searchUser() {
        var query = this.refs.searchuser.value;
        this.props.searchUser(query)
    }


    cancelSearch() {
        this.refs.searchuser.value = '';
        this.props.cancelSearch()
    }

    errorClass(dataLn) {
        if (dataLn > 0) {
            return '';
        } else {
            return 'hidden';
        }
    }


    showError(dataLn) {
        if (dataLn > 0) {
            return 'hidden';
        } else {
            return '';
        }
    }

    render() {
        return (
            <div >
                {/*User Name */}
                <div className='input-group'>
                    <input ref="searchuser" defaultValue={this.state.searchuser} style={{ color: 'green', fontSize: '16px' }}
                        type="text" className="form-control" placeholder='Search user by username or mobile number' />
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-info btn" onClick={this.searchUser.bind(this)}>
                            <i className="glyphicon glyphicon-search"></i> Search</button>
                        <button type="button" className="btn btn-danger btn" onClick={this.cancelSearch.bind(this)}>
                            <i className="glyphicon glyphicon-remove"></i> Cancel</button>
                    </span>
                </div>
                <hr />
                <div style={{color:'red'} }className={` ${this.showError(this.props.tableData.length)}`}>
                    <center>No user found in database.</center>
                </div>
                {/*  <Pagination
                    className="pull-right"
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={Math.ceil(this.props.totalUsers / this.state.maxPageButton)}
                    maxButtons={this.state.maxPageButton}
                    activePage={this.state.activePage}
                    onSelect={this.pageChange.bind(this)} />*/}
                <table className={`zceaTable ${this.errorClass(this.props.tableData.length)}`} summary="Sample Table" style={{ width: "100%" }}>
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
                        {this.props.tableData.map((message, i) =>
                            <tr key={i} scope="row">
                                <td>{i + 1 + this.state.maxPageButton * (this.state.activePage - 1)}</td>
                                <td>{message.usrId}</td>
                                <td>{message.usrName}</td>
                                <td>{message.name}</td>
                                <td>{message.email}</td>
                                <td>{message.contactNumber}</td>
                                <td>
                                    <button type="button" onClick={this.removeUser.bind(this, message._id)} className="btn btn-danger btn-xs">
                                        <i className="glyphicon glyphicon-trash"></i> Remove</button>
                                        &nbsp;&nbsp;<button type="button" className="btn btn-info btn-xs">
                                        <i className="glyphicon glyphicon-edit"></i> Edit</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination
                    className={`pull-right ${this.errorClass(this.props.tableData.length)}`}
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={Math.ceil(this.props.totalUsers / this.state.maxPageButton)}
                    maxButtons={this.state.maxPageButton}
                    activePage={this.state.activePage}
                    onSelect={this.pageChange.bind(this)} />
            </div>
        );
    }
}



const FormErrors = ({ formErrors }) =>
    <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <h6 key={i}>- {formErrors[fieldName]}</h6>
                )
            } else {
                return '';
            }
        })}
    </div>


export default ManageUsers;