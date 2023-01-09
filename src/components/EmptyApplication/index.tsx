import { useEffect, useRef, useState } from "react"
import EmptyApplicationImage from "../../assets/empty.svg"
import Button from "../Core/Buttons/Button"
import CopyIcon from "../../assets/copy_to_clipboard.svg"
import { showNotification } from "@mantine/notifications"

export interface EmptyApplicationInterface {
    id: string | undefined
}

const EmptyApplication = ({ id }: EmptyApplicationInterface) => {
    const textAreaRef = useRef(null)
    const [copySuccess, setCopySuccess] = useState("")

    function copyToClipboard(e: any) {
        // @ts-ignore
        textAreaRef.current && textAreaRef.current.select()
        navigator.clipboard.writeText(
            `${import.meta.env.VITE_FRONTEND_URL}/job-boards/${id}`
        )
        e.target.focus()
        setCopySuccess("Copied!")
    }

    useEffect(() => {
        if (copySuccess) {
            showNotification({
                title: "Success",
                message: "Job list has been copied successfully",
                color: "green",
            })
        }
    }, [copySuccess])

    return (
        <div className="flex flex-col justify-center items-center mt-32">
            <img src={EmptyApplicationImage} alt="empty application" />
            <h1 className="text-black-100 text-3xl font-creatoMedium mt-5 font-bold">
                This shift has no applications yet.
            </h1>
            <p className="text-black-70 text-3md font-creato mt-3">
                Share your link to increase visibility to potential Operatives.
            </p>
            <div className="grid grid-cols-1 w-full md:w-auto md:flex md:flex-cols  justify-center md:flex-row items-center gap-2 md:gap-5 rounded p-2 border-accent-70 mt-5">
                <input
                    ref={textAreaRef}
                    className="w-full md:w-[319px] bg-transparent border-black-10 border p-4 bg-white-20 rounded-lg focus:outline-none text-black-50 "
                    disabled
                    defaultValue={`${
                        import.meta.env.VITE_FRONTEND_URL
                    }/job-boards/${id}`}
                />

                <Button
                    onClick={copyToClipboard}
                    iconLeft={<img src={CopyIcon} alt="copy" />}
                    variant="primary"
                    className="font-creatoMedium px-6 py-4 w-full md:w-auto"
                >
                    Copy{" "}
                </Button>
            </div>
        </div>
    )
}

export default EmptyApplication
