import React from "react";
import logo from "../../../assets/logo.svg";
import profileImg from "../../../assets/profile.png";
import quoteIcon from "../../../assets/quote.svg";


const LandingPageText = () => {
    return (
        <section className="pt-[80px] pl-[93px] pr-[91px] pb-[78px]">
                <div className="flex items-center">
                    <img src={logo} alt="finders force logo" />
                    <div className="flex flex-row items-center ml-3 rounded-3lg bg-grey w-fit p-2.5 h-fit">
                        <span className="text-sm">We're hiring!</span>
                        <span role="img" aria-label="celebration" className="pl-0.5">🎉 </span>
                    </div>
                </div>
                <h1 className="leading-extra-loose pt-12 text-5xl font-bold">Access to endless pool of talent in the traffic management industry</h1>
                <h2 className="pt-4 leading-loose pr-12">join the #1 startup community specialized in onsite and Depot first traffic management talents.</h2>
                <div className="relative mr-[30px] px-6 py-7 rounded-lg bg-grey mt-[63px] border-1 border-[rgba(255, 255, 255, 0.2)]">
                    <h2 className="leading-loose text-justify opacity-80">Finders Force understood my expectations in a company and got me the perfect match, 
                        Bamboo.
                    </h2>
                    <h2 className="leading-loose text-justify pt-1 opacity-80">I’m glad to be part of the founding team at Bamboo and excited at the 
                        prospect of building a unicorn.
                    </h2>
                    <div className="flex flex-row items-center mt-4">
                        <img src={profileImg} alt="profile img" className="rounded-haf"></img>
                        <div className="pl-2">
                            <h1 className="font-bold text-base m-0">Jordan Belonwu</h1>
                            <h2 className="text-smm opacity-80">Brand Designer, Bamboo</h2>
                        </div>
                    </div>
                    <img src={quoteIcon} className="absolute top-[-6px] left-[2px]" alt="quotation"></img>
                </div>
                
        </section>
    );
}

export default LandingPageText;