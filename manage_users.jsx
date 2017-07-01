import React from 'react';
import mydata from './users.json';
import { Pagination } from 'react-bootstrap';
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
            mydata2: mydata
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
                fieldValidationErrors.email = emailValid ? '' : 'Email address is invalid';
                break;

            case 'name':
                nameValid = value.length >= 3;
                this.mydata.map(function (item) {
                    <div>{item}</div>
                })
                fieldValidationErrors.name = nameValid ? '' : 'Full name is required';
                break;

            case 'uname':
                unameValid = value.length >= 3;
                fieldValidationErrors.uname = unameValid ? '' : 'User name is required';
                break;

            case 'phone':
                phoneValid = value.length >= 10 && value.length <= 10;
                fieldValidationErrors.phone = phoneValid ? '' : 'Phone number is invalid';
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

                        {!this.state.showUserForm ? <UserTable tableData={this.state.mydata2} /> :

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
                                        <button type="submit" className=" col-md-12 btn btn-primary" disabled={!this.state.formValid}>
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
    constructor() {
        super();
        this.state = {
            maxPageButton : 3,
            activePage : 1
        };
    }

    pageChange(pageNumber){
        console.log(pageNumber)
        this.setState({activePage : pageNumber})
    }

    render() {
        return (
            <div >
                <Pagination
                    className="pull-right"
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={this.props.tableData.length}
                    maxButtons={this.state.maxPageButton}
                    activePage={this.state.activePage}
                    onSelect={this.pageChange.bind(this)} />
                <table className="zceaTable" summary="Sample Table" style={{ width: "100%" }}>
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
                                <td>{i + 1}</td>
                                <td>{message.id}</td>
                                <td>{message.uname}</td>
                                <td>{message.name}</td>
                                <td>{message.email}</td>
                                <td>{message.phone}</td>
                                <td>
                                    <button type="button" className="btn btn-danger btn-xs">
                                        <i className="glyphicon glyphicon-trash"></i> Remove</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination
                    className="pull-right"
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={this.props.tableData.length}
                    maxButtons={this.state.maxPageButton}
                    activePage={this.state.activePage}
                    onSelect={this.pageChange.bind(this)} />
            </div>
        );
    }
}


/*var userForm = React.createClass({
    render: function() {
        return (
            <div >
                Some Results
            </div>
        );
    }
})*/



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