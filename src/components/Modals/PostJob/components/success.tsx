import { Modal } from "@mantine/core"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import SuccessImage from "../../../../assets/success.svg"
import { GrClose } from "react-icons/gr"
import Button from "../../../../components/Core/Buttons/Button"
import CopyIcon from "../../../../assets/copy_to_clipboard.svg"
import { showNotification } from "@mantine/notifications"

interface ISuccessPostJobProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    newJobId: string
}

const JobSuccessful = ({
    opened,
    setOpened,
    newJobId,
}: ISuccessPostJobProps) => {
    const textAreaRef = useRef(null)
    const [copySuccess, setCopySuccess] = useState("")

    function copyToClipboard(e: any) {
        // @ts-ignore
        textAreaRef.current && textAreaRef.current.select()
        navigator.clipboard.writeText(
            `${import.meta.env.VITE_FRONTEND_URL}/${newJobId}`
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
        <div>
            <Modal
                opened={opened}
                withCloseButton={false}
                onClose={() => setOpened(false)}
                size="lg"
                centered
            >
                <div
                    className="flex justify-end items-center md:px-4"
                    onClick={() => setOpened(false)}
                >
                    <GrClose size={30} />
                </div>
                <div className="text-center flex flex-col items-center font-creato">
                    <img src={SuccessImage} alt="successful" />
                    <h4 className="font-bold text-2mxl mt-5">
                        Your Shift is Live!
                    </h4>
                    <p className="text-black-60 text-3md font-normal mt-2">
                        Operative will see your opening on their dashboard and
                        apply.
                    </p>
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5 rounded p-2 border-accent-70 mt-5">
                        <input
                            ref={textAreaRef}
                            className="w-full md:w-[319px] bg-transparent border-black-10 border p-4 bg-white-20 rounded-lg focus:outline-none text-black-50 "
                            disabled
                            defaultValue={`${
                                import.meta.env.VITE_FRONTEND_URL
                            }/${newJobId}`}
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
            </Modal>
        </div>
    )
}

export default JobSuccessful
