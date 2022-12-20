import { RingProgress } from "@mantine/core"
import { Button } from "../../../../../../components"
import logo from "../../../../../../assets/FF-logo.svg"

interface IHeadProps {
    step: number
    title: string
    handleMultipleRates?: (e: any) => void
}

const Header = ({ step, title, handleMultipleRates }: IHeadProps) => {
    return (
        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4">
            <div>
                <div className="block lg:hidden">
                    <img src={logo} alt="finders force" className="mb-5" />
                </div>
                <h1 className="text-black-90 text-2xl md:text-3xl font-extrabold font-creatoBold">
                    {title}
                </h1>
                <span className="text-black-90 opacity-70 pt-2 text-md lg:text-lg font-creato">
                    Please provide the following information
                </span>
            </div>
            {step === 2 ? (
                <Button
                    variant="primary"
                    type="submit"
                    className="w-full lg:w-[25%] mt-4 lg:mt-0"
                    style={{
                        backgroundColor: "rgba(254, 215, 10, 1)",
                    }}
                    onClick={handleMultipleRates}
                >
                    Set up account
                </Button>
            ) : (
                <div className="flex items-center">
                    {step === 0 ? (
                        <span className="font-creato text-lg hidden md:block">
                            Add a depot
                        </span>
                    ) : (
                        <span className="font-creato text-lg hidden md:block">
                            Set wage
                        </span>
                    )}
                    <RingProgress
                        size={95}
                        label={
                            <div className="flex items-center justify-center  text-black-100">
                                <span className="text-xl font-semibold">
                                    {" "}
                                    {step + 1}
                                </span>{" "}
                                <span className="text-black-20 text-2lg">
                                    /3
                                </span>
                            </div>
                        }
                        sections={[
                            {
                                value:
                                    step + 1 === 1
                                        ? 50
                                        : step + 1 === 2
                                        ? 95
                                        : 100,
                                color: "#FED70A",
                            },
                        ]}
                    />
                </div>
            )}
        </div>
    )
}

export default Header
