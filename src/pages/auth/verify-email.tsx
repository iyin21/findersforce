import { NavLink, useLocation, useNavigate } from "react-router-dom"
import backIcon from "../../assets/backIcon.svg"
import LandingPageText from "../../components/Layout/landing-page-txt"
import OtpContainer from "../../components/OtpContainer/otp-container"
import logo from "../../assets/FF-logo.svg"
import videoBg from "../../assets/video/videoBg.mp4"
import { useEffect, useState } from "react"
import { resendOTP } from "../../hooks/auth-hooks/use-forgot-password"

const VerifyEmailAddress = () => {
    const [enable, setEnable] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const handleVerifyEmail = (values: any) => {
        const otp = Object.values(values).join("")
        navigate("/reset-password", { state: { otp: otp } })
    }

    let interval: any
    useEffect(() => {
        const textArea = document.querySelector("#countDown")
        startTimer(300, textArea)
    }, [])

    function startTimer(duration: number, display: Element | null) {
        let timer = duration
        let minutes
        let seconds
        if (!interval) {
            interval = setInterval(function () {
                minutes = parseInt(String(timer / 60), 10)
                seconds = parseInt(String(timer % 60), 10)

                minutes = minutes < 10 ? "0" + minutes : minutes
                seconds = seconds < 10 ? "0" + seconds : seconds

                display !== null
                    ? (display.textContent = minutes + ":" + seconds)
                    : null

                if (--timer < 0) {
                    timer = 0
                    setEnable(true)
                }
            }, 1000)
        }
    }

    return (
        <>
            <video
                autoPlay
                loop
                muted
                id="video"
                className="hidden md:block h-screen w-full object-cover fixed"
                src={videoBg}
            ></video>
            <div className="grid grid-cols-1 lg:grid-cols-2 text-white font-creato lg:bg-black-60 lg:absolute lg:top-0">
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
                        Email Verification
                    </h1>
                    <span className="text-blaq-0 max-w-[560px] w-fit pt-2 text-[14px] md:text-base">
                        Enter the 6-digit OTP we sent to{" "}
                        <b>{location.state?.email || "you"}</b> to proceed with
                        your password reset process.
                    </span>
                    <h2 className="text-base text-black-100 font-bold pb-4  pt-12">
                        Enter OTP
                    </h2>
                    <OtpContainer handleSubmit={handleVerifyEmail} />
                    <div className="pt-[32px] pb-[37px] text-[14px] md:text-center">
                        <span>Didn???t get an email? Check your Junk or... </span>
                    </div>
                    <div className="flex justify-center text-[14px]">
                        <button
                            className={`${!enable ? "text-black-10" : "text-yellow-100"}`}
                            onClick={() => resendOTP(location.state.email || "")}
                            disabled={!enable}
                        >
                            <span className="underline">Resend OTP</span>
                        </button>

                        <div id="countDown" className="pl-4">05:00</div>
                    </div>
                    <NavLink
                        to="/recover-password"
                        className="pt-8 self-center"
                    >
                        <span className="underline text-center text-base text-green-90 font-medium cursor-pointer">
                            Try a different Email Address
                        </span>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default VerifyEmailAddress
