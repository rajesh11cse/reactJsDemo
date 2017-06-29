import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import Button from 'react-bootstrap/lib/Button';

class FormValidation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            gender: '',
            email: '',
            password: '',
            confirmPassword: '',
            dob: new Date().toISOString(),
            formErrors: { name: '', phone: '', gender: '', email: '', password: '', confirmPassword: '' },
            nameValid: false,
            phoneValid : false,
            emailValid: false,
            passwordValid: false,
            confirmPasswordValid: false,
            formValid: false
        }

        this.maxDate = new Date().toISOString();
        // this.minDate =   new Date((new Date()).setMonth((new Date()).getMonth() - 12*)).toISOString();
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let phoneValid = this.state.phoneValid;
        let nameValid = this.state.nameValid;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;
        let passwordTooShort = false;
        let passwordTooLong = false;



        console.log(passwordValid)

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;

            case 'password':
                passwordValid = value.length >= 6 && value.length <= 10;
                passwordTooShort = value.length < 6;
                passwordTooLong = value.length > 10;
                localStorage.setItem('pass', value);
                fieldValidationErrors.password = passwordValid ? '' : (passwordTooShort ? ' is too short' : passwordTooLong ? ' is too long' : '');
                break;

            case 'confirmPassword':
                confirmPasswordValid = passwordValid && value !== localStorage.getItem('pass');
                fieldValidationErrors.confirmPassword = !confirmPasswordValid ? '' : ' do not match';
                break;

            case 'name':
                nameValid = value.length >= 3;
                fieldValidationErrors.name = nameValid ? '' : ' is required';
                break;

            case 'phone':
                phoneValid = value.length >= 10 && value.length <= 10;
                fieldValidationErrors.phone = phoneValid ? '' : ' is invalid';
                break;

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleChange(value, formattedValue) {
        console.log(value)
        console.log(value)
    }




    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <p className="pull-right" style={{ color: 'red', fontStyle: 'italic' }}>
                        (*) fileds are required.
                    </p>
                    <h2>React Form Validation Demo</h2>


                    {/*Error message*/}
                    <p className="pull-right" style={{ color: 'red' }}>
                        {!this.state.formValid ? <FormErrors formErrors={this.state.formErrors} /> : ''}
                    </p>


                    <div className="row">
                        <h2 className={'col-md-12'}>Sign up</h2>

                        {/*Full Name */}
                        <div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.name)}`}>
                            <label htmlFor="name">Full Name <em style={{ color: 'red' }}>*</em></label>
                            <input type="text" value={this.state.name} className="form-control"
                                name="name" onChange={(event) => this.handleUserInput(event)} />
                        </div>

                        {/*Passsord*/}
                        <div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.password)}`}>
                            <label htmlFor="password">Password <em style={{ color: 'red' }}>*</em></label>
                            <input type="password" value={this.state.password} className="form-control"
                                name="password" onChange={(event) => this.handleUserInput(event)} />
                        </div>

                        {/*Confirm Passsord*/}
                        <div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.confirmPassword)}`}>
                            <label htmlFor="confirmPassword">Confirm Password <em style={{ color: 'red' }}>*</em></label>
                            <input type="password" value={this.state.confirmPassword} className="form-control"
                                name="confirmPassword" onChange={(event) => this.handleUserInput(event)} />
                        </div>



                        {/*Date of Birth */}
                        <div className='form-group col-md-6'>
                            <label htmlFor="dob">Date Of Birth:</label>
                            <DatePicker maxDate={this.maxDate} value={this.state.dob} onChange={this.handleChange} />
                        </div>


                        {/*Gender */}
                        <div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.gender)}`}>
                            <label htmlFor="gender">Gender <em style={{ color: 'red' }}>*</em></label>
                            {/*<input type="text" value={this.state.gender} className="form-control"
                                name="gender" onChange={(event) => this.handleUserInput(event)} />*/}
                            <select className="form-control">
                                <option value="I am ..">I am...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                        </div>

                        {/*Mobile Number */}
                        <div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.phone)}`}>
                            <label htmlFor="email">Phone Number <em style={{ color: 'red' }}>*</em></label>
                            <input type="number" value={this.state.phone} className="form-control"
                                name="phone" onChange={(event) => this.handleUserInput(event)} />
                        </div>

                        {/*Email */}
                        <div className={`form-group col-md-6 ${this.errorClass(this.state.formErrors.email)}`}>
                            <label htmlFor="email">Email address <em style={{ color: 'red' }}>*</em></label>
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
            </div>
        )
    }
}

const FormErrors = ({ formErrors }) =>
    <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <h6 key={i}>- {fieldName == 'confirmPassword' ? 'password' : fieldName} {formErrors[fieldName]}</h6>
                )
            } else {
                return '';
            }
        })}
    </div>

/*class FormErrors extends React.Component{
    render(){
        return(
            <div className='formErrors'>
            {Object.keys(formErrors).map((fieldName, i) => {
            if(formErrors[fieldName].length > 0){
                return (
                <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                )        
            } else {
                return '';
            }
            })}
        </div>
        )
    }
}*/

export default FormValidation;