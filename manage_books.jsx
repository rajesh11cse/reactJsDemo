import React from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
class ManageBooks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bname: '',
            aname: '',
            quantity: '',

            formErrors: { bname: '', aname: '', quantity: ''},

            bnameValid: false,
            anameValid: false,
            quantityValid: false,

            formValid: false,
            showBookForm: false,
            books: [],

            totalBooks: 0,

            maxPageButton: 5,
            activePage: 1
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let bnameValid = this.state.bnameValid;
        let anameValid = this.state.anameValid;
        let quantityValid = this.state.quantityValid;

        switch (fieldName) {
            case 'bname':
                bnameValid = value.length >= 3;
                fieldValidationErrors.name = bnameValid ? '' : 'Book name is required.';
                break;

            case 'aname':
                anameValid = value.length >= 3;
                fieldValidationErrors.uname = anameValid ? '' : 'Author name is required.';
                break;

            case 'quantity':
                quantityValid = value > 0;
                fieldValidationErrors.phone = quantityValid ? '' : 'Quantity is invalid.';
                break;

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            bnameValid: bnameValid,
            anameValid: anameValid,
            quantityValid: quantityValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.bnameValid
            && this.state.anameValid
            && this.state.quantityValid
        });
    }

    handleBookInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    toggleShowForm() {
        this.setState({ showBookForm: !this.state.showBookForm });
    }

    createBook() {
        var myData = {
            bookName: this.state.bname,
            authorName: this.state.aname,
            quantity: this.state.quantity,
        }

        var mythis = this;
        var getData = axios({
            method: 'POST',
            url: 'http://localhost:3000/api/lms/add_books',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            responseType: 'application/json',
            data: myData
        })
        getData.then(function (response) {
            if (response.data.result == 'success') {
                mythis.setState({ showBookForm: !mythis.state.showBookForm });
                mythis.getBooks(mythis.state.activePage, mythis.state.maxPageButton);
            }
        })
        getData.catch(function (error) {
            console.log(error);
        });


    }


    componentDidMount() {
        this.getBooks(this.state.activePage, this.state.maxPageButton);
    }

    getBooks(pageNo, limit) {
        var myData = {
            pageNumber: pageNo,
            limit: limit,
        }

        var mythis = this;
        var getData = axios({
            method: 'POST',
            url: 'http://localhost:3000/api/lms/get_books',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            responseType: 'application/json',
            data: myData
        })
        getData.then(function (response) {
            console.log(response.data)
            mythis.setState({ books: response.data.data, totalBooks: response.data.count });
        })
        getData.catch(function (error) {
            console.log(error);
        });

    }


    removeBook(id) {

        if (window.confirm('Delete ?')) {
            var myData = {
                id: id,
            }

            var mythis = this;
            var getData = axios({
                method: 'DELETE',
                url: 'http://localhost:3000/api/lms/remove_book',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                responseType: 'application/json',
                data: myData
            })
            getData.then(function (response) {
                if (response.data.result == 'success') {
                    console.log("Removed")
                    mythis.getBooks(mythis.state.activePage, mythis.state.maxPageButton);
                }
            })
            getData.catch(function (error) {
                console.log(error);
            });
        }

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
                        <b className="">Manage Books</b>
                        <b className="pull-right">
                            {
                                !this.state.showBookForm ?
                                    <p onClick={this.toggleShowForm.bind(this)} title="Add a book" style={{ color: "green", cursor: "pointer" }}>Create?</p> :
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

                        {!this.state.showBookForm ? <BookTable
                            getBooks={this.getBooks.bind(this)}
                            removeBook={this.removeBook.bind(this)}
                            totalBooks={this.state.totalBooks} 
                            tableData={this.state.books} /> :

                            <div>

                                <p className="pull-right" style={{ color: 'red', fontStyle: 'italic' }}>
                                    (*) fileds are required.</p>
                                <h2>Add a book here..</h2>

                                {/*Error message*/}
                                <p className="col-md-12 pull-right" style={{ color: 'red' }}>
                                    {!this.state.formValid ? <FormErrors formErrors={this.state.formErrors} /> : ''}
                                </p>



                                <div className="row">
                                    {/*Book Name */}
                                    <div className={`form-group col-md-12 ${this.errorClass(this.state.formErrors.bname)}`}>
                                        <label htmlFor="bname">Book Name <em style={{ color: 'red' }}>*</em></label>
                                        <input type="text" value={this.state.bname} className="form-control"
                                            name="bname" onChange={(event) => this.handleBookInput(event)} />
                                    </div>

                                    {/*Author Name */}
                                    <div className={`form-group col-md-12 ${this.errorClass(this.state.formErrors.aname)}`}>
                                        <label htmlFor="aname">Author Name <em style={{ color: 'red' }}>*</em></label>
                                        <input type="text" value={this.state.aname} className="form-control"
                                            name="aname" onChange={(event) => this.handleBookInput(event)} />
                                    </div>

                                    {/*Book Quantity */}
                                    <div className={`form-group col-md-12 ${this.errorClass(this.state.formErrors.quantity)}`}>
                                        <label htmlFor="email">Quantity <em style={{ color: 'red' }}>*</em></label>
                                        <input type="number" value={this.state.quantity} className="form-control"
                                            name="quantity" onChange={(event) => this.handleBookInput(event)} />
                                    </div>


                                    {/*Submit */}
                                    <div className={`col-md-12`}>
                                        <button onClick={this.createBook.bind(this)} type="button" className=" col-md-12 btn btn-primary" disabled={!this.state.formValid}>
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




class BookTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxPageButton: 5,
            activePage: 1,
            searchbook: ''
        };

    }

    pageChange(pageNumber) {
        this.setState({ activePage: pageNumber })
        this.props.getBooks(pageNumber, this.state.maxPageButton)
    }

    removeBook(id) {
        this.setState({ activePage: 1 })
        this.props.removeBook(id)
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
                {/*Book Name */}
                <div style={{color:'red'} }className={` ${this.showError(this.props.tableData.length)}`}>
                    <center>No book found in database.</center>
                </div>
                {/*  <Pagination
                    className="pull-right"
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={Math.ceil(this.props.totalBooks / this.state.maxPageButton)}
                    maxButtons={this.state.maxPageButton}
                    activePage={this.state.activePage}
                    onSelect={this.pageChange.bind(this)} />*/}
                <table className={`zceaTable ${this.errorClass(this.props.tableData.length)}`} summary="Sample Table" style={{ width: "100%" }}>
                    <thead style={{ border: "2px solid #1E90FF" }}>
                        <tr>
                            <th scope="col">Sl. No.</th>
                            <th scope="col">Book Id</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Author Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tableData.map((message, i) =>
                            <tr key={i} scope="row">
                                <td>{i + 1 + this.state.maxPageButton * (this.state.activePage - 1)}</td>
                                <td>{message.bookId}</td>
                                <td>{message.bookName}</td>
                                <td>{message.authorName}</td>
                                <td>{message.quantity}</td>
                                <td>
                                    <button type="button" onClick={this.removeBook.bind(this, message._id)} className="btn btn-danger btn-xs">
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
                    items={Math.ceil(this.props.totalBooks / this.state.maxPageButton)}
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


export default ManageBooks;