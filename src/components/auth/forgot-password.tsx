import React from "react";
import { NavLink } from "react-router-dom";
import LandingPageText from "./components/landing-page-txt";
import backIcon from "../../assets/backIcon.svg";
import Button from "./components/button";

const RecoverPassword = () => {
    return (
        <div className="bg-black grid grid-cols-2 text-white">
            <LandingPageText />
            <div className="my-8 mr-8 bg-white  pt-[82px] px-16 flex flex-col rounded-lg">
                <div className="bg-arr w-fit h-fit rounded">
                    <NavLink to="/login">
                        <img 
                            src={backIcon}
                            alt="back button"
                            className="p-2.5" 
                        />
                    </NavLink>
                </div>
                <h1 className="pt-[34px] text-blaq font-extrabold text-4xl">Forgot Password</h1>
                <span className="text-sm text-blaq w-[439px] pt-2">Enter your email address linked to your accout below and we'll send you an OTP to reset your password.</span>
                <label className="text-form-black font-bold text-base pt-[35px]" id="email">Email Address</label>
                <input 
                    id="email" 
                    className="w-full p-6 rounded-lg text-black border mt-2.5 mb-8 focus:outline-none" 
                    type="email"
                    placeholder="example@gmail.com" />
                <NavLink to="/verify-email">
                    <Button buttonText="Reset password"/>
                </NavLink>
            </div>
        </div>
    );
}

export default RecoverPassword;