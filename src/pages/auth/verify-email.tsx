import { NavLink, useLocation, useNavigate } from "react-router-dom"
import backIcon from "../../assets/backIcon.svg"
import LandingPageText from "../../components/Layout/landing-page-txt"
import OtpContainer from "../../components/OtpContainer/otp-container"

const VerifyEmailAddress = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleVerifyEmail = (values: any) => {
        const otp = Object.values(values).join("")
        navigate("/reset-password", { state: { otp: otp } })
    }
    return (
        <div className="bg-black-100 grid grid-cols-2 text-white">
            <LandingPageText />
            <div className="my-8 mr-8 bg-white-100 pt-[82px] px-16 flex flex-col rounded-[10px]">
                <div className="bg-black-10 w-fit h-fit rounded">
                    <NavLink to="/recover-password">
                        <img
                            src={backIcon}
                            alt="back button"
                            className="p-2.5"
                        />
                    </NavLink>
                </div>
                <h1 className="pt-[34px] text-blaq-0 font-extrabold text-3.5xl">
                    Verify Email Address
                </h1>
                <span className="text-base text-blaq-0 max-w-[560px] w-fit pt-2">
                    Enter the 6-digit OTP we sent to{" "}
                    <b>{location.state?.email}</b> to proceed with your password
                    reset process.
                </span>
                <div className="text-blaq-0 pt-[18px] pb-[37px]">
                    <span className="text-base">Didn`t get an email? </span>
                    <a href="/#" className="text-yellow-100 underline">
                        Resend OTP
                    </a>
                </div>
                <h2 className="text-base text-black-100 font-bold pb-4">
                    Enter OTP
                </h2>
                <OtpContainer handleSubmit={handleVerifyEmail} />
                <span className="underline text-center text-base text-green-90 pt-8 font-medium cursor-pointer">
                    Not my email
                </span>
            </div>
        </div>
    )
}

export default VerifyEmailAddress
