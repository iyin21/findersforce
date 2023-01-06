import { RingProgress } from "@mantine/core"

interface IHeadProps {
    step: number
    draftStatus: string
}

export const Header = ({ step, draftStatus }: IHeadProps) => {
    return (
        <div className="px-4 font-creato">
            {step === 2 ? (
                <div>
                    <h1 className="text-3xl font-bold">Shift Summary</h1>
                    <p className="text-black-60 text-lg font-normal">
                        Boost your depot’s efficiency by triple checking your
                        shift summary.
                    </p>
                </div>
            ) : (
                <div className="flex justify-between items-center">
                    {draftStatus === "draft" ? (
                        <div>
                            <h1 className="text-3xl font-bold">Drafts</h1>
                            <p className="text-black-60 text-2md font-normal">
                                Complete your shift requirements
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-3xl font-creatoMedium font-bold">
                                Post Shift
                            </h1>
                            <p className="text-black-60 text-2md font-normal">
                                Add shift critical information.
                            </p>
                        </div>
                    )}

                    <div>
                        <RingProgress
                            size={95}
                            label={
                                <div className="flex items-center justify-center  text-black-100">
                                    <span className="text-xl font-semibold">
                                        {" "}
                                        {step + 1}
                                    </span>{" "}
                                    <span className="text-black-20 text-2lg">
                                        /2
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
                </div>
            )}
        </div>
    )
}
