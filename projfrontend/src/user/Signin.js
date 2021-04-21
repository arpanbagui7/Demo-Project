import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom'
import Base from '../core/Base';
import {signin, isAuthenticated, authenticate} from '../auth/helper/index'

const Signin = () => {
    const [values, setValues] = useState({
        'email' : 'one@gmail.com',
        'password' : '12345',
        'error' : '',
        'success' : false,
        'loading' : false,
        'didRedirect' : false
    })
    const {email, password, error, success, loading, didRedirect} = values

    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault()
        signin({email, password})
        .then(data => {
            if(data.token){
                let sessionToken = data.token
                authenticate(sessionToken, () => {
                    setValues({...values, didRedirect : true})
                    console.log('Token Added Successfully')
                })
            }
        })
        .catch(error => console.log(error))
    }

    const performRedirect = () => {
        if(isAuthenticated()){
            return (
                <Redirect to = '/' />
            )
        }
    }

    const loadingMessage = () => {
        return loadingMessage && (
            <div className="alert alert-info">
                <h2>Loading ...</h2>
            </div>
        )
    }

    const signinForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left text-light">
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input type="text" value = {email} onChange = {handleChange('email')} className="form-control"/>
                    </div>
                    <div className = 'form-group'>
                        <label className="text-light">Password</label>
                        <input type="password" value = {password} onChange = {handleChange('password')} className="form-control"/>
                    </div>
                    <button className="btn btn-xs btn-success btn-block" onClick = {onSubmit}>Sign In</button>
                </div>
            </div>
        ) 
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success">

                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style = {{display: error ? '' : 'none'}}>
                        Login Failed!! Please Try Again.
                    </div>
                </div>
            </div>
        )
    }

    return ( 
        <Base title = "Sign In" description = 'Welcome to Sign In Page'>
            {loadingMessage()}
            {errorMessage()}
            {signinForm()}
            {performRedirect()}
            <p className = 'text-light text-center'>{JSON.stringify(values)}</p>
        </Base>
     );
}
 
export default Signin;