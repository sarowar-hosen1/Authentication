import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Auth } from './Auth';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Login = () => {
    const auth = Auth();
    const [returnUser, setReturnUser] = useState(true)
    const [passType, setPassType] = useState(false)
    const user = useSelector(state => state.user);
    console.log(user);
    return (
        <div className="login">
            <div className="login-inner">
                {
                    returnUser ?
                        <SignInForm returnUser={returnUser} passType={passType} setPassType={setPassType} ></SignInForm>
                        :
                        <SignUpForm returnUser={returnUser} passType={passType} setPassType={setPassType} ></SignUpForm>
                }
                <div className="d-flex justify-content-between mt-3">
                    {returnUser && <button className="btn btn-link">Forgate password</button>}
                    {!returnUser && <button className="btn btn-link">Do you have an account?</button>}
                    <button onClick={() => setReturnUser(!returnUser)} className="btn btn-link">{returnUser ? "SIGN UP" : "SIGNIN"}</button>
                </div>
                {auth.error && <p className="text-danger text-center"><small>{auth.error}</small></p>}
                <button onClick={() => auth.signInWithGoogle()} className="btn btn-success">GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;