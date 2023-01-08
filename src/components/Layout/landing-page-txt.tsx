/* eslint-disable new-cap */
import logo from "../../assets/logo.svg"
import profileImg from "../../assets/profile.png"
import crhm from "../../assets/crhm.svg"
import quoteIcon from "../../assets/quote.svg"
import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel } from "@mantine/carousel"
import { useNavigate } from "react-router-dom"

const LandingPageText = () => {
    const autoplay = useRef(Autoplay({ delay: 2000 }))
    const navigate = useNavigate()
    return (
        <section className="mt-[80px] ml-[93px] mr-[91px] mb-[78px] text-white-100 font-creato">
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="finders force logo"
                    className="cursor-pointer"
                    onClick={() => navigate("/login")}
                />
                <div className="flex flex-row items-center ml-3 rounded-[30px] bg-white-20 w-fit p-2.5 h-fit">
                    <span className="text-sm">
                        Uniting Humanity’s Workforce.
                    </span>
                </div>
            </div>
            <h1 className="leading-[58px] pt-12 text-4xl font-bold font-creato">
                <span className="text-yellow-100">10x Depot Performance </span>
                With Exclusive Access To Top-Rated &
                Vetted{" "}
                <span className="text-yellow-100">Operatives Nationwide. </span>
            </h1>
            <h2 className="pt-4 leading-loose pr-12 text-white-90">
                No more phone calls, no more waiting, no more emails. Save your
                time & money whilst winning new contracts with power, efficiency
                & control at your finger tips.
            </h2>
            <Carousel
                sx={{ maxWidth: 580 }}
                mx="auto"
                withIndicators
                withControls={false}
                height={414}
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
                styles={{
                    indicator: {
                        width: 12,
                        height: 4,
                        transition: "width 250ms ease",

                        "&[data-active]": {
                            width: 40,
                        },
                    },
                }}
            >
                <Carousel.Slide>
                    <div className="relative mr-[30px] px-6 py-7 rounded-[10px] bg-white-15 mt-[63px] border-1 border-white-20">
                        <h2 className="leading-loose text-justify opacity-80">
                            The agency industry has been on a slippery slope for
                            decades. Finders Force is exactly what we have been
                            crying out for. Access to high-quality agency
                            operatives in seconds, what more could a depot want?
                        </h2>
                        <div className="flex flex-row items-center mt-12">
                            <img
                                src={profileImg}
                                alt="profile img"
                                className="rounded-full"
                            ></img>
                            <div className="pl-2">
                                <h1 className="font-bold text-base m-0">
                                    Jordan Belonwu
                                </h1>
                                <h2 className="text-md opacity-80">
                                    CEO, Revive Traffic
                                </h2>
                            </div>
                        </div>
                        <img
                            src={quoteIcon}
                            className="absolute top-[-6px] left-[2px]"
                            alt="quotation"
                        ></img>
                    </div>
                </Carousel.Slide>
                <Carousel.Slide>
                    <div className="relative mr-[30px] px-6 py-7 rounded-[10px] bg-white-15 mt-[63px] border-1 border-white-20">
                        <h2 className="leading-loose text-justify opacity-80">
                            Finders Force makes our old processes look like we
                            are from the stone age. They have 10x’ed our
                            productivity by enhancing what we do from multiple
                            angles. Finally, managers can be full-time managers
                            rather than part-time recruiters.
                        </h2>
                        <div className="flex flex-row items-center mt-4">
                            <img
                                src={crhm}
                                alt="profile img"
                                className="rounded-full"
                            ></img>
                            <div className="pl-2">
                                <h1 className="font-bold text-base m-0">
                                    Sara Giovani
                                </h1>
                                <h2 className="text-md opacity-80">
                                    CHRM, Bridge-Water Traffic
                                </h2>
                            </div>
                        </div>
                        <img
                            src={quoteIcon}
                            className="absolute top-[-6px] left-[2px]"
                            alt="quotation"
                        ></img>
                    </div>
                </Carousel.Slide>
            </Carousel>
        </section>
    )
}

export default LandingPageText
