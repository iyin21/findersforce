import React from "react";
import { NavLink } from "react-router-dom";
import showIcon from "../../assets/show.svg";
import Button from "./components/button";
import LandingPageText from "./components/landing-page-txt";


const Login = () => {
    return (
        <div className="grid grid-cols-2 text-white h-fit bg-black">
            <LandingPageText />
            <section className="my-8 mr-8 bg-white pt-12 px-16 flex flex-col rounded-lg">
                <h1 className="text-blaq font-extrabold text-4xl pb-2.5">Log In</h1>
                <div>
                    <span className="text-light-black text-lg font-normal">Don't have an account? </span>
                    <a href="" className="text-lg text-state-green font-normal">Request access</a>
                </div>
                <form className="pt-14">
                    <label className="text-form-black font-bold text-base" htmlFor="email">Email Address</label>
                    <input 
                        id="email" 
                        className="w-full p-6 rounded-lg text-black border mt-2.5 mb-6 focus:outline-none" 
                        type="email"
                        placeholder="example@gmail.com" />
                    <label className="text-form-black font-bold text-base" htmlFor="password">Password</label>
                    <div className="w-full rounded-lg border mt-2.5 mb-8 pr-6 flex justify-between items-center focus:border-none">
                        <input 
                            id="password" 
                            className="text-black p-6 w-full focus:outline-none" 
                            type="text"
                            placeholder="password" />
                        <img src={showIcon} alt="show password"></img>
                    </div>
                    <Button buttonText="Enter finders force"/>
                </form>
                <div className="text-end mt-14 pb-32">
                    <span className="text-base font-normal text-fg-black">Forgot password?</span>
                    <NavLink to="/recover-password" className="text-fg-black font-semibold pl-1.5">
                        Recover
                    </NavLink>
                    <div className="flex flex-row-reverse">
                        <hr className="w-[61px] border-t-2 border-orange"/>
                    </div>
                    
                </div>
                
            </section>
        </div>
    );
}

export default Login;