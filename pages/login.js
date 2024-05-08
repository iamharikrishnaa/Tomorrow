import React from 'react';
import Navbar from '../components/Layout/Navbar';
import LoginForm from '../components/Auth/LoginForm';

const Auth = () => {
    return (
        <>
            <Navbar /> 

            <div className="profile-authentication-area ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-12"></div>
                        <div className="col-lg-6 col-md-12">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth;