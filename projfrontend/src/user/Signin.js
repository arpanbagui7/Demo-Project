import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import Base from '../core/Base';
import {signin, isAuthenticated, authenticate} from '../auth/helper/index'

const Signin = () => {
    const [values, setValues] = useState({
        'email' : '',
        'password' : '',
        'error' : '',
        'loading' : false,
        'sessionExist' : false,
    })
    const {email, password, error, loading, sessionExist} = values

    const handleChange = name => event => {
        setValues({...values, error : false, [name] : event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault()
        signin({email, password})
        .then(data => {
            console.log(data)
            if(data.token){
                authenticate(data, () => {
                    setValues({...values, 'sessionExist' : false})
                    console.log('Token Added Successfully')
                })
            }
            else if(data.message){
                setValues({...values, 'sessionExist' : true})
            }
            else{
                setValues({...values, 'error' : true})
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

    const loadingMessage = () => {
        return loading && (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-info">
                        Loading...
                     </div>
                </div>
            </div>
        )
    }

    const sessionExistanceMsg = () => {
        return sessionExist && (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-warning">
                        Previous Session Exist! Please Try Again.
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
            {sessionExistanceMsg()}
            {errorMessage()}
            {signinForm()}
            <p className = 'text-light text-center'>{JSON.stringify(values)}</p>
            {performRedirect()}
        </Base>
     );
}
 
export default Signin;