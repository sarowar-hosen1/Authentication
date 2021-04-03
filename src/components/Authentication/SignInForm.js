import React from 'react';
import { useForm } from 'react-hook-form';
import { Auth } from './Auth.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const SignInForm = ({ returnUser, passType, setPassType }) => {
    const auth = Auth()
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        if (returnUser) {
            if (data.name, data.email) {
                auth.signInWithEmailPassword(data.email, data.password);
            }
        }
    };

    return (
        <div>
            <h5 className="text-uppercase text-center text-white mb-3">SIGN IN FORM</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input name="email" type="email" className="form-control" ref={register({ required: true })} placeholder="Email" />
                    {errors.name && <span className="text-danger"><small>Email is required</small></span>}
                </div>
                <div className="form-group">
                    <input name="password" type={passType ? "text" : "password"} className="form-control" ref={register({ required: true, maxLength: 12, minLength: 8 })} placeholder="Password" />
                    <span onClick={() => setPassType(!passType)} className="icon">
                        {
                            passType ?
                                <FaEyeSlash />
                                :
                                <FaEye />
                        }
                    </span>
                    {errors.password && <span className="text-danger"><small>Password must be 8 to 12 character</small></span>}
                </div>
                <input type="submit" className="btn btn-outline-success w-100 mt-2" value="Sign In" />
            </form>
        </div>
    );
};

export default SignInForm;