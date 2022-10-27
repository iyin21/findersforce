import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import backIcon from "../../assets/backIcon.svg";
import LandingPageText from "../../components/landing-page-txt";
import OtpContainer from "../../components/otp-container";

const VerifyEmailAddress = () => {
    let navigate = useNavigate();
    const handleVerifyEmail = (values: any) => {
        const otp = Object.values(values).join("");
        navigate('/reset-password')
    }
    return (
        <div className="bg-black grid grid-cols-2 text-white">
            <LandingPageText />
            <div className="my-8 mr-8 bg-white  pt-[82px] px-16 flex flex-col rounded-lg">
                <div className="bg-arr w-fit h-fit rounded">
                    <NavLink to="/recover-password">
                        <img 
                            src={backIcon}
                            alt="back button"
                            className="p-2.5" 
                        />
                    </NavLink>
                </div>
                <h1 className="pt-[34px] text-blaq font-extrabold text-4xl">Verify Email Address</h1>
                <span className="text-base text-blaq w-fit pt-2">Enter the 6-digit OTP we sent to alisoneyo@email.com to proceed with your password reset process.</span>
                <div className="text-blaq pt-[18px] pb-[37px]">
                    <span className="text-base">Didn't get an email? </span>
                    <a href="" className="text-orange underline">Resend OTP</a>
                </div>
                <h2 className="text-base text-blaq font-bold pb-4">Enter OTP</h2>
                <OtpContainer handleSubmit={handleVerifyEmail} />
                <span className="underline text-center text-base text-light-green pt-8 font-medium cursor-pointer">Not my email</span>
            </div>
        </div>
    );
}

export default VerifyEmailAddress;