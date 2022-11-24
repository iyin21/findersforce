import { NavLink, useLocation, useNavigate } from "react-router-dom"
import backIcon from "../../assets/backIcon.svg"
import LandingPageText from "../../components/Layout/landing-page-txt"
import OtpContainer from "../../components/OtpContainer/otp-container"
import logo from "../../assets/FF-logo.svg"

const VerifyEmailAddress = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleVerifyEmail = (values: any) => {
        const otp = Object.values(values).join("")
        navigate("/reset-password", { state: { otp: otp } })
    }
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 text-white lg:bg-black-1">
                <div className="hidden lg:block">
                    <LandingPageText />
                </div>
                <div className="my-8 md:mr-8 bg-white-100 md:pt-12 px-6 md:px-16 flex flex-col rounded-[10px]">
                    <div className="hidden lg:block bg-black-10 w-fit h-fit rounded mb-8">
                        <NavLink to="/recover-password">
                            <img
                                src={backIcon}
                                alt="back button"
                                className="p-2.5"
                            />
                        </NavLink>
                    </div>
                    <div className="block m-auto lg:hidden">
                        <img
                            src={logo}
                            alt="finders force logo"
                            className="pb-4"
                        />
                    </div>
                    <h1 className="text-blaq-0 font-extrabold text-2xl md:text-4xl md:pb-2.5">
                        Verify Email Address
                    </h1>
                    <span className="text-blaq-0 max-w-[560px] w-fit pt-2 text-[14px] md:text-base">
                        Enter the 6-digit OTP we sent to{" "}
                        <b>{location.state?.email}</b> to proceed with your
                        password reset process.
                    </span>
                    <div className="text-blaq-0 pt-[18px] pb-[37px] text-[14px] md:text-base">
                        <span>Didn`t get an email? </span>
                        <NavLink to="/recover-password">
                            <span className="text-yellow-100 underline">
                                Resend OTP
                            </span>
                        </NavLink>
                    </div>
                    <h2 className="text-base text-black-100 font-bold pb-4">
                        Enter OTP
                    </h2>
                    <OtpContainer handleSubmit={handleVerifyEmail} />
                    <NavLink
                        to="/recover-password"
                        className="pt-8 self-center"
                    >
                        <span className="underline text-center text-base text-green-90 font-medium cursor-pointer">
                            Not my email
                        </span>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default VerifyEmailAddress
