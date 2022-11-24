import { RingProgress } from "@mantine/core"
import logo from "../../../assets/FF-logo.svg"

interface IHeadProps {
    step: number
}

const Header = ({ step }: IHeadProps) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <div className="block lg:hidden">
                    <img src={logo} alt="finders force" className="mb-5" />
                </div>
                <h1 className="text-black-90 text-2xl md:text-3xl font-extrabold">
                    Set up your Profile
                </h1>
                <span className="text-black-90 opacity-70 pt-2 text-md lg:text-lg">
                    Please provide the following information
                </span>
            </div>
            <RingProgress
                size={95}
                label={
                    <div className="flex items-center justify-center  text-black-100">
                        <span className="text-xl font-semibold">
                            {" "}
                            {step + 1}
                        </span>{" "}
                        <span className="text-black-20 text-2lg">/3</span>
                    </div>
                }
                sections={[
                    {
                        value: step + 1 === 1 ? 50 : step + 1 === 2 ? 95 : 100,
                        color: "#FED70A",
                    },
                ]}
            />
        </div>
    )
}

export default Header
