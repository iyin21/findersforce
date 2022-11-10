import { RingProgress } from "@mantine/core"

interface IHeadProps {
    step: number
}

export const Header = ({ step }: IHeadProps) => {
    return (
        <div className="px-4 flex justify-between">
            <div>
                <h4 className="text-3xl font-bold">Support</h4>
                <p className="text-black-60 text-2md font-normal">
                    Send a formal complaint
                </p>
            </div>

            <div>
                <RingProgress
                    size={95}
                    label={
                        <div className="flex items-center justify-center  text-black-100">
                            <span className="text-xl font-semibold">
                                {" "}
                                {step}
                            </span>{" "}
                            <span className="text-black-20 text-2lg">/2</span>
                        </div>
                    }
                    sections={[
                        {
                            value:
                                step  === 1 ? 50 : step + 1 === 2 ? 95 : 100,
                            color: "#FED70A",
                        },
                    ]}
                />
            </div>
        </div>
    )
}
