import { Tooltip } from "@mantine/core"
import { ReactNode } from "react"
import { BsInfoCircleFill } from "react-icons/bs"

export interface ToolTipProps {
    title: string
    description: ReactNode
}

const ToolTip = ({ title, description }: ToolTipProps) => {
    return (
        <div>
            <Tooltip
                multiline
                label={
                    <div className="font-creato">
                        <h6 className="flex items-center gap-2">
                            {title} <BsInfoCircleFill />
                        </h6>
                        <p className="font-normal text-white-80">
                            {description}
                        </p>
                    </div>
                }
                classNames={{
                    tooltip: "bg-white shadow-lg rounded-lg p-4 md:w-[30%]",
                }}
                color="#262626"
                withArrow
                events={{ hover: true, focus: true, touch: true }}
            >
                <div>
                    <BsInfoCircleFill />
                </div>
            </Tooltip>
        </div>
    )
}

export default ToolTip
