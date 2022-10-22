import React from "react";
import { NavLink } from "react-router-dom";
import LandingPageText from "./components/landing-page-txt";
import backIcon from "../../assets/backIcon.svg";
import showIcon from "../../assets/show.svg";
import Button from "./components/button";
import successIcon from "../../assets/success.svg";

const ResetPassword = () => {
    const [passwordChanged, setPasswordChanged] = React.useState(false);

    return (
        <div className="bg-black grid grid-cols-2 text-white">
            <LandingPageText />
            <div className="my-8 mr-8 bg-white  pt-[90px] px-16 flex flex-col rounded-lg">
                {!passwordChanged ? 
                    (
                        <>
                            <div className="bg-arr w-fit h-fit rounded">
                                <NavLink to="/verify-email">
                                    <img 
                                        src={backIcon}
                                        alt="back button"
                                        className="p-2.5" 
                                    />
                                </NavLink>
                            </div>
                            <h1 className="font-extrabold text-blaq text-4xl pt-4">Reset Password</h1>
                            <span className="text-base pt-2.5 text-blac">Your new password must be different from the old one.</span>
                    
                            <form className="pt-8">
                                <label className="font-bold text-base text-blaq" id="password">Enter new password</label>
                                <div className="w-full rounded-lg border mt-2.5 mb-6 pr-6 flex justify-between items-center focus:border-none">
                                    <input 
                                        id="password" 
                                        className="text-black p-6 w-full focus:outline-none" 
                                        type="text"
                                        placeholder="new password" />
                                    <img src={showIcon} alt="show password"></img>
                                </div>
                                <label className="font-bold text-base text-blaq" id="password">Confirm password</label>
                                <div className="w-full rounded-lg border mt-2.5 mb-8 pr-6 flex justify-between items-center focus:border-none">
                                    <input 
                                        id="password" 
                                        className="text-black p-6 w-full focus:outline-none" 
                                        type="text"
                                        placeholder="new password" />
                                    <img src={showIcon} alt="show password"></img>
                                </div>
                                <div onClick={e => {
                                        e.preventDefault();
                                        setPasswordChanged(!passwordChanged)
                                    }}>
                                    <Button buttonText="Reset password"/>
                                </div>
                            </form>
                        </>
                    ) : 
                    (
                        <>
                            <h1 className="pt-[60px] text-4xl font-extrabold text-blaq">Password changed</h1>
                            <span className="pt-2 text-pas text-base">Your password has been changed successfully</span>
                            <figure className="self-center mt-8">
                                <img src={successIcon} alt="password successfully changed" />
                            </figure>
                            <NavLink to="/login">
                                <Button buttonText="Back to login"/>
                            </NavLink>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default ResetPassword;