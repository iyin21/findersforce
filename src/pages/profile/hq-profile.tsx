import LandingPageText from "../../components/Layout/landing-page-txt"

const HQProfile = () => {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 text-white h-fit lg:bg-[black]">
                <div className="hidden lg:block">
                    {" "}
                    <LandingPageText />
                </div>
            </div>
        </div>
    )
}

export default HQProfile
