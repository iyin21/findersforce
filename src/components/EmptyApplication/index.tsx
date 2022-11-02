import { useRef } from "react"
import EmptyApplicationImage from "../../assets/empty.svg"
import Button from "../Core/Buttons/Button"
import CopyIcon from "../../assets/copy_to_clipboard.svg"

export interface EmptyApplicationInterface {
    id: string | undefined
}

const EmptyApplication = ({ id }: EmptyApplicationInterface) => {
    const textAreaRef = useRef(null)

    function copyToClipboard(e: any) {
        // @ts-ignore
        textAreaRef.current && textAreaRef.current.select()
        navigator.clipboard.writeText(
            `https://forcefinder.com/revivetraffic/${id}`
        )
        e.target.focus()
    }

    return (
        <div className="flex flex-col justify-center items-center mt-32">
            <img src={EmptyApplicationImage} alt="empty application" />
            <h1 className="text-black-100 text-3xl font-creatoMedium mt-5 font-bold">
                No applications yet!
            </h1>
            <p className="text-black-70 text-3md font-creato mt-3">
                Copy the link and share to increase visibility to prospective
                applicants.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5 rounded p-2 border-accent-70 mt-5">
                <input
                    ref={textAreaRef}
                    className="md:w-[319px] bg-transparent border-black-10 border p-4 bg-white-20 rounded-lg focus:outline-none text-black-50 "
                    disabled
                    defaultValue={`https://forcefinder.com/revivetraffic..`}
                />

                <Button
                    onClick={copyToClipboard}
                    iconLeft={<img src={CopyIcon} alt="copy" />}
                    variant="primary"
                    className="font-creatoMedium px-6 py-4"
                >
                    Copy{" "}
                </Button>
            </div>
        </div>
    )
}

export default EmptyApplication
