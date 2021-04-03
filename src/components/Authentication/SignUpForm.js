import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import { Auth } from './Auth';
import './Login.css';

const SignUpForm = ({returnUser, passType, setPassType}) => {
    const auth = Auth();
    const { register, handleSubmit, watch, errors } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = data => {
        if (!returnUser) {
            if (data.name, data.email, data.password) {
                auth.createUser(data.name, data.email, data.password)
            }
        }
    };

    return (
        <>
            <h5 className='text-center text-white mb-4'>SIGN UP FORM</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input name="name" type="text" className="form-control" ref={register({ required: true })} placeholder="Name" />
                    {errors.name && <span className="text-danger ml-2"><small>Name is required</small></span>}
                </div>
                <div className="form-group">
                    <input name="email" type="email" className="form-control" ref={register({ required: true })} placeholder="Email" />
                    {errors.email && <span className="text-danger ml-2"><small>Email is required</small></span>}
                </div>
                <div className="form-group">
                    <input name="password" type={passType ? "text" : "password"} className="form-control" ref={register({ required: true })} placeholder="Password" />
                    {errors.password && <span className="text-danger ml-2"><small>Password is required</small></span>}
                </div>
                <div className="form-group">
                    <input name="confim_password" type={passType ? "text" : "password"} className="form-control"
                        ref={register({
                            validate: value => 
                            value === password.current || "The Password don't match"
                        })} placeholder="Confirm Password" />
                        <span onClick={() => setPassType(!passType)} className="icon">
                            {
                                passType ? 
                                <FaEyeSlash />
                                :
                                <FaEye />
                            }
                        </span>
                    {errors.confim_password && <span className="text-danger ml-2"><small>Password don't match</small></span>}
                </div>
                <input type="submit" className="btn btn-success w-100 mt-3" value="SIGN UP" />
            </form>
        </>
    );
};

export default SignUpForm;