import React, { Fragment, useState, useEffect } from 'react'
import { loginNow, isAuthenticate, authenticate, signOut } from '../auth/auth';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify'
const Login = () => {
const [val,setVal] = useState({
    email:"",
    password:"",
    loading:false,
    error:"",
    success:""
})

const {email,password,error,loading,success} = val
const onSubmit= (e) => {
e.preventDefault()
loginNow(val)
    .then((data)=>{
        if(data.error){
             return setVal({...val,email:"",password:"",error:data.error})
        }
        authenticate(data, ()=>{
            return setVal({...val,email:"",password:"",success:"Success! You have been logged in."})
        })
       
    })
}



const successMsg = ()=> {
    if(success){
        toast.success(success,{toastId:"success"})
        return <Redirect to="/" />
    }
}

const redirectNow = () => {
    return <Redirect to="/" />
}

const errorMsg = () => {
    if(error){
        toast.error(error,{toastId:"error"})
    }
}

    return(
        <Fragment>
            {isAuthenticate() ? (redirectNow()): ("") }

            {successMsg()}
            {errorMsg()}
            <div  id="login" className="login-form mt-1">
            <div className="section">
                <img src="/theme/assets/img/sample/photo/vector4.png" alt="image" className="form-image" />
            </div>
            <div className="section mt-1">
                <h1 style={{color:"#29b8c1"}}>PANCHANGAM</h1>
                <h4>Fill the form to log in</h4>
            </div>
            <div className="section mt-1 mb-5">
                <form onSubmit={onSubmit}>
                    <div className="form-group boxed">
                        <div className="input-wrapper">
                            <input type="email" className="form-control" id="email1" placeholder="Email address" 
                            
                            value={email}
                            onChange={e=>setVal({...val,email:e.target.value})}
                            />
                            <i className="clear-input">
                                <ion-icon name="close-circle"></ion-icon>
                            </i>
                        </div>
                    </div>

                    <div className="form-group boxed">
                        <div className="input-wrapper">
                            <input type="password" className="form-control" id="password1" placeholder="Password" 
                            name="password"
                            value={password}
                            onChange={e=>setVal({...val,password:e.target.value})}
                            />
                            <i className="clear-input">
                                <ion-icon name="close-circle"></ion-icon>
                            </i>
                        </div>
                    </div>


                    <div className="form-button-group">
                        <button type="submit" className="btn btn-primary btn-block btn-lg">Log in</button>
                    </div>

                </form>
                
            </div>
        </div>
        </Fragment>
    )
}
export default Login