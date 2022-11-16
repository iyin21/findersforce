import { useMediaQuery } from "@mantine/hooks"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import backIcon from "../../assets/backIcon.svg"
import LandingPageText from "../../components/Layout/landing-page-txt"
import OtpContainer from "../../components/OtpContainer/otp-container"
import logo from "../../assets/FF-logo.svg"

const VerifyEmailAddress = () => {
    const matches = useMediaQuery("(min-width: 900px)")
    const navigate = useNavigate()
    const location = useLocation()
    const handleVerifyEmail = (values: any) => {
        const otp = Object.values(values).join("")
        navigate("/reset-password", { state: { otp: otp } })
    }
    return (
        <>
            {matches ? (
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
                            <b>{location.state?.email}</b> to proceed with your
                            password reset process.
                        </span>
                        <div className="text-blaq-0 pt-[18px] pb-[37px]">
                            <span className="text-base">
                                Didn`t get an email?{" "}
                            </span>
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
            ) : (
                <div className="flex flex-col items-center mx-5">
                    <img
                        src={logo}
                        alt="finders force logo"
                        className="pt-[17px]"
                    />
                    <h1 className="pt-5 text-black-100 font-extrabold text-2xl self-start">
                        Verify Email Address
                    </h1>
                    <span className="text-2md text-blaq-0 pt-2 pb-5 text-start">
                        Enter the 6-digit OTP we sent to{" "}
                        <b>{location.state?.email}</b> to proceed with your
                        password reset process.
                    </span>
                    <h2 className="text-2md text-black-100 font-bold pb-4 self-start">
                        Enter OTP
                    </h2>
                    <OtpContainer
                        handleSubmit={handleVerifyEmail}
                        defaultStyle={true}
                    />
                    <span className="underline text-center text-base text-green-90 pt-8 font-medium cursor-pointer">
                        Not my email
                    </span>
                </div>
            )}
        </>
    )
}

export default VerifyEmailAddress
