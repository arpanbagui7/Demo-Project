import React, {useState} from 'react'
import Base from '../core/Base';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {signup} from '../auth/helper/index'
import {Link} from 'react-router-dom'

const moment = require('moment');


const Signup = () => {
    const [values, setValues] = useState({
        'name' : '',
        'email' : '',
        'password' : '',
        'dateOfBirth' : moment(new Date()).format('YYYY-MM-DD'),
        'phone' : '',
        'error' : '',
        'success' : false
    })
    const {name, email, password, dateOfBirth, phone, error, success} = values

    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value})
    }

    const handleClick = (event) => {
        event.preventDefault()
        setValues({...values, error : false})
        debugger
        signup({name, email, password, dateOfBirth, phone})
        .then(response => {
            console.log('Data ', response);
            //debugger
            if(response.email.includes('@')) {
                setValues({
                    ...values,
                    'name' : '',
                    'email' : '',
                    'password' : '',
                    'dateOfBirth' : moment(new Date()).format('YYYY-MM-DD'),
                    'phone' : '',
                    'error' : '',
                    'success' : true
                })
            }
            else {
                setValues({
                    ...values,
                    'error' : true,
                    'success' : false
                })
            }

        })
        .catch(error => console.log(error))
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style = {{display : success ? '' : 'none'}}>
                        Account Created Successfully!! Please <Link to = '/signin'>Login</Link> Now.
                    </div>
                </div>
            </div>
        )    
    }

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style = {{display : error ? '' : 'none'}}>
                        Signup Failed!! Try Again.
                    </div>
                </div>
            </div>
        )
       
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" value = {name} onChange = {handleChange('name')} className="form-control"/>
                        </div>
                       <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="text" value = {email} onChange = {handleChange('email')} className="form-control"/>
                       </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" value = {password} onChange = {handleChange('password')} className="form-control"/>
                        </div>
                        <div className="row form-group">
                            <div className="col-md-6">
                                <label className="text-light">Phone</label>
                                <input type="number" value = {phone} onChange = {handleChange('phone')} className="form-control"/>
                            </div>
                            <div className="col-md-6">
                                <label className="text-light">Date of Birth</label>
                                <DatePicker selected= {new Date(dateOfBirth)} onChange = {date => setValues({...values, error : false, dateOfBirth : moment(date).format('YYYY-MM-DD')})}  dateFormat = "yyyy-MM-dd"/>
                            </div>
                        </div>
                        <button className="btn btn-success btn-sm btn-block" onClick = {handleClick}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title = 'Sign Up Page' description = 'Welcome to Sign Up Page'>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
        </Base>
    );
}
 
export default Signup;