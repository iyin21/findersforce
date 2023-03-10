import { RingProgress } from "@mantine/core"
import logo from "../../assets/FF-logo.svg"

interface IHeadProps {
    step: number
    title: string
    description?: string
    totalStep?: number
}

const Header = ({ step, title, description, totalStep = 3 }: IHeadProps) => {
    return (
        <div className="flex justify-between items-center mb-4 font-creato">
            <div>
                <div className="block lg:hidden">
                    <img src={logo} alt="finders force" className="mb-5" />
                </div>
                <h1 className="text-black-90 text-2xl md:text-3xl font-extrabold">
                    {title}
                </h1>
                <span className="text-black-90 opacity-70 pt-2 text-md lg:text-lg">
                    {description ||
                        "Your account has been created, please complete your profile."}
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
                        <span className="text-black-20 text-2lg">/{totalStep}</span>
                    </div>
                }
                sections={[
                    {
                        value: step + 1 === 1 ? 50 : step + 1 === 2 ? 75 : 100,
                        color: "#FED70A",
                    },
                ]}
            />
        </div>
    )
}

export default Header
